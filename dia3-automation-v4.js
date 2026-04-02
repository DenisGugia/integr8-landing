#!/usr/bin/env node
/**
 * DIA 3 Automation Script v4 - Sprint 3
 * Reorganiza translations em módulos (com fix: brace matching)
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const SECTIONS = ['nav', 'hero', 'identification', 'comparison', 'pillars', 'pricing', 'faq'];
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
    try {
      execSync(`powershell -NoProfile -Command "Remove-Item -Recurse -Force '${BACKUP_DIR}'"`);
    } catch (e) {}
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

function extractObjectFromFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');

  // Encontrar "export const X = {" (com ou sem type annotation)
  const exportMatch = content.match(/export\s+const\s+\w+(\s*:\s*\w+)?\s*=\s*\{/);
  if (!exportMatch) {
    log(`Não encontrou 'export const ... = {' em ${filePath}`, 'error');
    return null;
  }

  // Posição do primeiro '{'
  const openBraceIndex = exportMatch[0].lastIndexOf('{');
  const startPos = content.indexOf('{', openBraceIndex);

  if (startPos === -1) {
    log(`Não encontrou '{' em ${filePath}`, 'error');
    return null;
  }

  // Brace matching: encontra o '}' correspondente
  let braceCount = 0;
  let endPos = -1;

  for (let i = startPos; i < content.length; i++) {
    if (content[i] === '{') braceCount++;
    if (content[i] === '}') {
      braceCount--;
      if (braceCount === 0) {
        endPos = i;
        break;
      }
    }
  }

  if (endPos === -1) {
    log(`Não conseguiu encontrar '}' correspondente em ${filePath}`, 'error');
    return null;
  }

  // Extrair objeto: de { até }
  let objStr = content.substring(startPos, endPos + 1);

  // Remove trailing commas
  objStr = objStr.replace(/,(\s*[}\]])/g, '$1');

  try {
    const obj = Function(`'use strict'; return (${objStr})`)();
    return obj;
  } catch (e) {
    log(`Erro ao fazer parse: ${e.message}`, 'error');
    return null;
  }
}

function reorganizeTranslations() {
  log('Reorganizando translations em módulos por seção...');

  LANGUAGES.forEach(lang => {
    const filePath = path.join(TRANSLATIONS_SRC, `${lang}.ts`);
    if (!fs.existsSync(filePath)) {
      log(`${lang}.ts não encontrado`, 'warning');
      return;
    }

    const translations = extractObjectFromFile(filePath);
    if (!translations) {
      log(`Falha ao extrair ${lang}`, 'error');
      return;
    }

    // Criar pasta lang
    const langDir = path.join(TRANSLATIONS_SRC, lang);
    if (fs.existsSync(langDir)) {
      try {
        execSync(`powershell -NoProfile -Command "Remove-Item -Recurse -Force '${langDir}'"`);
      } catch (e) {}
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
  if (!fs.existsSync(contextFile)) {
    log('context.tsx não encontrado', 'warning');
    return;
  }

  const content = fs.readFileSync(contextFile, 'utf8');

  // Se já tem imports de pastas, não faz nada
  if (content.includes("from './translations/pt'")) {
    log('Imports já atualizados', 'info');
    return;
  }

  // Atualizar imports de arquivos individuais para pastas
  let updated = content
    .replace(/from ['"]\.\/translations\/pt['"]/g, "from './translations/pt'")
    .replace(/from ['"]\.\/translations\/en['"]/g, "from './translations/en'")
    .replace(/from ['"]\.\/translations\/es['"]/g, "from './translations/es'");

  // Se não mudou, tenta adicionar novos imports
  if (updated === content) {
    log('Imports já estão corretos', 'info');
    return;
  }

  fs.writeFileSync(contextFile, updated);
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

function verifyStructure() {
  log('Verificando nova estrutura...');

  let valid = true;
  LANGUAGES.forEach(lang => {
    const langDir = path.join(TRANSLATIONS_SRC, lang);

    if (!fs.existsSync(langDir)) {
      log(`Pasta ${lang}/ não foi criada`, 'error');
      valid = false;
      return;
    }

    const indexFile = path.join(langDir, 'index.ts');
    if (!fs.existsSync(indexFile)) {
      log(`${lang}/index.ts não encontrado`, 'error');
      valid = false;
    } else {
      const missingFiles = [];
      SECTIONS.forEach(section => {
        const file = path.join(langDir, `${section}.ts`);
        if (!fs.existsSync(file)) {
          missingFiles.push(section);
        }
      });

      if (missingFiles.length > 0) {
        log(`${lang}: faltam arquivos ${missingFiles.join(', ')}`, 'error');
        valid = false;
      } else {
        log(`${lang}/ ✓ (${SECTIONS.length} arquivos)`, 'success');
      }
    }
  });

  return valid;
}

async function main() {
  console.log('\n🚀 DIA 3 v4 - Reorganização de Translations\n');

  try {
    backupOriginal();
    reorganizeTranslations();

    const structureValid = verifyStructure();

    if (!structureValid) {
      log('Estrutura tem problemas. Abortando antes do build.', 'error');
      log('Revertendo...', 'warning');

      LANGUAGES.forEach(lang => {
        const src = path.join(BACKUP_DIR, `${lang}.ts`);
        const dst = path.join(TRANSLATIONS_SRC, `${lang}.ts`);
        if (fs.existsSync(src)) {
          fs.copyFileSync(src, dst);
          const langFolder = path.join(TRANSLATIONS_SRC, lang);
          if (fs.existsSync(langFolder)) {
            try {
              execSync(`powershell -NoProfile -Command "Remove-Item -Recurse -Force '${langFolder}'"`);
            } catch (e) {}
          }
        }
      });

      log('Revertido para backup', 'success');
      process.exit(1);
    }

    updateContext();
    const buildSuccess = runBuild();

    if (buildSuccess) {
      log('\n✅ DIA 3 COMPLETO!', 'success');
      log('Estrutura reorganizada com sucesso:', 'info');
      LANGUAGES.forEach(lang => {
        log(`  lib/i18n/translations/${lang}/ (${SECTIONS.length} módulos)`, 'info');
      });
    } else {
      log('\n❌ Build falhou. Revertendo...', 'error');

      LANGUAGES.forEach(lang => {
        const src = path.join(BACKUP_DIR, `${lang}.ts`);
        const dst = path.join(TRANSLATIONS_SRC, `${lang}.ts`);
        if (fs.existsSync(src)) {
          fs.copyFileSync(src, dst);
          const langFolder = path.join(TRANSLATIONS_SRC, lang);
          if (fs.existsSync(langFolder)) {
            try {
              execSync(`powershell -NoProfile -Command "Remove-Item -Recurse -Force '${langFolder}'"`);
            } catch (e) {}
          }
        }
      });

      log('Revertido para backup', 'success');
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
          const langFolder = path.join(TRANSLATIONS_SRC, lang);
          if (fs.existsSync(langFolder)) {
            try {
              execSync(`powershell -NoProfile -Command "Remove-Item -Recurse -Force '${langFolder}'"`);
            } catch (e) {}
          }
        }
      });
      log('Backup restaurado', 'success');
    }
    process.exit(1);
  }
}

main();
