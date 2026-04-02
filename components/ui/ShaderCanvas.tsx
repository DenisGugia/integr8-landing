import { useMemo } from 'react';

export function ShaderCanvas({ theme = 'dark', className = '' }: { theme?: string; className?: string }) {
  const gradientClass = useMemo(() => {
    return theme === 'dark'
      ? 'bg-gradient-to-br from-[#05080f] via-[#22c55e]/10 to-[#05080f]'
      : 'bg-gradient-to-br from-white via-[#22c55e]/5 to-slate-50';
  }, [theme]);

  return (
    <div className={`${className} ${gradientClass} relative overflow-hidden`}>
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_50%_120%,#22c55e,transparent_70%)] animate-pulse" />
    </div>
  );
}
