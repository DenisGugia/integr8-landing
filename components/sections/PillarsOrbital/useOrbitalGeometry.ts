"use client";

export function calculateNodePosition(
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
    opacity: Math.max(0.4, (1 + Math.sin(radian)) / 2),
  };
}
