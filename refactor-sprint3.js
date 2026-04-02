#!/usr/bin/env node
/**
 * Sprint 3 Refactoring - Modularize AppCinematic and PillarsOrbital
 * Reorganizes components with dynamic imports for performance optimization
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = process.cwd();

function log(msg, type = 'info') {
  const prefix = {
    info: '📝',
    success: '✅',
    error: '❌',
    warning: '⚠️',
  }[type];
  console.log(`${prefix} ${msg}`);
}

// === MODULARIZE APPCINEMATIC ===

function modularizeAppCinematic() {
  log('Modularizing AppCinematic...');

  const appCinematicDir = path.join(ROOT, 'components/sections/AppCinematic');

  // Remove if exists
  if (fs.existsSync(appCinematicDir)) {
    try {
      execSync(`powershell -NoProfile -Command "Remove-Item -Recurse -Force '${appCinematicDir}'"`, { stdio: 'ignore' });
    } catch (e) {}
  }
  fs.mkdirSync(appCinematicDir, { recursive: true });

  // 1. constants.ts
  const appCinematicConstantsContent = `export const INJECTED_STYLES = \`
  .gsap-reveal { visibility: hidden; }

  .film-grain {
    position: absolute; inset: 0; width: 100%; height: 100%;
    pointer-events: none; z-index: 50; opacity: 0.04; mix-blend-mode: overlay;
    background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23noiseFilter)"/></svg>');
  }

  .integr8-card {
    background: linear-gradient(145deg, var(--bg) 0%, var(--bg) 100%);
    box-shadow:
      0 40px 100px -20px rgba(0,0,0,0.9),
      0 20px 40px -20px rgba(0,0,0,0.8),
      inset 0 1px 2px rgba(255,255,255,0.1),
      inset 0 -2px 4px rgba(0,0,0,0.8);
    border: 1px solid rgba(255,255,255,0.04);
  }

  .card-sheen {
    position: absolute; inset: 0; border-radius: inherit; pointer-events: none; z-index: 50;
    background: radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(34,197,94,0.04) 0%, transparent 40%);
    mix-blend-mode: screen;
  }

  .iphone-bezel {
    background-color: #111;
    box-shadow:
      inset 0 0 0 2px #374151,
      inset 0 0 0 7px #000,
      0 40px 80px -15px rgba(0,0,0,0.9);
  }

  .screen-glare {
    background: linear-gradient(110deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 45%);
  }

  .hardware-btn {
    background: linear-gradient(90deg, #404040 0%, #171717 100%);
    box-shadow: -2px 0 5px rgba(0,0,0,0.8), inset -1px 0 1px rgba(255,255,255,0.1);
  }

  .btn-green {
    background: linear-gradient(180deg, #22c55e 0%, #16a34a 100%);
    color: #000;
    box-shadow: 0 0 0 1px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.3), 0 12px 24px -4px rgba(34,197,94,0.4), inset 0 1px 1px rgba(255,255,255,0.3);
    transition: all 0.3s ease;
  }
  .btn-green:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 0 1px rgba(0,0,0,0.05), 0 6px 12px rgba(0,0,0,0.2), 0 20px 32px -6px rgba(34,197,94,0.5);
  }
\`;

export const GSAP_CONFIG = {
  scrollTrigger: {
    start: 'top top',
    end: '+=4000',
    pin: true,
    scrub: 1,
  },
  intro: {
    duration: 1.4,
    ease: 'expo.out',
  },
};`;
  fs.writeFileSync(path.join(appCinematicDir, 'constants.ts'), appCinematicConstantsContent);

  // 2. useMouseEffects.ts
  const useMouseEffectsContent = `import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function useMouseEffects(mainCardRef: React.RefObject<HTMLDivElement | null>, mockupRef: React.RefObject<HTMLDivElement | null>) {
  const requestRef = useRef<number>(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(requestRef.current);
      requestRef.current = requestAnimationFrame(() => {
        if (mainCardRef.current && mockupRef.current) {
          const rect = mainCardRef.current.getBoundingClientRect();
          mainCardRef.current.style.setProperty('--mouse-x', \`\${e.clientX - rect.left}px\`);
          mainCardRef.current.style.setProperty('--mouse-y', \`\${e.clientY - rect.top}px\`);
          const xVal = (e.clientX / window.innerWidth - 0.5) * 2;
          const yVal = (e.clientY / window.innerHeight - 0.5) * 2;
          gsap.to(mockupRef.current, {
            rotationY: xVal * 8,
            rotationX: -yVal * 8,
            ease: 'power3.out',
            duration: 1.2,
          });
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, [mainCardRef, mockupRef]);
}`;
  fs.writeFileSync(path.join(appCinematicDir, 'useMouseEffects.ts'), useMouseEffectsContent);

  // 3. useGsapTimeline.ts
  const useGsapTimelineContent = `import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function useGsapTimeline(containerRef: React.RefObject<HTMLDivElement | null>) {
  const ctxRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    ctxRef.current = gsap.context(() => {
      gsap.set('.app-text-track', { autoAlpha: 0, y: 50, filter: 'blur(16px)' });
      gsap.set('.app-main-card', { y: window.innerHeight + 100, autoAlpha: 1 });
      gsap.set('.app-mockup-wrap', { autoAlpha: 0, y: 100, scale: 0.8 });
      gsap.set('.app-cta-wrap', { autoAlpha: 0, scale: 0.9, filter: 'blur(20px)' });

      const introTl = gsap.timeline({ delay: 0.2 });
      introTl.to('.app-text-track', {
        duration: 1.4,
        autoAlpha: 1,
        y: 0,
        filter: 'blur(0px)',
        ease: 'expo.out',
      });

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=4000',
          pin: true,
          scrub: 1,
        },
      });

      scrollTl
        .to(['.app-text-track'], { scale: 1.1, filter: 'blur(16px)', opacity: 0.2, duration: 1.5 }, 0)
        .to('.app-main-card', { y: 0, ease: 'power3.inOut', duration: 1.5 }, 0)
        .to('.app-main-card', { width: '100%', height: '100%', borderRadius: '0px', duration: 1.2 })
        .fromTo('.app-mockup-wrap',
          { y: 200, autoAlpha: 0, scale: 0.7 },
          { y: 0, autoAlpha: 1, scale: 1, ease: 'expo.out', duration: 2 }
        )
        .to({}, { duration: 2 })
        .set('.app-text-track', { autoAlpha: 0 })
        .set('.app-cta-wrap', { autoAlpha: 1 })
        .to('.app-cta-wrap', { scale: 1, filter: 'blur(0px)', ease: 'expo.out', duration: 1.5 }, 'cta')
        .to('.app-main-card', {
          width: '88vw',
          height: '88vh',
          borderRadius: '32px',
          ease: 'power3.inOut',
          duration: 1.2,
        }, 'cta');
    }, containerRef.current || undefined);

    return () => {
      if (ctxRef.current) {
        ctxRef.current.revert();
      }
    };
  }, [containerRef]);
}`;
  fs.writeFileSync(path.join(appCinematicDir, 'useGsapTimeline.ts'), useGsapTimelineContent);

  // 4. CinematicCanvas.tsx
  const cinematicCanvasContent = `'use client';

import React, { useRef } from 'react';
import dynamic from 'next/dynamic';
import { INJECTED_STYLES } from './constants';
import { useMouseEffects } from './useMouseEffects';
import { useGsapTimeline } from './useGsapTimeline';

const Player = dynamic(() => import('@remotion/player').then(m => ({ default: m.Player })), { ssr: false });
const AppShowcase = dynamic(() => import('@/components/remotion/AppShowcase').then(m => ({ default: m.AppShowcase })), { ssr: false });

export function CinematicCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);

  useMouseEffects(mainCardRef, mockupRef);
  useGsapTimeline(containerRef);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />
      <div ref={containerRef} className="relative w-full min-h-screen bg-black overflow-hidden">
        <div className="app-text-track absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">App Cinematic</h2>
          <p className="text-xl md:text-2xl text-gray-300">Experience the future of mobile</p>
        </div>

        <div ref={mainCardRef} className="app-main-card absolute inset-0 m-auto integr8-card rounded-3xl w-96 h-96 z-30 flex items-center justify-center">
          <div className="card-sheen" />
          <div ref={mockupRef} className="app-mockup-wrap relative w-full h-full" style={{ perspective: '1000px' }}>
            <div className="iphone-bezel w-full h-full flex items-center justify-center rounded-3xl overflow-hidden">
              <div className="screen-glare absolute inset-0" />
              <Player component={AppShowcase} durationInFrames={240} compositionWidth={1080} compositionHeight={1920} fps={30} />
            </div>
          </div>
        </div>

        <div className="app-cta-wrap absolute bottom-16 left-1/2 -translate-x-1/2 z-40">
          <a href="https://wa.me/12269617351" className="btn-green px-8 py-3 rounded-lg inline-block">
            Start Now
          </a>
        </div>
      </div>
    </>
  );
}`;
  fs.writeFileSync(path.join(appCinematicDir, 'CinematicCanvas.tsx'), cinematicCanvasContent);

  // 5. index.tsx
  const appCinematicIndexContent = `'use client';

export { CinematicCanvas as AppCinematic } from './CinematicCanvas';`;
  fs.writeFileSync(path.join(appCinematicDir, 'index.tsx'), appCinematicIndexContent);

  // Delete original
  const originalFile = path.join(ROOT, 'components/sections/AppCinematic.tsx');
  if (fs.existsSync(originalFile)) {
    fs.unlinkSync(originalFile);
  }

  log('✓ AppCinematic modularized', 'success');
}

// === MODULARIZE PILLARSORBITAL ===

function modularizePillarsOrbital() {
  log('Modularizing PillarsOrbital...');

  const pillarsOrbitalDir = path.join(ROOT, 'components/sections/PillarsOrbital');

  // Remove if exists
  if (fs.existsSync(pillarsOrbitalDir)) {
    try {
      execSync(`powershell -NoProfile -Command "Remove-Item -Recurse -Force '${pillarsOrbitalDir}'"`, { stdio: 'ignore' });
    } catch (e) {}
  }
  fs.mkdirSync(pillarsOrbitalDir, { recursive: true });

  // 1. constants.ts
  const pillarsConstantsContent = `export const ORBITAL_CONFIG = {
  radius: 200,
  minOpacity: 0.4,
  rotationSpeed: 0.3,
  autoRotateInterval: 50,
};

export const NODE_STYLES = {
  nodeSize: 'w-16 h-16',
  expandedSize: 'w-80',
  transitionDuration: 'duration-700',
};`;
  fs.writeFileSync(path.join(pillarsOrbitalDir, 'constants.ts'), pillarsConstantsContent);

  // 2. useOrbitalGeometry.ts
  const useOrbitalGeometryContent = `export function calculateOrbitalPosition(
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
}`;
  fs.writeFileSync(path.join(pillarsOrbitalDir, 'useOrbitalGeometry.ts'), useOrbitalGeometryContent);

  // 3. useOrbitalState.ts
  const useOrbitalStateContent = `import { useState, useEffect } from 'react';
import type { Pillar } from '@/data/pillars';

export type MergedPillar = Pillar & {
  title: string;
  shortTitle: string;
  date: string;
  content: string;
};

export function useOrbitalState() {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);

  useEffect(() => {
    let rotationTimer: ReturnType<typeof setInterval>;
    if (autoRotate) {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => Number(((prev + 0.3) % 360).toFixed(3)));
      }, 50);
    }
    return () => { if (rotationTimer) clearInterval(rotationTimer); };
  }, [autoRotate]);

  const toggleItem = (id: number, timelineData: MergedPillar[], getRelatedItems: (id: number) => number[]) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) newState[parseInt(key)] = false;
      });
      newState[id] = !prev[id];
      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);
        const relatedItems = getRelatedItems(id);
        const newPulseEffect: Record<number, boolean> = {};
        relatedItems.forEach((relId) => { newPulseEffect[relId] = true; });
        setPulseEffect(newPulseEffect);
        const nodeIndex = timelineData.findIndex((item) => item.id === id);
        const totalNodes = timelineData.length;
        const targetAngle = (nodeIndex / totalNodes) * 360;
        setRotationAngle(270 - targetAngle);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }
      return newState;
    });
  };

  const reset = () => {
    setExpandedItems({});
    setActiveNodeId(null);
    setPulseEffect({});
    setAutoRotate(true);
  };

  return {
    expandedItems,
    rotationAngle,
    autoRotate,
    pulseEffect,
    activeNodeId,
    toggleItem,
    reset,
  };
}`;
  fs.writeFileSync(path.join(pillarsOrbitalDir, 'useOrbitalState.ts'), useOrbitalStateContent);

  // 4. OrbitalNode.tsx
  const orbitalNodeContent = `import React from 'react';
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
        transform: \`translate(\${position.x}px, \${position.y}px)\`,
        zIndex: isExpanded ? 200 : position.zIndex,
        opacity: isExpanded ? 1 : position.opacity,
      }}
      onClick={onToggle}
    >
      <div
        className={\`relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 \${
          isExpanded ? 'scale-100' : 'scale-100 hover:scale-110'
        } \${
          isRelated
            ? 'bg-gradient-to-br from-blue-500 to-green-500 shadow-lg shadow-blue-500/50'
            : 'bg-white dark:bg-black border-2 border-slate-300 dark:border-white/20'
        } \${
          isPulsing && !isExpanded ? 'animate-pulse' : ''
        }\`}
      >
        <Icon className={isRelated ? 'text-white' : 'text-slate-900 dark:text-white'} size={24} />
      </div>
    </div>
  );
}`;
  fs.writeFileSync(path.join(pillarsOrbitalDir, 'OrbitalNode.tsx'), orbitalNodeContent);

  // 5. NodeCard.tsx
  const nodeCardContent = `import React from 'react';
import { ArrowRight, Link } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { MergedPillar } from './useOrbitalState';

interface NodeCardProps {
  item: MergedPillar;
  isExpanded: boolean;
}

export function NodeCard({ item, isExpanded }: NodeCardProps) {
  if (!isExpanded) return null;

  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
        <Card className="w-96 bg-white dark:bg-black border-slate-200 dark:border-white/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl">{item.title}</CardTitle>
              <Badge className={getStatusBadgeClass(item.status)}>{item.status}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400">{item.content}</p>
            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-800">
              <span className="text-sm text-gray-500">{item.date}</span>
              <Button size="sm" className="gap-2">
                Learn More <ArrowRight size={16} />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function getStatusBadgeClass(status: string): string {
  switch (status) {
    case 'completed':
      return 'bg-white dark:bg-black text-slate-900 dark:text-white border-slate-900 dark:border-white';
    case 'in-progress':
      return 'bg-black dark:bg-white text-white dark:text-black border-white dark:border-black';
    case 'pending':
      return 'bg-black/10 dark:bg-black/40 text-slate-900 dark:text-white border-slate-400 dark:border-white/50';
    default:
      return 'bg-black/10 dark:bg-black/40 text-slate-900 dark:text-white border-slate-400 dark:border-white/50';
  }
}`;
  fs.writeFileSync(path.join(pillarsOrbitalDir, 'NodeCard.tsx'), nodeCardContent);

  // 6. RadialOrbitalTimeline.tsx
  const radialOrbitalTimelineContent = `'use client';

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
      className="w-full h-screen flex flex-col items-center justify-center bg-white dark:bg-[#05080f] overflow-hidden"
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
            <NodeCard key={\`card-\${item.id}\`} item={item} isExpanded={expandedItems[item.id] || false} />
          )
        ))}
      </div>
    </div>
  );
}`;
  fs.writeFileSync(path.join(pillarsOrbitalDir, 'RadialOrbitalTimeline.tsx'), radialOrbitalTimelineContent);

  // 7. index.tsx
  const pillarsIndexContent = `'use client';

import { pillars } from '@/data/pillars';
import { useTranslation } from '@/lib/i18n/context';
import { RadialOrbitalTimeline } from './RadialOrbitalTimeline';
import type { MergedPillar } from './useOrbitalState';

export function PillarsOrbital() {
  const { t } = useTranslation();

  const mergedData: MergedPillar[] = pillars.map((pillar, index) => ({
    ...pillar,
    title: t.pillars.items[index]?.title || '',
    shortTitle: t.pillars.items[index]?.shortTitle || '',
    date: t.pillars.items[index]?.date || '',
    content: t.pillars.items[index]?.content || '',
  }));

  return <RadialOrbitalTimeline timelineData={mergedData} />;
}

export default PillarsOrbital;`;
  fs.writeFileSync(path.join(pillarsOrbitalDir, 'index.tsx'), pillarsIndexContent);

  // Delete original
  const originalFile = path.join(ROOT, 'components/sections/PillarsOrbital.tsx');
  if (fs.existsSync(originalFile)) {
    fs.unlinkSync(originalFile);
  }

  log('✓ PillarsOrbital modularized', 'success');
}

// === CREATE lib/geometry.ts ===

function createGeometryUtils() {
  log('Creating lib/geometry.ts...');

  const geometryContent = `export function calculateOrbitalPosition(
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
}`;

  const libDir = path.join(ROOT, 'lib');
  fs.mkdirSync(libDir, { recursive: true });
  fs.writeFileSync(path.join(libDir, 'geometry.ts'), geometryContent);

  log('✓ lib/geometry.ts created', 'success');
}

// === UPDATE app/page.tsx ===

function updatePageDynamicImports() {
  log('Updating app/page.tsx with dynamic imports...');

  const pageFile = path.join(ROOT, 'app/page.tsx');
  if (!fs.existsSync(pageFile)) {
    log('app/page.tsx not found', 'warning');
    return;
  }

  let content = fs.readFileSync(pageFile, 'utf8');

  // Check if already updated
  if (content.includes('const AppCinematic = dynamic') && content.includes('const PillarsOrbital = dynamic')) {
    log('Dynamic imports already configured', 'info');
    return;
  }

  // Replace old imports
  content = content.replace(
    /import\s*{\s*(AppCinematic|PillarsOrbital)\s*}\s*from\s*['"][^'"]*['"]/g,
    ''
  );

  // Add dynamic imports after 'use client'
  const useClientPos = content.indexOf("'use client';");
  if (useClientPos !== -1) {
    const importSection = `
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const AppCinematic = dynamic(
  () => import('@/components/sections/AppCinematic').then(mod => ({ default: mod.AppCinematic })),
  { loading: () => <div className="h-screen" />, ssr: false }
);

const PillarsOrbital = dynamic(
  () => import('@/components/sections/PillarsOrbital').then(mod => ({ default: mod.PillarsOrbital })),
  { loading: () => <div className="h-[60vh]" />, ssr: false }
);
`;

    const insertPos = useClientPos + "'use client';".length;
    const nextImportPos = content.indexOf('\nimport', insertPos);

    if (nextImportPos !== -1) {
      content = content.slice(0, insertPos) + importSection + content.slice(nextImportPos);
    }
  }

  // Wrap usage with Suspense
  content = content.replace(
    /<AppCinematic\s*\/>/g,
    '<Suspense fallback={<div className="h-screen" />}><AppCinematic /></Suspense>'
  );
  content = content.replace(
    /<PillarsOrbital\s*\/>/g,
    '<Suspense fallback={<div className="h-[60vh]" />}><PillarsOrbital /></Suspense>'
  );

  fs.writeFileSync(pageFile, content);
  log('app/page.tsx updated with dynamic imports', 'success');
}

// === VALIDATE & BUILD ===

function runBuild() {
  log('Running build...');
  try {
    execSync('npm run build', { stdio: 'inherit', cwd: ROOT });
    log('Build successful', 'success');
    return true;
  } catch (e) {
    log('Build failed', 'error');
    return false;
  }
}

// === GIT COMMIT & PUSH ===

function commitAndPush() {
  log('Committing changes...');
  try {
    execSync('git add -A', { cwd: ROOT });
    execSync(
      'git commit -m "refactor: modularize AppCinematic and PillarsOrbital with dynamic imports and geometry utilities"',
      { cwd: ROOT }
    );
    execSync('git push', { cwd: ROOT, stdio: 'inherit' });
    log('Pushed to GitHub', 'success');
  } catch (e) {
    log('Git commit/push skipped', 'warning');
  }
}

// === MAIN ===

async function main() {
  console.log('\n🚀 Sprint 3 - Modularize AppCinematic & PillarsOrbital\n');

  try {
    modularizeAppCinematic();
    modularizePillarsOrbital();
    createGeometryUtils();
    updatePageDynamicImports();

    const buildSuccess = runBuild();
    if (!buildSuccess) {
      log('Build failed. Aborting.', 'error');
      process.exit(1);
    }

    commitAndPush();

    console.log('\n✅ Sprint 3 Complete!\n');
    console.log('What changed:');
    console.log('  • components/sections/AppCinematic/ (5-file modular structure)');
    console.log('  • components/sections/PillarsOrbital/ (7-file modular structure)');
    console.log('  • lib/geometry.ts (orbital utilities)');
    console.log('  • app/page.tsx (dynamic imports added)\n');
  } catch (e) {
    log(`Fatal error: ${e.message}`, 'error');
    process.exit(1);
  }
}

main();
