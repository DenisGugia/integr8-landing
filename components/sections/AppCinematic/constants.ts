export const INJECTED_STYLES = `
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
`;

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
};