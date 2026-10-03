import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
export default function Marquee() {
  const trackRef = useRef(null);
  const items = ['SÉNÉGAL 🇸🇳','LIVERPOOL 🔴','BARÇA 🔵🔴','PSG 🔵🔴','REAL MADRID ⚪','MAN UNITED 🔴','JUVENTUS ⚫⚪','BAYERN 🔴'];
  useEffect(() => {
    const track = trackRef.current; if (!track) return;
    gsap.to(track, { xPercent: -50, duration: 30, ease: 'none', repeat: -1 });
  }, []);
  return (
    <div className="relative w-full overflow-hidden py-6 bg-[#e63946] border-y-4 border-black">
      <div ref={trackRef} className="flex w-max items-center gap-12 whitespace-nowrap text-white font-black text-3xl md:text-5xl tracking-tight">
        {[...items, ...items].map((item, i) => (<span key={'a-'+i} className="flex items-center gap-12">{item}<span className="text-[#f1c40f]">✦</span></span>))}
      </div>
    </div>
  );
}
