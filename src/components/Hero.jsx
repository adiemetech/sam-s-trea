import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
export default function Hero() {
  const heroRef = useRef(null);
  const bgRef = useRef(null);
  const jerseysRef = useRef(null);
  const textRef = useRef(null);
  const particlesRef = useRef(null);
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i, top: Math.random() * 100, left: Math.random() * 100,
    size: Math.random() * 6 + 2, delay: Math.random() * 2,
  }));
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true },
      });
      tl.to(bgRef.current, { y: -60, ease: 'none' }, 0);
      tl.to(jerseysRef.current, { y: -120, ease: 'none' }, 0);
      tl.to(textRef.current, { y: -200, scale: 1.1, ease: 'none' }, 0);
      tl.to(particlesRef.current, { y: -280, ease: 'none' }, 0);
      const handleMouseMove = (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        gsap.to(bgRef.current, { x: x * 10, y: y * 10, duration: 1.2, ease: 'power2.out' });
        gsap.to(jerseysRef.current, { x: x * 25, y: y * 25, duration: 1, ease: 'power2.out' });
        gsap.to(textRef.current, { x: x * 40, y: y * 40, duration: 0.8, ease: 'power2.out' });
        gsap.to(particlesRef.current, { x: x * 60, y: y * 60, duration: 0.6, ease: 'power2.out' });
      };
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, heroRef);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={heroRef} className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#16213e] flex items-center justify-center">
      <div ref={bgRef} className="absolute inset-0 will-change-transform">
        <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-[#e63946]/20 blur-[120px]" />
        <div className="absolute bottom-20 right-20 w-[30rem] h-[30rem] rounded-full bg-[#f1c40f]/15 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[50rem] rounded-full bg-[#065a4c]/20 blur-[160px]" />
      </div>
      <div ref={jerseysRef} className="absolute inset-0 flex items-center justify-center will-change-transform">
        <div className="relative w-[80%] max-w-5xl h-[60%]">
          <div className="absolute left-0 top-0 w-48 h-64 md:w-64 md:h-80 bg-gradient-to-br from-[#065a4c] to-[#033f35] rounded-lg shadow-2xl rotate-[-12deg] opacity-80 flex items-center justify-center text-white text-6xl font-black">🇸🇳</div>
          <div className="absolute right-0 top-10 w-48 h-64 md:w-64 md:h-80 bg-gradient-to-br from-[#c8102e] to-[#8a0a20] rounded-lg shadow-2xl rotate-[8deg] opacity-80 flex items-center justify-center text-white text-6xl font-black">LFC</div>
          <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-56 h-72 md:w-72 md:h-96 bg-gradient-to-br from-[#004d98] via-[#a50044] to-[#004d98] rounded-lg shadow-2xl rotate-[-3deg] opacity-90 flex items-center justify-center text-white text-6xl font-black">BARÇA</div>
        </div>
      </div>
      <div ref={textRef} className="relative z-10 will-change-transform select-none">
        <h1 className="text-[18vw] md:text-[14vw] font-black leading-none tracking-tighter mix-blend-difference text-white">
          <span className="inline-block">Sam</span><span className="inline-block text-[#f1c40f]">'s</span>
        </h1>
        <p className="mt-6 text-center text-white/70 text-lg md:text-2xl tracking-[0.3em] uppercase">Maillots de football — Sénégal</p>
      </div>
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none will-change-transform">
        {particles.map((p) => (
          <span key={p.id} className="absolute rounded-full bg-white/40 animate-pulse" style={{ top:p.top+'%', left:p.left+'%', width:p.size+'px', height:p.size+'px', animationDelay:p.delay+'s' }} />
        ))}
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 text-xs tracking-widest">
        <span>SCROLL</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
