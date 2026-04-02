'use client';

import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';

type CountdownTimerProps = {
  isDark?: boolean;
};

export const CountdownTimer = ({ isDark = true }: CountdownTimerProps) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Loop infinito de 24 horas = 86400 segundos
  const secondsPerDay = 86400;
  const framePerSecond = fps;
  const totalFramesFor24h = secondsPerDay * framePerSecond;

  // Progresso do dia (0 a 1)
  const dayProgress = ((frame % totalFramesFor24h) / totalFramesFor24h) * 100;

  // Calcular tempo restante (24h - progresso)
  const percentageLeft = 100 - dayProgress;
  const secondsLeft = Math.floor((percentageLeft / 100) * secondsPerDay);

  // Converter para HH:MM:SS
  const hours = Math.floor(secondsLeft / 3600)
    .toString()
    .padStart(2, '0');
  const minutes = Math.floor((secondsLeft % 3600) / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (secondsLeft % 60).toString().padStart(2, '0');

  const accentColor = '#22c55e';
  const bgColor = isDark ? '#05080f' : '#f8fafc';
  const textColor = isDark ? '#ffffff' : '#000000';
  const mutedColor = isDark ? '#6b7280' : '#9ca3af';

  // Efeito de flip em cada dígito (muda a cada segundo)
  const flipAmount = (frame % fps) / fps; // 0 a 1 durante o segundo

  return (
    <AbsoluteFill
      style={{
        backgroundColor: bgColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '16px',
        padding: '20px',
      }}
    >
      {/* Título */}
      <p
        style={{
          margin: 0,
          fontSize: '14px',
          fontWeight: 600,
          color: mutedColor,
          textTransform: 'uppercase',
          letterSpacing: '1px',
        }}
      >
        Oferta encerra em:
      </p>

      {/* Timer display com efeito flip */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
          fontSize: '48px',
          fontWeight: 900,
          color: accentColor,
          fontFamily: 'monospace',
          letterSpacing: '4px',
        }}
      >
        {/* Horas */}
        <div
          style={{
            transform: `perspective(600px) rotateX(${Math.sin(flipAmount * Math.PI) * 15}deg)`,
            transition: 'none',
            backgroundColor: isDark ? '#1f2937' : '#f3f4f6',
            padding: '8px 12px',
            borderRadius: '8px',
          }}
        >
          {hours}
        </div>

        <span>:</span>

        {/* Minutos */}
        <div
          style={{
            transform: `perspective(600px) rotateX(${Math.sin(flipAmount * Math.PI) * 15}deg)`,
            transition: 'none',
            backgroundColor: isDark ? '#1f2937' : '#f3f4f6',
            padding: '8px 12px',
            borderRadius: '8px',
          }}
        >
          {minutes}
        </div>

        <span>:</span>

        {/* Segundos */}
        <div
          style={{
            transform: `perspective(600px) rotateX(${Math.sin(flipAmount * Math.PI) * 15}deg)`,
            transition: 'none',
            backgroundColor: isDark ? '#1f2937' : '#f3f4f6',
            padding: '8px 12px',
            borderRadius: '8px',
          }}
        >
          {seconds}
        </div>
      </div>

      {/* Barra de progresso */}
      <div
        style={{
          width: '100%',
          maxWidth: '300px',
          height: '4px',
          backgroundColor: isDark ? '#1f2937' : '#e5e7eb',
          borderRadius: '2px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            backgroundColor: accentColor,
            width: `${percentageLeft}%`,
            transition: 'none',
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
