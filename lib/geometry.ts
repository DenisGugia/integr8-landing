export function calculateOrbitalPosition(
  index: number,
  total: number,
  rotation: number,
  radius: number = 200
) {
  const angle = ((index / total) * 360 + rotation) % 360;
  const radian = (angle * Math.PI) / 180;

  return {
    x: radius * Math.cos(radian),
    y: radius * Math.sin(radian),
    angle,
    zIndex: Math.round(100 + 50 * Math.cos(radian)),
    opacity: Math.max(0.4, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))),
  };
}

export function polarToCartesian(angle: number, radius: number) {
  const radian = (angle * Math.PI) / 180;
  return {
    x: radius * Math.cos(radian),
    y: radius * Math.sin(radian),
  };
}

export function cartesianToPolar(x: number, y: number) {
  const angle = Math.atan2(y, x) * (180 / Math.PI);
  const radius = Math.sqrt(x * x + y * y);
  return { angle: (angle + 360) % 360, radius };
}