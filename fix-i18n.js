const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

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

function extractObjectFromFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const exportMatch = content.match(/export\s+const\s+\w+(\s*:\s*\w+)?\s*=\s*\{/);
    if (!exportMatch) return null;
    const startPos = content.indexOf('{', exportMatch.index + 10);
    if (startPos === -1) return null;
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
    if (endPos === -1) return null;
    let objStr = content.substring(startPos, endPos + 1);
    objStr = objStr.replace(/,(\s*[}\]])/g, '$1');
    try {
        return Function(`'use strict'; return (${objStr})`)();
    } catch (e) {
        return null;
    }
}

function fix() {
    LANGUAGES.forEach(lang => {
        const backupPath = path.join(BACKUP_DIR, `${lang}.ts`);
        if (!fs.existsSync(backupPath)) return;
        const translations = extractObjectFromFile(backupPath);
        if (!translations) return;

        const langDir = path.join(TRANSLATIONS_SRC, lang);
        if (!fs.existsSync(langDir)) fs.mkdirSync(langDir, { recursive: true });

        const sections = Object.keys(translations);
        sections.forEach(section => {
            const data = translations[section];
            const content = `export const ${section} = ${JSON.stringify(data, null, 2)};\n`;
            fs.writeFileSync(path.join(langDir, `${section}.ts`), content);
        });

        const imports = sections.map(s => `import { ${s} } from './${s}';`).join('\n');
        const combined = `export const ${lang} = {\n  ${sections.join(',\n  ')}\n};\n`;
        const typeDef = lang === 'pt' ? `\nexport type Translations = typeof pt;\n` : '';

        fs.writeFileSync(path.join(langDir, 'index.ts'), `${imports}\n\n${combined}${typeDef}`);
        log(`✓ Fixed ${lang}/ with ${sections.length} sections`, 'success');
    });
}

fix();
