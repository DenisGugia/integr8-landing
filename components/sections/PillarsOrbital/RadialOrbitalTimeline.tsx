'use client';

import { useRef } from 'react';
import { OrbitalNode } from './OrbitalNode';
import { NodeCard } from './NodeCard';
import { useOrbitalState, type MergedPillar } from './useOrbitalState';

interface RadialOrbitalTimelineProps {
  timelineData: MergedPillar[];
}

export function RadialOrbitalTimeline({ timelineData }: RadialOrbitalTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const {
    expandedItems,
    rotationAngle,
    pulseEffect,
    activeNodeId,
    toggleItem,
    reset,
  } = useOrbitalState();

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    return getRelatedItems(activeNodeId).includes(itemId);
  };

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      reset();
    }
  };

  return (
    <div
      className="w-full min-h-[700px] flex flex-col items-center justify-center overflow-visible"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
          style={{ perspective: '1000px' }}
        >
          {/* Center orbit */}
          <div className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-[#22c55e] via-[#3b82f6] to-[#22c55e] animate-pulse flex items-center justify-center z-10">
            <div className="absolute w-20 h-20 rounded-full border border-slate-200 dark:border-white/20 animate-ping opacity-70" />
            <div className="absolute w-24 h-24 rounded-full border border-slate-200 dark:border-white/10 animate-ping opacity-50" style={{ animationDelay: '0.5s' }} />
            <div className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-md" />
          </div>

          <div className="absolute w-96 h-96 rounded-full border border-slate-200 dark:border-white/10" />

          {/* Nodes */}
          {timelineData.map((item, index) => (
            <OrbitalNode
              key={item.id}
              item={item}
              index={index}
              total={timelineData.length}
              rotation={rotationAngle}
              isExpanded={expandedItems[item.id] || false}
              isRelated={isRelatedToActive(item.id)}
              isPulsing={pulseEffect[item.id] || false}
              onToggle={() => toggleItem(item.id, timelineData, getRelatedItems)}
              nodeRef={(el) => { nodeRefs.current[item.id] = el; }}
            />
          ))}
        </div>

        {/* Card */}
        {timelineData.map((item) => (
          activeNodeId === item.id && (
            <NodeCard key={`card-${item.id}`} item={item} isExpanded={expandedItems[item.id] || false} />
          )
        ))}
      </div>
    </div>
  );
}