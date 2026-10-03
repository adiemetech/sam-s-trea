import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const fillRef = useRef(null);
  useEffect(() => {
    const tl = gsap.timeline({ onComplete: () => { if (onComplete) onComplete(); } });
    tl.fromTo(logoRef.current, { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out' });
    tl.fromTo(fillRef.current, { width: '0%' }, {
      width: '100%', duration: 1.8, ease: 'power2.inOut',
      onUpdate: function () { setProgress(Math.round(this.progress() * 100)); },
    }, '-=0.6');
    tl.to(containerRef.current, { clipPath: 'inset(0 0 100% 0)', duration: 0.9, ease: 'power4.inOut' }, '+=0.2');
    tl.set(containerRef.current, { display: 'none' });
  }, [onComplete]);
  return (
    <div ref={containerRef} className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0a0a] text-white" style={{ clipPath: 'inset(0 0 0% 0)' }}>
      <h1 ref={logoRef} className="text-6xl md:text-8xl font-black tracking-tight mb-12">
        <span className="text-[#e63946]">Sam</span><span className="text-white">'</span><span className="text-[#f1c40f]">s</span>
      </h1>
      <div className="w-64 md:w-96 h-1 bg-white/20 rounded-full overflow-hidden">
        <div ref={fillRef} className="h-full bg-gradient-to-r from-[#e63946] to-[#f1c40f] rounded-full" style={{ width: '0%' }} />
      </div>
      <div className="mt-4 text-sm font-medium tracking-widest text-white/60">CHARGEMENT... {progress}%</div>
    </div>
  );
}
