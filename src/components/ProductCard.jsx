import { useRef } from 'react';
import { motion } from 'framer-motion';
export default function ProductCard({ product, onAddToCart }) {
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const formatPrix = (p) => new Intl.NumberFormat('fr-FR').format(p) + ' FCFA';
  const WA = '221000000000';
  const handleMouseMove = (e) => {
    const card = cardRef.current; const img = imageRef.current;
    if (!card || !img) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    card.style.transform = 'perspective(1000px) rotateX('+((0.5-y)*30)+'deg) rotateY('+((x-0.5)*30)+'deg) scale3d(1.03,1.03,1.03)';
    img.style.transform = 'translate('+((x-0.5)*-20)+'px,'+((y-0.5)*-20)+'px) scale(1.1)';
  };
  const handleMouseLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1,1,1)';
    if (imageRef.current) imageRef.current.style.transform = 'translate(0,0) scale(1)';
  };
  const whatsappLink = 'https://wa.me/'+WA+'?text='+encodeURIComponent('Bonjour Sam\'s, je suis intéressé par le maillot '+product.equipe+' à '+formatPrix(product.prix)+'.');
  return (
    <motion.article
      ref={cardRef}
      onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="group relative w-full max-w-sm rounded-2xl overflow-hidden bg-white dark:bg-[#1a1a1a] shadow-xl will-change-transform transition-transform duration-200 ease-out"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="relative h-72 w-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-[#222] dark:to-[#111]">
        <div ref={imageRef} className="absolute inset-0 flex items-center justify-center text-7xl transition-transform duration-200 ease-out">
          {product.image === 'senegal.jpg' && (<div className="w-40 h-56 bg-gradient-to-br from-[#065a4c] to-[#033f35] rounded-lg shadow-lg flex items-center justify-center text-5xl">🇸🇳</div>)}
          {product.image === 'liverpool.jpg' && (<div className="w-40 h-56 bg-gradient-to-br from-[#c8102e] to-[#8a0a20] rounded-lg shadow-lg flex items-center justify-center text-4xl font-black text-white">LFC</div>)}
          {product.image === 'barca.jpg' && (<div className="w-40 h-56 bg-gradient-to-br from-[#004d98] via-[#a50044] to-[#004d98] rounded-lg shadow-lg flex items-center justify-center text-4xl font-black text-white">BARÇA</div>)}
        </div>
        <span className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full bg-[#e63946] text-white text-xs font-bold uppercase tracking-wider shadow-lg">Nouveau</span>
      </div>
      <div className="p-5 space-y-3" style={{ transform: 'translateZ(30px)' }}>
        <div className="flex items-start justify-between">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{product.equipe}</h3>
          <p className="text-lg font-black text-[#e63946] dark:text-[#f1c40f]">{formatPrix(product.prix)}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {product.tailles.map((t) => (
            <span key={t} className="px-2.5 py-1 text-xs font-semibold rounded-md bg-gray-100 dark:bg-[#2a2a2a] text-gray-700 dark:text-gray-200">{t}</span>
          ))}
        </div>
        <div className="pt-2 flex gap-2">
          <button onClick={() => onAddToCart && onAddToCart(product)} className="flex-1 py-2.5 rounded-xl font-bold text-sm bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:opacity-90 transition-opacity">+ Panier</button>
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm bg-[#25D366] text-white hover:brightness-110 transition">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp
          </a>
        </div>
      </div>
    </motion.article>
  );
}
