import { motion } from 'framer-motion';
export default function Footer() {
  const WA = '221000000000';
  const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
  const itemVariants = { hidden: { opacity:0, y:30 }, visible: { opacity:1, y:0, transition: { duration: 0.6, ease: [0.22,1,0.36,1] } } };
  const cols = [
    { title: 'Navigation', links: [{ label:'Accueil', href:'#accueil' },{ label:'Collection', href:'#collection' },{ label:'Vedettes', href:'#vedettes' }] },
    { title: 'Aide', links: [{ label:'Livraison', href:'#' },{ label:'Retours', href:'#' },{ label:'FAQ', href:'#' }] },
    { title: 'Contact', links: [{ label:'WhatsApp: +221 00 000 00 00', href:'https://wa.me/'+WA },{ label:'Instagram: @sams_maillots', href:'#' },{ label:'Dakar, Sénégal 🇸🇳', href:'#' }] },
  ];
  return (
    <footer id="contact" className="relative pt-20 pb-8 overflow-hidden bg-[#0a0a0a] text-white border-t border-white/10">
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-[#e63946]/20 blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-[#f1c40f]/15 blur-[120px]" />
      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <h2 className="text-5xl font-black tracking-tight mb-4"><span className="text-[#e63946]">Sam</span><span className="text-[#f1c40f]">'s</span></h2>
            <p className="text-gray-400 max-w-sm mb-6 leading-relaxed">Maillots premium livrés partout au Sénégal. Qualité, style et passion ⚽.</p>
            <a href={'https://wa.me/'+WA} target="_blank" rel="noopener noreferrer" className="magnetic inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-white font-black hover:brightness-110 transition shadow-lg">💬 Parler sur WhatsApp</a>
          </motion.div>
          {cols.map((col) => (
            <motion.div key={col.title} variants={itemVariants}>
              <h3 className="text-sm font-black tracking-widest uppercase mb-5 text-[#f1c40f]">{col.title}</h3>
              <ul className="space-y-3">{col.links.map((l) => (<li key={l.label}><a href={l.href} className="text-gray-400 hover:text-white transition-colors text-sm">{l.label}</a></li>))}</ul>
            </motion.div>
          ))}
        </motion.div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">© {new Date().getFullYear()} Sam's Maillots. Tous droits réservés.</p>
          <p className="text-xs text-gray-500 flex items-center gap-2">Fait avec <span className="text-[#e63946] animate-pulse">❤️</span> au <span className="font-bold text-white">Sénégal 🇸🇳</span></p>
        </motion.div>
      </div>
    </footer>
  );
}
