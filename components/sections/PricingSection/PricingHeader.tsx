'use client';

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
