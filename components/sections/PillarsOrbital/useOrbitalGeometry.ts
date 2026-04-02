export function calculateOrbitalPosition(
  index: number,
  total: number,
  rotation: number,
  radius: number = 200
) {
  const angle = ((index / total) * 360 + rotation) % 360;
  const radian = (angle * Math.PI) / 180;
  const x = radius * Math.cos(radian);
  const y = radius * Math.sin(radian);
  const zIndex = Math.round(100 + 50 * Math.cos(radian));
  const opacity = Math.max(0.4, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2)));

  return { x, y, angle, zIndex, opacity };
}