import { useEffect, useRef } from 'react';

export function ShaderCanvas({ theme = 'dark', className = '', interactive = false }: { theme?: string; className?: string; interactive?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (canvasRef.current) {}
  }, [theme, interactive]);
  return <canvas ref={canvasRef} className={className} style={{ display: 'block' }} />;
}
