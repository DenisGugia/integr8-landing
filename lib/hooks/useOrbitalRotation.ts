import { useState, useEffect } from 'react';

interface UseOrbitalRotationOptions {
  autoRotate?: boolean;
  rotationSpeed?: number;
}

export function useOrbitalRotation({
  autoRotate = true,
  rotationSpeed = 0.5,
}: UseOrbitalRotationOptions = {}) {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (!autoRotate) return;

    const interval = setInterval(() => {
      setRotation((prev) => (prev + rotationSpeed) % 360);
    }, 50);

    return () => clearInterval(interval);
  }, [autoRotate, rotationSpeed]);

  return { rotation, setRotation };
}
