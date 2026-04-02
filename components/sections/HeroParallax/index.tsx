'use client';

import { useTranslation } from '@/lib/i18n/context';
import { HeroVideo } from './HeroVideo';
import { ParallaxSection } from './ParallaxBlock';
import { internalBlocks, type ParallaxBlock } from './constants';

export function HeroParallax() {
  const { t } = useTranslation();

  const mergedBlocks: ParallaxBlock[] = internalBlocks.map((b, i) => ({
    ...b,
    ...t.hero.blocks[i],
  }));

  return (
    <div className="bg-white dark:bg-[#05080f]">
      <HeroVideo
        eyebrow={t.hero.eyebrow}
        headline={t.hero.headline}
        sub={t.hero.sub}
        cta={t.hero.cta}
      />
      <div id="como-funciona">
        {mergedBlocks.map((block, i) => (
          <ParallaxSection key={i} {...block} />
        ))}
      </div>
    </div>
  );
}

export default HeroParallax;
