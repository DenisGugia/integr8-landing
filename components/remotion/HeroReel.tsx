'use client';

import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Sequence, spring } from 'remotion';

type HeroReelProps = {
  isDark?: boolean;
};

export const HeroReel = ({ isDark = true }: HeroReelProps) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Timeline segmentos
  const TEXT_1_START = 0;
  const TEXT_1_DURATION = 2 * fps; // 2 segundos para "PROTOCOLO C.O.R.E. 8"
  const TEXT_2_START = 3 * fps; // Inicia depois de 3 segundos
  const TEXT_2_DURATION = 2 * fps;
  const FADE_OUT_START = durationInFrames - 1 * fps; // Último segundo

  // Typewriter effect para "PROTOCOLO C.O.R.E. 8"
  const text1 = 'PROTOCOLO C.O.R.E. 8';
  const charCount1 = Math.floor(
    interpolate(frame, [TEXT_1_START, TEXT_1_START + TEXT_1_DURATION], [0, text1.length], {
      extrapolateRight: 'clamp',
    })
  );
  const displayText1 = text1.slice(0, charCount1);

  // Fade in para "16 semanas. Resultado real."
  const text2 = '16 semanas. Resultado real.';
  const opacity2 = interpolate(frame, [TEXT_2_START, TEXT_2_START + 1 * fps], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // Fade out geral
  const fadeOut = interpolate(frame, [FADE_OUT_START, durationInFrames], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const bgColor = isDark ? '#05080f' : '#f8fafc';
  const textColor = isDark ? '#ffffff' : '#000000';
  const accentColor = '#22c55e';

  return (
    <AbsoluteFill style={{ backgroundColor: bgColor, opacity: fadeOut }}>
      {/* Partículas sutis (pseudoelementos de fundo) */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: isDark
            ? 'radial-gradient(circle at 20% 50%, rgba(34, 197, 94, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.05) 0%, transparent 50%)'
            : 'radial-gradient(circle at 20% 50%, rgba(34, 197, 94, 0.05) 0%, transparent 50%)',
        }}
      />

      {/* Container central */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          gap: '40px',
          padding: '40px',
          textAlign: 'center',
        }}
      >
        {/* Texto 1: Typewriter */}
        <h1
          style={{
            margin: 0,
            fontSize: '72px',
            fontWeight: 900,
            color: accentColor,
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
            letterSpacing: '-2px',
            minHeight: '90px',
          }}
        >
          {displayText1}
        </h1>

        {/* Texto 2: Fade in */}
        <p
          style={{
            margin: 0,
            fontSize: '48px',
            fontWeight: 600,
            color: textColor,
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
            opacity: opacity2,
          }}
        >
          {text2}
        </p>
      </div>
    </AbsoluteFill>
  );
};
