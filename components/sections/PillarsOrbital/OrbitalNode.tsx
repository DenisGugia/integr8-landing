import React from 'react';
import type { MergedPillar } from './useOrbitalState';
import { calculateOrbitalPosition } from './useOrbitalGeometry';

interface OrbitalNodeProps {
  item: MergedPillar;
  index: number;
  total: number;
  rotation: number;
  isExpanded: boolean;
  isRelated: boolean;
  isPulsing: boolean;
  onToggle: () => void;
  nodeRef: React.Ref<HTMLDivElement>;
}

export function OrbitalNode({
  item,
  index,
  total,
  rotation,
  isExpanded,
  isRelated,
  isPulsing,
  onToggle,
  nodeRef,
}: OrbitalNodeProps) {
  const position = calculateOrbitalPosition(index, total, rotation);
  const Icon = item.icon;

  return (
    <div
      ref={nodeRef}
      className="absolute transition-all duration-700 cursor-pointer"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        zIndex: isExpanded ? 200 : position.zIndex,
        opacity: isExpanded ? 1 : position.opacity,
      }}
      onClick={onToggle}
    >
      <div
        className={`relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
          isExpanded ? 'scale-100' : 'scale-100 hover:scale-110'
        } ${
          isRelated
            ? 'bg-gradient-to-br from-blue-500 to-green-500 shadow-lg shadow-blue-500/50'
            : 'bg-white dark:bg-black border-2 border-slate-300 dark:border-white/20'
        } ${
          isPulsing && !isExpanded ? 'animate-pulse' : ''
        }`}
      >
        <Icon className={isRelated ? 'text-white' : 'text-slate-900 dark:text-white'} size={24} />
      </div>
    </div>
  );
}