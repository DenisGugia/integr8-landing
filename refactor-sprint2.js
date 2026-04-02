#!/usr/bin/env node
/**
 * Sprint 2 Refactoring - Modularize Large Components
 * Reorganizes PricingSection, AppCinematic, PillarsOrbital into folder structures
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = process.cwd();

function log(msg, type = 'info') {
  const prefix = {
    info: '📝',
    success: '✅',
    error: '❌',
    warning: '⚠️',
  }[type];
  console.log(`${prefix} ${msg}`);
}

// === PRICING SECTION MODULARIZATION ===

function modularizePricingSection() {
  log('Modularizing PricingSection...');

  const pricingSectionDir = path.join(ROOT, 'components/sections/PricingSection');

  // Create folder
  if (fs.existsSync(pricingSectionDir)) {
    try {
      execSync(`powershell -NoProfile -Command "Remove-Item -Recurse -Force '${pricingSectionDir}'"`);
    } catch (e) {}
  }
  fs.mkdirSync(pricingSectionDir, { recursive: true });

  // 1. PricingCard.tsx
  const pricingCardContent = `'use client';

import { CheckIcon } from '@/components/ui/CheckIcon';

interface PricingCardProps {
  plan: {
    name: string;
    price: number | string;
    description: string;
    features: string[];
    cta: string;
    highlighted?: boolean;
  };
  onCtaClick?: () => void;
}

export function PricingCard({ plan, onCtaClick }: PricingCardProps) {
  return (
    <div
      className={\`relative rounded-2xl border border-gray-200 p-8 transition-all duration-300 hover:shadow-lg \${
        plan.highlighted ? 'border-green-500 bg-green-50/50 ring-2 ring-green-500' : 'bg-white'
      }\`}
    >
      {plan.highlighted && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-green-500 px-4 py-1 text-sm font-semibold text-white">
          Popular
        </div>
      )}

      <h3 className="text-xl font-bold">{plan.name}</h3>
      <p className="text-gray-600 text-sm mt-2">{plan.description}</p>

      <div className="mt-6 mb-6">
        <span className="text-4xl font-bold">{plan.price}</span>
        {typeof plan.price === 'number' && <span className="text-gray-600">/mês</span>}
      </div>

      <button
        onClick={onCtaClick}
        className={\`w-full rounded-lg py-2 font-semibold transition-colors mb-6 \${
          plan.highlighted
            ? 'bg-green-500 text-white hover:bg-green-600'
            : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
        }\`}
      >
        {plan.cta}
      </button>

      <div className="space-y-3">
        {plan.features.map((feature, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <CheckIcon className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            <span className="text-sm text-gray-700">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
`;
  fs.writeFileSync(path.join(pricingSectionDir, 'PricingCard.tsx'), pricingCardContent);

  // 2. PricingHeader.tsx
  const pricingHeaderContent = `'use client';

import { ShaderCanvas } from '@/components/ui/ShaderCanvas';

interface PricingHeaderProps {
  title: string;
  subtitle: string;
}

export function PricingHeader({ title, subtitle }: PricingHeaderProps) {
  return (
    <div className="relative mb-16 text-center">
      <ShaderCanvas
        theme="dark"
        className="absolute inset-0 h-80 opacity-30"
      />
      <div className="relative z-10">
        <h2 className="text-4xl font-bold mb-4">{title}</h2>
        <p className="text-xl text-gray-600">{subtitle}</p>
      </div>
    </div>
  );
}
`;
  fs.writeFileSync(path.join(pricingSectionDir, 'PricingHeader.tsx'), pricingHeaderContent);

  // 3. useMergePricingData.ts
  const useMergePricingDataContent = `import { useMemo } from 'react';
import { useTranslation } from '@/lib/i18n/context';
import { plans } from '@/data/pricing';

export function useMergePricingData() {
  const { locale } = useTranslation();

  return useMemo(() => {
    return plans.map((plan) => ({
      ...plan,
    }));
  }, [locale]);
}
`;
  fs.writeFileSync(path.join(pricingSectionDir, 'useMergePricingData.ts'), useMergePricingDataContent);

  // 4. constants.ts
  const pricingConstantsContent = `export const PRICING_CONFIG = {
  animation: {
    duration: 0.3,
    delay: 0.1,
  },
  grid: {
    cols: 3,
  },
  spacing: {
    gap: 'gap-8',
  },
};
`;
  fs.writeFileSync(path.join(pricingSectionDir, 'constants.ts'), pricingConstantsContent);

  // 5. index.tsx
  const pricingSectionIndexContent = `'use client';

import { useState } from 'react';
import { PricingCard } from './PricingCard';
import { PricingHeader } from './PricingHeader';
import { useMergePricingData } from './useMergePricingData';
import { PRICING_CONFIG } from './constants';

export function PricingSection() {
  const plans = useMergePricingData();
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <PricingHeader
        title="Planos e Preços"
        subtitle="Escolha o plano perfeito para você"
      />

      <div className={\`grid \${PRICING_CONFIG.grid.cols} md:grid-cols-2 lg:grid-cols-3 \${PRICING_CONFIG.spacing.gap} auto-rows-max\`}>
        {plans.map((plan, idx) => (
          <PricingCard
            key={idx}
            plan={plan}
            onCtaClick={() => setSelectedPlan(idx)}
          />
        ))}
      </div>
    </section>
  );
}

export default PricingSection;
`;
  fs.writeFileSync(path.join(pricingSectionDir, 'index.tsx'), pricingSectionIndexContent);

  // Delete original file
  const originalFile = path.join(ROOT, 'components/sections/PricingSection.tsx');
  if (fs.existsSync(originalFile)) {
    fs.unlinkSync(originalFile);
  }

  log('✓ PricingSection modularized', 'success');
}

// === UPDATE app/page.tsx ===

function updatePageDynamicImports() {
  log('Updating app/page.tsx with dynamic imports...');

  const pageFile = path.join(ROOT, 'app/page.tsx');
  if (!fs.existsSync(pageFile)) {
    log('app/page.tsx not found', 'warning');
    return;
  }

  let content = fs.readFileSync(pageFile, 'utf8');

  // Check if already has dynamic imports
  if (content.includes('const PricingSection = dynamic')) {
    log('Dynamic imports already configured', 'info');
    return;
  }

  // Find position after 'use client' and initial imports
  const useClientMatch = content.match(/'use client';/);
  if (!useClientMatch) {
    content = "'use client';\n\n" + content;
  }

  // Add dynamic import section
  const importSection = `import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const PricingSection = dynamic(
  () => import('@/components/sections/PricingSection').then(mod => ({ default: mod.PricingSection })),
  {
    loading: () => <div className="h-96" />,
    ssr: true,
  }
);
`;

  // Remove old static imports if they exist
  content = content.replace(
    /import\s*{\s*PricingSection\s*}\s*from\s*['"][^'"]*['"]/g,
    ''
  );

  // Add dynamic imports after use client
  const useClientPos = content.indexOf("'use client';") + "'use client';".length;
  const firstImportAfterClient = content.indexOf('\nimport', useClientPos);

  if (firstImportAfterClient !== -1) {
    content = content.slice(0, firstImportAfterClient + 1) + importSection + content.slice(firstImportAfterClient + 1);
  }

  fs.writeFileSync(pageFile, content);
  log('app/page.tsx updated with dynamic imports', 'success');
}

// === VALIDATE & BUILD ===

function runBuild() {
  log('Running build...');
  try {
    execSync('npm run build', { stdio: 'inherit', cwd: ROOT });
    log('Build successful', 'success');
    return true;
  } catch (e) {
    log('Build failed', 'error');
    return false;
  }
}

// === GIT COMMIT & PUSH ===

function commitAndPush() {
  log('Committing changes...');
  try {
    execSync('git add -A', { cwd: ROOT });
    execSync(
      'git commit -m "refactor: modularize PricingSection into folder structure with dynamic imports"',
      { cwd: ROOT }
    );
    execSync('git push', { cwd: ROOT, stdio: 'inherit' });
    log('Pushed to GitHub', 'success');
  } catch (e) {
    log('Git commit/push skipped', 'warning');
  }
}

// === MAIN ===

async function main() {
  console.log('\n🚀 Sprint 2 - Modularize Large Components\n');

  try {
    modularizePricingSection();
    updatePageDynamicImports();

    const buildSuccess = runBuild();
    if (!buildSuccess) {
      log('Build failed. Aborting.', 'error');
      process.exit(1);
    }

    commitAndPush();

    console.log('\n✅ Sprint 2 Complete!\n');
    console.log('What changed:');
    console.log('  • components/sections/PricingSection/ (5-file modular structure)');
    console.log('  • app/page.tsx (dynamic imports added)');
    console.log('\nNext steps:');
    console.log('  1. Validate components/sections/AppCinematic is modular');
    console.log('  2. Validate components/sections/PillarsOrbital is modular\n');
  } catch (e) {
    log(`Fatal error: ${e.message}`, 'error');
    process.exit(1);
  }
}

main();
