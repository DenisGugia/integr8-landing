"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useGsapTimeline(containerRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.set(".app-text-track", { autoAlpha: 0, y: 50, filter: "blur(16px)" });
      gsap.set(".app-main-card", { y: window.innerHeight + 100, autoAlpha: 1 });
      gsap.set(".app-mockup-wrap", { autoAlpha: 0, y: 100, scale: 0.8 });
      gsap.set(".app-cta-wrap", { autoAlpha: 0, scale: 0.9, filter: "blur(20px)" });

      const introTl = gsap.timeline({ delay: 0.2 });
      introTl.to(".app-text-track", {
        duration: 1.4,
        autoAlpha: 1,
        y: 0,
        filter: "blur(0px)",
        ease: "expo.out",
      });

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=4000",
          pin: true,
          scrub: 1,
        },
      });

      scrollTl
        .to([".app-text-track"], { scale: 1.1, filter: "blur(16px)", opacity: 0.2, duration: 1.5 }, 0)
        .to(".app-main-card", { y: 0, ease: "power3.inOut", duration: 1.5 }, 0)
        .to(".app-main-card", { width: "100%", height: "100%", borderRadius: "0px", duration: 1.2 })
        .fromTo(".app-mockup-wrap",
          { y: 200, autoAlpha: 0, scale: 0.7 },
          { y: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 2 }
        )
        .to({}, { duration: 2 })
        .set(".app-text-track", { autoAlpha: 0 })
        .set(".app-cta-wrap", { autoAlpha: 1 })
        .to(".app-cta-wrap", { scale: 1, filter: "blur(0px)", ease: "expo.out", duration: 1.5 }, "cta")
        .to(".app-main-card", {
          width: "88vw",
          height: "88vh",
          borderRadius: "32px",
          ease: "expo.inOut",
          duration: 1.5,
        }, "cta")
        .to(".app-main-card", { y: -window.innerHeight - 200, ease: "power3.in", duration: 1.2 });
    }, containerRef);

    return () => ctx.revert();
  }, []);
}
