"use client";
import { useOrbitalState } from "./useOrbitalState";
import { calculateNodePosition } from "./useOrbitalGeometry";
import { ORBITAL_CONFIG } from "./constants";

interface RadialOrbitalTimelineProps {
  pillars: Array<{ id: string; name: string; description: string }>;
}

export function RadialOrbitalTimeline({ pillars }: RadialOrbitalTimelineProps) {
  const orbital = useOrbitalState();

  return (
    <div className="relative w-full h-[600px] flex items-center justify-center">
      <div className="relative" style={{ width: ORBITAL_CONFIG.orbitSize, height: ORBITAL_CONFIG.orbitSize }}>
        {pillars.map((pillar, i) => {
          const pos = calculateNodePosition(i, pillars.length, orbital.rotationAngle, ORBITAL_CONFIG.radius);
          return (
            <div
              key={pillar.id}
              className="absolute"
              style={{
                transform: `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px))`,
                zIndex: pos.zIndex,
                opacity: pos.opacity,
              }}
            >
              <button
                onClick={() => orbital.toggleItem(pillar.id)}
                className="w-16 h-16 rounded-full bg-[#22c55e] text-black font-bold hover:scale-110 transition-transform"
              >
                {i + 1}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
