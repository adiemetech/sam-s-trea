import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
export default function useParallax({ speed = 80, start = 'top bottom', end = 'bottom top', trigger = null } = {}) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const triggerEl = trigger || el;
    const tween = gsap.fromTo(el, { y: -speed / 2 }, {
      y: speed / 2, ease: 'none',
      scrollTrigger: { trigger: triggerEl, start, end, scrub: true },
    });
    return () => { if (tween.scrollTrigger) tween.scrollTrigger.kill(); tween.kill(); };
  }, [speed, start, end, trigger]);
  return ref;
}
