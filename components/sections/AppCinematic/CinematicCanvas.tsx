'use client';

import React, { useRef } from 'react';
import dynamic from 'next/dynamic';
import { INJECTED_STYLES } from './constants';
import { useMouseEffects } from './useMouseEffects';
import { useGsapTimeline } from './useGsapTimeline';

const Player = dynamic(() => import('@remotion/player').then(m => ({ default: m.Player })), { ssr: false });
const AppShowcase = dynamic(() => import('@/components/remotion/AppShowcase').then(m => ({ default: m.AppShowcase })), { ssr: false });

import { useTranslation } from '@/lib/i18n/context';
import { WA_ROUTES } from '@/data/constants';

export function CinematicCanvas() {
  const { t } = useTranslation();
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
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">{t.appCinematic.eyebrow}</h2>
          <p className="text-xl md:text-2xl text-gray-300">{t.appCinematic.headline}</p>
        </div>

        <div ref={mainCardRef} className="app-main-card absolute inset-0 m-auto integr8-card rounded-3xl w-96 h-96 z-30 flex items-center justify-center">
          <div className="card-sheen" />
          <div ref={mockupRef} className="app-mockup-wrap relative w-full h-full" style={{ perspective: '1000px' }}>
            <div className="iphone-bezel w-full h-full flex items-center justify-center rounded-3xl overflow-hidden relative">
              <div className="screen-glare absolute inset-0 z-10 pointer-events-none" />
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              >
                <source src="/videos/app-showcase-video.mp4" type="video/mp4" />
              </video>
            </div>          </div>
        </div>

        <div className="app-cta-wrap absolute bottom-16 left-1/2 -translate-x-1/2 z-40">
          <a href={WA_ROUTES.contact} className="btn-green px-8 py-3 rounded-lg inline-block">
            {t.appCinematic.cta || 'Começar Agora'}
          </a>
        </div>
      </div>
    </>
  );
}