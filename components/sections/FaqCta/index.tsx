'use client';

import { useTranslation } from '@/lib/i18n/context';
import { FaqAccordion } from './FaqAccordion';
import { GuaranteeBlock } from './GuaranteeBlock';
import { CtaFinal } from './CtaFinal';

export function FaqCta() {
  const { t } = useTranslation();

  return (
    <>
      <FaqAccordion
        eyebrow={t.faq.eyebrow}
        headline={t.faq.headline}
        items={t.faq.items}
      />
      <GuaranteeBlock
        guarantee={t.faq.guarantee}
        guaranteeBody={t.faq.guaranteeBody}
      />
      <CtaFinal
        ctaHeadline={t.faq.ctaHeadline}
        ctaBody={t.faq.ctaBody}
        ctaButton={t.faq.ctaButton}
        navCta={t.nav.cta}
      />
    </>
  );
}

export default FaqCta;
