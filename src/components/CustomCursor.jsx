import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
export default function CustomCursor() {
  const cursorOuterRef = useRef(null);
  const cursorInnerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const outer = cursorOuterRef.current; const inner = cursorInnerRef.current;
    if (!outer || !inner) return;
    const onMouseMove = (e) => {
      gsap.set(inner, { x: e.clientX, y: e.clientY });
      gsap.to(outer, { x: e.clientX, y: e.clientY, duration: 0.45, ease: 'power2.out' });
    };
    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => setIsVisible(false);
    const addHoverListeners = () => {
      const targets = document.querySelectorAll('a, button, .magnetic, input, textarea, select, [role="button"]');
      targets.forEach((el) => {
        el.addEventListener('mouseenter', () => {
          gsap.to(outer, { width: 70, height: 70, backgroundColor: 'rgba(230,57,70,0.15)', borderColor: '#e63946', duration: 0.3, ease: 'power2.out' });
          gsap.to(inner, { opacity: 0, duration: 0.2 });
          if (el.classList.contains('magnetic')) {
            const handleMagneticMove = (ev) => {
              const rect = el.getBoundingClientRect();
              const relX = ev.clientX - rect.left - rect.width / 2;
              const relY = ev.clientY - rect.top - rect.height / 2;
              gsap.to(el, { x: relX * 0.35, y: relY * 0.35, duration: 0.4, ease: 'power2.out' });
            };
            el._magneticMove = handleMagneticMove;
            el.addEventListener('mousemove', handleMagneticMove);
          }
        });
        el.addEventListener('mouseleave', () => {
          gsap.to(outer, { width: 40, height: 40, backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.5)', duration: 0.3, ease: 'power2.out' });
          gsap.to(inner, { opacity: 1, duration: 0.2 });
          if (el._magneticMove) {
            el.removeEventListener('mousemove', el._magneticMove);
            el._magneticMove = null;
            gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1,0.3)' });
          }
        });
      });
    };
    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);
    const t = setTimeout(addHoverListeners, 500);
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => {
      clearTimeout(t); observer.disconnect();
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);
  const isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
  if (isTouch) return null;
  return (
    <>
      <div ref={cursorOuterRef} className="pointer-events-none fixed top-0 left-0 z-[9998] rounded-full mix-blend-difference" style={{ width:40, height:40, marginLeft:-20, marginTop:-20, border:'2px solid rgba(255,255,255,0.5)', backgroundColor:'rgba(255,255,255,0.05)', opacity: isVisible ? 1 : 0, transition:'opacity 0.2s', willChange:'transform' }} />
      <div ref={cursorInnerRef} className="pointer-events-none fixed top-0 left-0 z-[9998] rounded-full bg-[#f1c40f] mix-blend-difference" style={{ width:8, height:8, marginLeft:-4, marginTop:-4, opacity: isVisible ? 1 : 0, transition:'opacity 0.15s', willChange:'transform' }} />
    </>
  );
}
