import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import maillots from '../data/maillots.json';
gsap.registerPlugin(ScrollTrigger);
export default function HorizontalScroll() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const pinRef = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const distance = track.scrollWidth - window.innerWidth;
      gsap.to(track, {
        x: -distance, ease: 'none',
        scrollTrigger: {
          trigger: pinRef.current, pin: true, scrub: 1,
          start: 'top top', end: () => '+=' + distance, invalidateOnRefresh: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);
  const formatPrix = (p) => new Intl.NumberFormat('fr-FR').format(p) + ' FCFA';
  const WA = '221000000000';
  return (
    <section ref={sectionRef} className="relative py-24 bg-[#0a0a0a] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <h2 className="text-5xl md:text-7xl font-black tracking-tight"><span className="text-[#f1c40f]">★</span> Nos <span className="text-[#e63946]">vedettes</span></h2>
        <p className="mt-4 text-white/60 text-lg max-w-xl">Fais défiler pour découvrir les plus populaires.</p>
      </div>
      <div ref={pinRef} className="w-full overflow-hidden">
        <div ref={trackRef} className="flex items-center gap-10 px-6 w-max">
          {maillots.map((product, idx) => (
            <div key={product.id} className="group relative flex-shrink-0 w-[80vw] md:w-[40vw] h-[70vh] rounded-3xl overflow-hidden">
              <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105" style={{
                background: product.equipe === 'Sénégal' ? 'linear-gradient(135deg,#065a4c,#033f35)' :
                  product.equipe === 'Liverpool' ? 'linear-gradient(135deg,#c8102e,#8a0a20)' :
                  'linear-gradient(135deg,#004d98,#a50044)',
              }} />
              <div className="absolute inset-0 flex items-center justify-center text-[18vw] opacity-20 font-black">
                {product.equipe === 'Sénégal' && '🇸🇳'}
                {product.equipe === 'Liverpool' && 'LFC'}
                {product.equipe === 'Barcelone' && 'BARÇA'}
              </div>
              <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between">
                <div><span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-sm font-bold tracking-wider uppercase">#{String(idx+1).padStart(2,'0')} — Populaire</span></div>
                <div>
                  <h3 className="text-5xl md:text-7xl font-black mb-3 drop-shadow-lg">{product.equipe}</h3>
                  <p className="text-2xl font-bold text-white/90 mb-4">{formatPrix(product.prix)}</p>
                  <div className="flex gap-2 flex-wrap">{product.tailles.map((t) => (<span key={t} className="px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-sm font-semibold text-sm">Taille {t}</span>))}</div>
                </div>
              </div>
            </div>
          ))}
          <div className="flex-shrink-0 w-[80vw] md:w-[40vw] h-[70vh] rounded-3xl bg-gradient-to-br from-[#e63946] to-[#f1c40f] p-8 md:p-12 flex flex-col justify-between text-[#0a0a0a]">
            <h3 className="text-5xl md:text-7xl font-black leading-none">Tu ne trouves pas ton bonheur ?</h3>
            <div>
              <p className="text-xl font-semibold mb-4">Des dizaines d'autres maillots disponibles sur WhatsApp !</p>
              <a href={'https://wa.me/'+WA} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0a0a0a] text-white font-bold hover:opacity-90 transition">Contacter Sam's →</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
