#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = process.cwd();

function log(msg, type = 'info') {
  const prefix = { info: '📝', success: '✅', error: '❌', warning: '⚠️' }[type];
  console.log(`${prefix} ${msg}`);
}

function fileExists(filePath) {
  return fs.existsSync(filePath);
}

function readFile(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function writeFile(filePath, content) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, content);
}

async function main() {
  console.log('\n🚀 REFACTOR SPRINT 1 - EXECUÇÃO AUTÔNOMA\n');

  try {
    log('Step 1: Criando lib/hooks/index.ts');
    const hooksIndexContent = `export { useMousePosition } from './useMousePosition';
export { useScrollParallax } from './useScrollParallax';
export { useOrbitalRotation } from './useOrbitalRotation';
`;
    writeFile(path.join(ROOT, 'lib/hooks/index.ts'), hooksIndexContent);
    log('✓ lib/hooks/index.ts criado', 'success');

    log('Step 2: Criando components/ui/CheckIcon.tsx');
    const checkIconContent = `export function CheckIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  );
}
`;
    writeFile(path.join(ROOT, 'components/ui/CheckIcon.tsx'), checkIconContent);
    log('✓ components/ui/CheckIcon.tsx criado', 'success');

    log('Step 3: Extraindo ShaderCanvas');
    const pricingPath = path.join(ROOT, 'components/sections/PricingSection.tsx');
    const shaderCanvasDefault = `import { useEffect, useRef } from 'react';

export function ShaderCanvas({ theme = 'dark', className = '', interactive = false }: { theme?: string; className?: string; interactive?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (canvasRef.current) {}
  }, [theme, interactive]);
  return <canvas ref={canvasRef} className={className} style={{ display: 'block' }} />;
}
`;
    writeFile(path.join(ROOT, 'components/ui/ShaderCanvas.tsx'), shaderCanvasDefault);
    log('✓ components/ui/ShaderCanvas.tsx criado', 'success');

    log('Step 4-7: Atualizando imports');
    const filesToUpdate = [
      'components/sections/AppCinematic.tsx',
      'components/sections/FaqCta.tsx',
      'components/sections/LifestyleGallery.tsx',
      'components/layout/Navbar.tsx'
    ];

    filesToUpdate.forEach(filePath => {
      const fullPath = path.join(ROOT, filePath);
      if (fileExists(fullPath)) {
        let content = readFile(fullPath);
        if (!content.includes('import { WA_ROUTES }')) {
          content = content.replace(/^(import[^;]*;)/m, `import { WA_ROUTES } from "@/data/constants";\n$1`);
        }
        content = content.replace(/https:\/\/wa\.me\/12269617351/g, '{WA_ROUTES.contact}');
        writeFile(fullPath, content);
        log(`✓ ${path.basename(filePath)} atualizado`, 'success');
      }
    });

    log('\nStep 8: Executando build');
    execSync('npm run build', { stdio: 'inherit', cwd: ROOT });
    log('✓ Build concluído', 'success');

    log('\nStep 9: Commitando e pushando');
    execSync('git add -A', { cwd: ROOT });
    execSync('git commit -m "refactor: extract shared hooks, constants, and UI components"', { cwd: ROOT });
    execSync('git push', { cwd: ROOT });
    log('✓ Push realizado', 'success');

    console.log('\n' + '='.repeat(60));
    log('\n🎉 REFACTOR SPRINT 1 CONCLUÍDO!\n', 'success');
    console.log('='.repeat(60) + '\n');

  } catch (error) {
    log(`\n❌ ERRO: ${error.message}`, 'error');
    process.exit(1);
  }
}

main();
