import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import useLenis from './hooks/useLenis';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import ProductGrid from './components/ProductGrid';
import HorizontalScroll from './components/HorizontalScroll';
import CartDrawer from './components/CartDrawer';
import CustomCursor from './components/CustomCursor';
import Footer from './components/Footer';
export default function App() {
  useLenis();
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === 'undefined') return true;
    const saved = localStorage.getItem('sams-darkmode');
    return saved !== null ? saved === 'true' : true;
  });
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) root.classList.add('dark'); else root.classList.remove('dark');
    localStorage.setItem('sams-darkmode', String(darkMode));
  }, [darkMode]);
  const [cart, setCart] = useState(() => {
    try { const saved = localStorage.getItem('sams-cart'); return saved ? JSON.parse(saved) : []; }
    catch { return []; }
  });
  const [cartOpen, setCartOpen] = useState(false);
  useEffect(() => { localStorage.setItem('sams-cart', JSON.stringify(cart)); }, [cart]);
  const addToCart = (product) => {
    setCart((prev) => {
      const found = prev.find((item) => item.product.id === product.id);
      if (found) return prev.map((item) => item.product.id === product.id ? { ...item, quantity: item.quantity+1 } : item);
      return [...prev, { product, quantity: 1 }];
    });
    setCartOpen(true);
  };
  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);
  return (
    <div id="accueil" className="relative min-h-screen bg-white dark:bg-[#050505] text-gray-900 dark:text-white overflow-x-hidden transition-colors duration-500">
      <div className="pointer-events-none fixed inset-0 z-[60] opacity-[0.05] mix-blend-overlay" style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.7 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")", backgroundRepeat: 'repeat' }} aria-hidden="true" />
      <CustomCursor />
      <AnimatePresence>
        {loading && (<Preloader key="preloader" onComplete={() => setLoading(false)} />)}
      </AnimatePresence>
      <AnimatePresence>
        {!loading && (
          <motion.div key="site-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, ease: 'easeOut' }}>
            <Navbar onCartOpen={() => setCartOpen(true)} cartCount={cartCount} darkMode={darkMode} setDarkMode={setDarkMode} />
            <Hero />
            <Marquee />
            <ProductGrid onAddToCart={addToCart} />
            <div id="vedettes"><HorizontalScroll /></div>
            <div className="py-6 bg-[#f1c40f] border-y-4 border-black overflow-hidden">
              <div className="animate-[marquee_25s_linear_infinite] flex w-max gap-12 whitespace-nowrap text-black font-black text-3xl md:text-5xl">
                {Array.from({ length: 2 }).flatMap((_, j) =>
                  ['⚽ MAILLOTS PREMIUM','🇸🇳 LIVRAISON DAKAR','💯 QUALITÉ PRO','📦 48H','💸 PAIEMENT À LA LIVRAISON','🔥 SAM\'S'].map((t, i) => (
                    <span key={j+'-'+i} className="flex items-center gap-12">{t}<span className="text-[#e63946]">✦</span></span>
                  ))
                )}
              </div>
            </div>
            <Footer />
            <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} cart={cart} setCart={setCart} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
