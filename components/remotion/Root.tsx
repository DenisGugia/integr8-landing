'use client';

import { Composition, Folder } from 'remotion';
import { HeroReel } from './HeroReel';
import { PillarsReveal } from './PillarsReveal';
import { AppShowcase } from './AppShowcase';
import { CountdownTimer } from './CountdownTimer';

export const RemotionRoot = () => (
  <Folder name="INTEGR8 Landing">
    <Composition
      id="HeroReel"
      component={HeroReel}
      durationInFrames={900}
      fps={30}
      width={1920}
      height={1080}
      defaultProps={{ isDark: true }}
    />

    <Composition
      id="PillarsReveal"
      component={PillarsReveal}
      durationInFrames={450}
      fps={30}
      width={1080}
      height={1080}
      defaultProps={{ isDark: true }}
    />

    <Composition
      id="AppShowcase"
      component={AppShowcase}
      durationInFrames={600}
      fps={30}
      width={390}
      height={844}
      defaultProps={{ isDark: true }}
    />

    <Composition
      id="CountdownTimer"
      component={CountdownTimer}
      durationInFrames={720}
      fps={30}
      width={600}
      height={200}
      defaultProps={{ isDark: true }}
    />
  </Folder>
);
