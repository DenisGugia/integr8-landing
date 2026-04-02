'use client';

import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';

type AppShowcaseProps = {
  isDark?: boolean;
};

const APP_SCREENS = [
  { title: 'Onboarding', desc: 'Configure seu perfil' },
  { title: 'Dashboard', desc: 'Acompanhe o progresso' },
  { title: 'Workouts', desc: 'Treinos personalizados' },
  { title: 'Comunidade', desc: 'Conecte com outros' },
];

export const AppShowcase = ({ isDark = true }: AppShowcaseProps) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const accentColor = '#22c55e';
  const accentBlue = '#3b82f6';
  const bgColor = isDark ? '#05080f' : '#f8fafc';
  const surfaceColor = isDark ? '#0d1117' : '#ffffff';
  const textColor = isDark ? '#ffffff' : '#000000';
  const mutedColor = isDark ? '#6b7280' : '#9ca3af';

  // Transição entre telas a cada ~5 segundos
  const SCREEN_DURATION = 1.5 * fps; // 1.5 segundos por tela
  const currentScreenIndex = Math.floor(frame / SCREEN_DURATION) % APP_SCREENS.length;
  const screenProgress = (frame % SCREEN_DURATION) / SCREEN_DURATION;

  // Fade out da tela anterior, fade in da próxima
  const opacity = Math.sin(screenProgress * Math.PI);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: bgColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      {/* Gradiente de fundo */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: isDark
            ? 'linear-gradient(135deg, #05080f 0%, #0d1117 100%)'
            : 'linear-gradient(135deg, #f8fafc 0%, #f3f4f6 100%)',
          opacity: 0.5,
        }}
      />

      {/* Mockup do smartphone */}
      <div
        style={{
          position: 'relative',
          width: 280,
          height: 580,
          backgroundColor: surfaceColor,
          borderRadius: '40px',
          padding: '12px',
          boxShadow: isDark
            ? '0 20px 60px rgba(34, 197, 94, 0.2), 0 0 60px rgba(59, 130, 246, 0.1)'
            : '0 20px 60px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 10,
        }}
      >
        {/* Status bar */}
        <div
          style={{
            height: '24px',
            backgroundColor: surfaceColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingLeft: '16px',
            paddingRight: '16px',
            fontSize: '12px',
            color: textColor,
            borderBottom: `1px solid ${isDark ? '#1f2937' : '#e5e7eb'}`,
          }}
        >
          <span>9:41</span>
          <span>●●●●●</span>
        </div>

        {/* Conteúdo da tela */}
        <div
          style={{
            flex: 1,
            padding: '24px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            opacity,
          }}
        >
          {/* Badge FitBudd */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: accentColor,
              color: '#000000',
              padding: '6px 12px',
              borderRadius: '12px',
              fontSize: '12px',
              fontWeight: 600,
              marginBottom: '16px',
              width: 'fit-content',
            }}
          >
            ✓ FitBudd
          </div>

          {/* Título da tela */}
          <h2
            style={{
              margin: '0 0 8px 0',
              fontSize: '20px',
              fontWeight: 700,
              color: textColor,
            }}
          >
            {APP_SCREENS[currentScreenIndex].title}
          </h2>

          {/* Descrição */}
          <p
            style={{
              margin: '0 0 16px 0',
              fontSize: '14px',
              color: mutedColor,
            }}
          >
            {APP_SCREENS[currentScreenIndex].desc}
          </p>

          {/* Placeholder de conteúdo */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              gap: '8px',
              flexDirection: 'column',
            }}
          >
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  height: '50px',
                  backgroundColor: isDark ? '#1f2937' : '#f3f4f6',
                  borderRadius: '12px',
                  marginBottom: '8px',
                }}
              />
            ))}
          </div>

          {/* CTA Button */}
          <button
            style={{
              padding: '12px 24px',
              backgroundColor: accentBlue,
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              marginTop: '16px',
            }}
          >
            Começar
          </button>
        </div>

        {/* Notch simulado */}
        <div
          style={{
            position: 'absolute',
            top: '0',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '150px',
            height: '24px',
            backgroundColor: surfaceColor,
            borderRadius: '0 0 20px 20px',
            zIndex: 20,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
