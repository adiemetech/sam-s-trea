import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from './ProductCard';
import maillots from '../data/maillots.json';
export default function ProductGrid({ onAddToCart }) {
  const [filterEquipe, setFilterEquipe] = useState('Tous');
  const [filterTaille, setFilterTaille] = useState('Toutes');
  const [filterPrix, setFilterPrix] = useState('Tous');
  const equipes = ['Tous', ...Array.from(new Set(maillots.map((m) => m.equipe)))];
  const tailles = ['Toutes', 'S', 'M', 'L', 'XL'];
  const tranchesPrix = [
    { label: 'Tous', min: 0, max: Infinity },
    { label: '-5 500 FCFA', min: 0, max: 5500 },
    { label: '+5 500 FCFA', min: 5500, max: Infinity },
  ];
  const filtered = useMemo(() => maillots.filter((m) => {
    if (filterEquipe !== 'Tous' && m.equipe !== filterEquipe) return false;
    if (filterTaille !== 'Toutes' && !m.tailles.includes(filterTaille)) return false;
    const p = tranchesPrix.find((t) => t.label === filterPrix);
    if (p && (m.prix < p.min || m.prix >= p.max)) return false;
    return true;
  }), [filterEquipe, filterTaille, filterPrix]);
  const FilterButton = ({ active, onClick, children }) => (
    <button onClick={onClick} className={elative px-4 py-2 rounded-full text-sm font-bold transition-all magnetic }>
      {active && (
        <motion.span layoutId="pill-active" className="absolute inset-0 rounded-full bg-gradient-to-r from-[#e63946] to-[#f1c40f] -z-0" transition={{ type: 'spring', stiffness: 300, damping: 30 }} />
      )}
      <span className="relative z-10">{children}</span>
    </button>
  );
  return (
    <section id="collection" className="py-28 px-6 bg-white dark:bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-[#e63946]/10 dark:bg-[#e63946]/20 text-[#e63946] font-bold tracking-widest text-xs uppercase mb-4">Collection 2026</span>
          <h2 className="text-5xl md:text-7xl font-black tracking-tight text-gray-900 dark:text-white">Nos <span className="bg-gradient-to-r from-[#e63946] to-[#f1c40f] bg-clip-text text-transparent">maillots</span></h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-xl mx-auto">Qualité premium, livraison rapide dans tout le Sénégal.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="mb-12 space-y-4">
          <div className="flex flex-wrap items-center gap-2"><span className="text-sm font-bold text-gray-500 dark:text-gray-400 mr-2 w-20">Équipe :</span><div className="flex flex-wrap gap-2 relative">{equipes.map((eq) => (<FilterButton key={eq} active={filterEquipe === eq} onClick={() => setFilterEquipe(eq)}>{eq}</FilterButton>))}</div></div>
          <div className="flex flex-wrap items-center gap-2"><span className="text-sm font-bold text-gray-500 dark:text-gray-400 mr-2 w-20">Taille :</span><div className="flex flex-wrap gap-2 relative">{tailles.map((t) => (<FilterButton key={t} active={filterTaille === t} onClick={() => setFilterTaille(t)}>{t}</FilterButton>))}</div></div>
          <div className="flex flex-wrap items-center gap-2"><span className="text-sm font-bold text-gray-500 dark:text-gray-400 mr-2 w-20">Prix :</span><div className="flex flex-wrap gap-2 relative">{tranchesPrix.map((t) => (<FilterButton key={t.label} active={filterPrix === t.label} onClick={() => setFilterPrix(t.label)}>{t.label}</FilterButton>))}</div></div>
          <p className="text-sm text-gray-500 dark:text-gray-400 pt-2">{filtered.length} maillot{filtered.length > 1 ? 's' : ''} trouvé{filtered.length > 1 ? 's' : ''}</p>
        </motion.div>
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
          <AnimatePresence mode="popLayout">
            {filtered.map((product, i) => (
              <motion.div key={product.id} layout initial={{ opacity: 0, scale: 0.8, y: 50 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.8, y: -30 }} transition={{ type: 'spring', stiffness: 300, damping: 25, delay: i * 0.08 }} className="w-full flex justify-center">
                <ProductCard product={product} onAddToCart={onAddToCart} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        <AnimatePresence>
          {filtered.length === 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="py-20 text-center">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-xl font-bold text-gray-600 dark:text-gray-300">Aucun maillot trouvé</p>
              <button onClick={() => { setFilterEquipe('Tous'); setFilterTaille('Toutes'); setFilterPrix('Tous'); }} className="mt-4 px-6 py-2 rounded-xl bg-[#e63946] text-white font-bold magnetic">Réinitialiser</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
