import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
export default function CartDrawer({ isOpen, onClose, cart = [], setCart }) {
  const firstFocusRef = useRef(null);
  const WA = '221000000000';
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    firstFocusRef.current?.focus();
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);
  const formatPrix = (p) => new Intl.NumberFormat('fr-FR').format(p) + ' FCFA';
  const updateQty = (id, delta) => setCart((prev) => prev.map((item) => item.product.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item));
  const removeItem = (id) => setCart((prev) => prev.filter((item) => item.product.id !== id));
  const total = cart.reduce((sum, item) => sum + item.product.prix * item.quantity, 0);
  const buildWhatsAppText = () => {
    const lines = cart.map((item, i) => ${i+1}.  — Qté:  — );
    return encodeURIComponent('Bonjour Sam\'s, je voudrais commander :\n\n'+lines.join('\n')+'\n\nTOTAL : '+formatPrix(total)+'\nMerci !');
  };
  const whatsappLink = 'https://wa.me/'+WA+'?text='+buildWhatsAppText();
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div key="overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} onClick={onClose} className="fixed inset-0 z-[80] bg-black/50 backdrop-blur-sm" />
          <motion.aside key="drawer" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 220 }} className="fixed top-0 right-0 z-[90] h-full w-full sm:w-[420px] bg-white dark:bg-[#0f0f0f] shadow-2xl flex flex-col" role="dialog" aria-modal="true">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 dark:border-gray-800">
              <h2 className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-2">🛒 Ton panier <span className="text-[#e63946]">Sam's</span></h2>
              <button ref={firstFocusRef} onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 dark:bg-[#1a1a1a] text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-[#252525] transition" aria-label="Fermer">✕</button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center gap-4 text-gray-500 dark:text-gray-400">
                  <div className="text-6xl">🧺</div>
                  <p className="text-lg font-semibold">Ton panier est vide</p>
                  <button onClick={onClose} className="mt-2 px-5 py-2 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold hover:opacity-90 transition">Voir les maillots</button>
                </div>
              ) : (
                cart.map(({ product, quantity }) => (
                  <motion.div key={product.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex gap-4 p-3 rounded-xl bg-gray-50 dark:bg-[#161616]">
                    <div className="w-20 h-24 rounded-lg flex items-center justify-center text-3xl flex-shrink-0" style={{
                      background: product.image === 'senegal.jpg' ? 'linear-gradient(135deg,#065a4c,#033f35)' :
                        product.image === 'liverpool.jpg' ? 'linear-gradient(135deg,#c8102e,#8a0a20)' :
                        'linear-gradient(135deg,#004d98,#a50044)',
                    }}>
                      {product.image === 'senegal.jpg' && '🇸🇳'}
                      {product.image === 'liverpool.jpg' && <span className="font-black text-white text-sm">LFC</span>}
                      {product.image === 'barca.jpg' && <span className="font-black text-white text-xs">BARÇA</span>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-bold text-gray-900 dark:text-white truncate">{product.equipe}</h3>
                        <button onClick={() => removeItem(product.id)} className="text-gray-400 hover:text-[#e63946] transition text-sm" aria-label="Retirer">🗑️</button>
                      </div>
                      <p className="text-sm font-semibold text-[#e63946] dark:text-[#f1c40f]">{formatPrix(product.prix)}</p>
                      <div className="mt-2 inline-flex items-center gap-2 px-2 py-1 rounded-lg bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-gray-700">
                        <button onClick={() => updateQty(product.id, -1)} className="w-7 h-7 rounded-md hover:bg-gray-100 dark:hover:bg-[#2a2a2a] font-bold text-gray-700 dark:text-gray-200">−</button>
                        <span className="w-6 text-center font-bold text-gray-900 dark:text-white text-sm">{quantity}</span>
                        <button onClick={() => updateQty(product.id, +1)} className="w-7 h-7 rounded-md hover:bg-gray-100 dark:hover:bg-[#2a2a2a] font-bold text-gray-700 dark:text-gray-200">+</button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
            {cart.length > 0 && (
              <div className="p-6 border-t border-gray-200 dark:border-gray-800 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400 font-medium">Total</span>
                  <span className="text-2xl font-black text-gray-900 dark:text-white">{formatPrix(total)}</span>
                </div>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-[#25D366] text-white font-black text-base shadow-lg hover:brightness-110 transition">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Commander sur WhatsApp
                </a>
                <p className="text-center text-xs text-gray-400 dark:text-gray-500">Livraison rapide dans tout le Sénégal 🇸🇳</p>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
