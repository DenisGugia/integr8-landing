import { useRef } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';

interface UseScrollParallaxOptions {
  offset?: [string, string] | string[];
  onProgress?: (progress: number) => void;
}

export function useScrollParallax(options: UseScrollParallaxOptions = {}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: (options.offset as any) || ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (current) => {
    options.onProgress?.(current);
  });

  return { ref, scrollYProgress };
}
