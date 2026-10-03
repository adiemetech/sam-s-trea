import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
export default function Navbar({ onCartOpen, cartCount, darkMode, setDarkMode }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const WA = '221000000000';
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const navLinks = [
    { label: 'Accueil', href: '#accueil' },
    { label: 'Collection', href: '#collection' },
    { label: 'Vedettes', href: '#vedettes' },
    { label: 'Contact', href: '#contact' },
  ];
  return (
    <>
      <motion.header initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }} className={ixed top-0 left-0 right-0 z-50 transition-all duration-500 }>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#accueil" className="flex items-center gap-2 magnetic"><span className={	ext-3xl font-black tracking-tight transition-colors }><span className="text-[#e63946]">Sam</span><span className="text-[#f1c40f]">'s</span></span></a>
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className={elative text-sm font-bold tracking-wide uppercase transition-colors magnetic }>{link.label}</a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button onClick={() => setDarkMode(!darkMode)} aria-label="Mode sombre" className="magnetic w-11 h-11 flex items-center justify-center rounded-full transition-colors" style={{ backgroundColor: scrolled ? (darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)') : 'rgba(255,255,255,0.12)', color: scrolled ? (darkMode ? '#fff' : '#111') : '#fff' }}>
              <AnimatePresence mode="wait">
                {darkMode ? (
                  <motion.span key="sun" initial={{ rotate:-90, opacity:0, scale:0.5 }} animate={{ rotate:0, opacity:1, scale:1 }} exit={{ rotate:90, opacity:0, scale:0.5 }} transition={{ duration: 0.3 }} className="text-lg">☀️</motion.span>
                ) : (
                  <motion.span key="moon" initial={{ rotate:90, opacity:0, scale:0.5 }} animate={{ rotate:0, opacity:1, scale:1 }} exit={{ rotate:-90, opacity:0, scale:0.5 }} transition={{ duration: 0.3 }} className="text-lg">🌙</motion.span>
                )}
              </AnimatePresence>
            </button>
            <button onClick={onCartOpen} aria-label="Panier" className="magnetic relative w-11 h-11 flex items-center justify-center rounded-full transition-colors" style={{ backgroundColor: scrolled ? (darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)') : 'rgba(255,255,255,0.12)', color: scrolled ? (darkMode ? '#fff' : '#111') : '#fff' }}>
              🛒
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span key="badge" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ type: 'spring', stiffness: 400, damping: 20 }} className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1.5 flex items-center justify-center rounded-full bg-[#e63946] text-white text-[10px] font-black shadow-lg">{cartCount}</motion.span>
                )}
              </AnimatePresence>
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden magnetic w-11 h-11 flex flex-col items-center justify-center gap-1.5 rounded-full" style={{ backgroundColor: scrolled ? (darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)') : 'rgba(255,255,255,0.12)' }} aria-label="Menu">
              <motion.span animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 6 : 0 }} className={w-5 h-0.5  block} />
              <motion.span animate={{ opacity: mobileOpen ? 0 : 1 }} className={w-5 h-0.5  block} />
              <motion.span animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -6 : 0 }} className={w-5 h-0.5  block} />
            </button>
          </div>
        </div>
      </motion.header>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div key="mobile-menu" initial={{ clipPath: 'circle(0% at calc(100% - 2.5rem) 2.5rem)' }} animate={{ clipPath: 'circle(150% at calc(100% - 2.5rem) 2.5rem)' }} exit={{ clipPath: 'circle(0% at calc(100% - 2.5rem) 2.5rem)' }} transition={{ duration: 0.5, ease: [0.77, 0, 0.175, 1] }} className="fixed inset-0 z-40 bg-[#0a0a0a] md:hidden flex flex-col items-center justify-center gap-10">
            {navLinks.map((link, i) => (
              <motion.a key={link.href} initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ delay: 0.15 + i*0.08 }} href={link.href} onClick={() => setMobileOpen(false)} className="text-4xl font-black text-white tracking-tight">{link.label}</motion.a>
            ))}
            <motion.a initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} href={'https://wa.me/'+WA} target="_blank" rel="noopener noreferrer" className="mt-6 px-8 py-4 rounded-full bg-[#25D366] text-white font-black">WhatsApp →</motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
