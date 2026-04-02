#!/usr/bin/env node
/**
 * DIA 3 Automation Script - Sprint 3
 * Reorganiza translations em módulos e valida build
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const SECTIONS = ['common', 'hero', 'identification', 'comparison', 'pillars', 'pricing', 'faq'];
const LANGUAGES = ['pt', 'en', 'es'];
const ROOT = process.cwd();
const TRANSLATIONS_SRC = path.join(ROOT, 'lib/i18n/translations');
const BACKUP_DIR = path.join(ROOT, '.backup-translations');

function log(msg, type = 'info') {
  const prefix = {
    info: '📝',
    success: '✅',
    error: '❌',
    warning: '⚠️',
  }[type];
  console.log(`${prefix} ${msg}`);
}

function backupOriginal() {
  log('Criando backup das translations originais...');
  if (fs.existsSync(BACKUP_DIR)) {
    execSync(`rm -rf "${BACKUP_DIR}"`);
  }
  fs.mkdirSync(BACKUP_DIR, { recursive: true });

  LANGUAGES.forEach(lang => {
    const src = path.join(TRANSLATIONS_SRC, `${lang}.ts`);
    const dst = path.join(BACKUP_DIR, `${lang}.ts`);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dst);
    }
  });
  log('Backup criado', 'success');
}

function parseTranslations(lang) {
  const file = path.join(TRANSLATIONS_SRC, `${lang}.ts`);
  if (!fs.existsSync(file)) return null;

  const content = fs.readFileSync(file, 'utf8');
  const match = content.match(/export const \w+ = ({[\s\S]*});/);
  if (!match) {
    log(`Falha ao parsear ${lang}.ts`, 'error');
    return null;
  }

  try {
    // Remove trailing whitespace e comentários antes de eval
    const objStr = match[1];
    return eval(`(${objStr})`);
  } catch (e) {
    log(`Erro ao fazer parse de ${lang}.ts: ${e.message}`, 'error');
    return null;
  }
}

function reorganizeTranslations() {
  log('Reorganizando translations em módulos por seção...');

  LANGUAGES.forEach(lang => {
    const translations = parseTranslations(lang);
    if (!translations) return;

    // Criar pasta lang
    const langDir = path.join(TRANSLATIONS_SRC, lang);
    if (fs.existsSync(langDir)) {
      execSync(`rm -rf "${langDir}"`);
    }
    fs.mkdirSync(langDir, { recursive: true });

    // Criar arquivo para cada seção
    SECTIONS.forEach(section => {
      const data = translations[section] || {};
      const content = `export const ${section} = ${JSON.stringify(data, null, 2)};\n`;
      fs.writeFileSync(path.join(langDir, `${section}.ts`), content);
    });

    // Criar index.ts com barrel exports
    const indexContent = SECTIONS
      .map(s => `export * as ${s} from './${s}';`)
      .join('\n') + '\n';
    fs.writeFileSync(path.join(langDir, 'index.ts'), indexContent);

    log(`✓ ${lang}/`, 'success');
  });
}

function updateContext() {
  log('Atualizando context.tsx para nova estrutura...');

  const contextFile = path.join(ROOT, 'lib/i18n/context.tsx');
  let content = fs.readFileSync(contextFile, 'utf8');

  // Atualizar imports - de: import pt from './translations/pt'
  // Para: import * as pt from './translations/pt'
  content = content.replace(
    /import (\w+) from ['"]\.\/translations\/(\w+)['"]/g,
    "import * as $1 from './translations/$2';"
  );

  fs.writeFileSync(contextFile, content);
  log('context.tsx atualizado', 'success');
}

function runBuild() {
  log('Rodando build...');
  try {
    execSync('npm run build', { stdio: 'inherit', cwd: ROOT });
    log('Build concluído com sucesso', 'success');
    return true;
  } catch (e) {
    log('Erro ao rodar build', 'error');
    return false;
  }
}

function generateReport() {
  log('Gerando relatório de bundle...');

  const nextConfigFile = path.join(ROOT, 'next.config.ts');
  let nextConfig = fs.readFileSync(nextConfigFile, 'utf8');

  // Verificar se já tem webpack analyzer
  if (!nextConfig.includes('webpack-bundle-analyzer')) {
    log('Para análise completa de bundle, rode: npm install --save-dev @next/bundle-analyzer', 'warning');
  }

  // Informações básicas
  const distDir = path.join(ROOT, '.next');
  if (fs.existsSync(distDir)) {
    const sizeInMB = getSizeOfDirectory(distDir) / 1024 / 1024;
    log(`Tamanho .next/: ${sizeInMB.toFixed(2)} MB`, 'info');
  }
}

function getSizeOfDirectory(dir) {
  let size = 0;
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      size += getSizeOfDirectory(filePath);
    } else {
      size += stat.size;
    }
  });
  return size;
}

function verifyStructure() {
  log('Verificando nova estrutura...');

  let valid = true;
  LANGUAGES.forEach(lang => {
    const langDir = path.join(TRANSLATIONS_SRC, lang);
    const indexFile = path.join(langDir, 'index.ts');

    if (!fs.existsSync(indexFile)) {
      log(`${lang}/index.ts não encontrado`, 'error');
      valid = false;
    } else {
      const sectionFiles = SECTIONS.map(s => `${s}.ts`)
        .filter(f => !fs.existsSync(path.join(langDir, f)));

      if (sectionFiles.length > 0) {
        log(`${lang}: faltam arquivos ${sectionFiles.join(', ')}`, 'warning');
      } else {
        log(`${lang}/ ✓`, 'success');
      }
    }
  });

  return valid;
}

async function main() {
  console.log('\n🚀 DIA 3 - Reorganização de Translations\n');

  try {
    backupOriginal();
    reorganizeTranslations();
    updateContext();

    const structureValid = verifyStructure();
    if (!structureValid) {
      log('Estrutura contém problemas, mas tentando build...', 'warning');
    }

    const buildSuccess = runBuild();

    if (buildSuccess) {
      generateReport();
      log('\n✅ DIA 3 COMPLETO!', 'success');
      log('Próximos passos:', 'info');
      log('  1. Verificar imports em componentes que usam i18n', 'info');
      log('  2. Rodar: npm run build novamente para validar', 'info');
      log('  3. Fazer Lighthouse test em produção', 'info');
    } else {
      log('\n❌ Build falhou. Verifique os logs acima.', 'error');
      process.exit(1);
    }
  } catch (e) {
    log(`Erro geral: ${e.message}`, 'error');
    log('Revertendo backup...', 'warning');

    if (fs.existsSync(BACKUP_DIR)) {
      LANGUAGES.forEach(lang => {
        const src = path.join(BACKUP_DIR, `${lang}.ts`);
        const dst = path.join(TRANSLATIONS_SRC, `${lang}.ts`);
        if (fs.existsSync(src)) {
          fs.copyFileSync(src, dst);
        }
      });
      log('Backup restaurado', 'success');
    }
    process.exit(1);
  }
}

main();
