import { LanguageProvider } from '@/components/LanguageToggle'
import LanguageToggle from '@/components/LanguageToggle'
import ThemeToggle from '@/components/ThemeToggle'
import Hero from '@/components/Hero'
import Identificacao from '@/components/Identificacao'
import Absolvicao from '@/components/Absolvicao'
import Diferencial from '@/components/Diferencial'
import Denis from '@/components/Denis'
import ImagensMentais from '@/components/ImagensMentais'
import Oferta from '@/components/Oferta'
import FAQ from '@/components/FAQ'
import CtaFinal from '@/components/CtaFinal'
import ExitPopup from '@/components/ExitPopup'
import Footer from '@/components/Footer'

export default function Page() {
  return (
    <LanguageProvider>
      <div
        style={{
          position: 'fixed',
          top: '16px',
          right: '24px',
          zIndex: 50,
          display: 'flex',
          gap: '12px',
          alignItems: 'center',
        }}
      >
        <LanguageToggle />
        <ThemeToggle />
      </div>
      <main>
        <Hero />
        <Identificacao />
        <Absolvicao />
        <Diferencial />
        <Denis />
        <ImagensMentais />
        <Oferta />
        <FAQ />
        <CtaFinal />
      </main>
      <Footer />
      <ExitPopup />
    </LanguageProvider>
  )
}
