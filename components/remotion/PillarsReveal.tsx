'use client';

import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

type PillarsRevealProps = {
  isDark?: boolean;
};

const PILLAR_ICONS = ['🧠', '💪', '⚡', '🔥', '🎯', '💎', '🌱', '🏆'];

export const PillarsReveal = ({ isDark = true }: PillarsRevealProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const accentColor = '#22c55e';
  const textColor = isDark ? '#ffffff' : '#000000';
  const bgColor = isDark ? '#05080f' : '#f8fafc';

  // Cada pilar entra a cada 0.5 segundos
  const STAGGER_INTERVAL = 0.5 * fps;

  return (
    <AbsoluteFill style={{ backgroundColor: bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Posiciona os pilares em círculo */}
      <svg width="100%" height="100%" style={{ position: 'absolute' }}>
        {/* Linhas de conexão (desenham progressivamente) */}
        {PILLAR_ICONS.map((_, index) => {
          const nextIndex = (index + 1) % PILLAR_ICONS.length;
          const angle1 = (index / PILLAR_ICONS.length) * 360;
          const angle2 = (nextIndex / PILLAR_ICONS.length) * 360;

          const radius = 150;
          const centerX = 540; // Metade de 1080
          const centerY = 540;

          const x1 = centerX + radius * Math.cos((angle1 * Math.PI) / 180);
          const y1 = centerY + radius * Math.sin((angle1 * Math.PI) / 180);
          const x2 = centerX + radius * Math.cos((angle2 * Math.PI) / 180);
          const y2 = centerY + radius * Math.sin((angle2 * Math.PI) / 180);

          // Desenho progressivo da linha
          const lineStartFrame = index * STAGGER_INTERVAL;
          const lineProgress = interpolate(frame, [lineStartFrame, lineStartFrame + STAGGER_INTERVAL], [0, 1], {
            extrapolateRight: 'clamp',
          });

          const lineLength = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
          const dashoffset = lineLength * (1 - lineProgress);

          return (
            <line
              key={`line-${index}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={accentColor}
              strokeWidth="2"
              opacity="0.3"
              strokeDasharray={lineLength}
              strokeDashoffset={dashoffset}
            />
          );
        })}
      </svg>

      {/* Ícones em círculo */}
      <div style={{ position: 'relative', width: 300, height: 300 }}>
        {PILLAR_ICONS.map((icon, index) => {
          const angle = (index / PILLAR_ICONS.length) * 360;
          const radius = 150;
          const x = radius * Math.cos((angle * Math.PI) / 180);
          const y = radius * Math.sin((angle * Math.PI) / 180);

          // Spring bounce entrance
          const startFrame = index * STAGGER_INTERVAL;
          const springScale = spring({
            frame: frame - startFrame,
            fps,
            config: { damping: 20, stiffness: 200 },
            durationInFrames: 0.6 * fps,
          });

          const scale = interpolate(springScale, [0, 1], [0, 1], {
            extrapolateRight: 'clamp',
          });

          return (
            <div
              key={`pillar-${index}`}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: 60,
                height: 60,
                marginLeft: -30,
                marginTop: -30,
                transform: `translate(${x}px, ${y}px) scale(${scale})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 40,
                opacity: scale > 0 ? 1 : 0,
              }}
            >
              {icon}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
