import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- DATA ---
const scripts = [
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none"><rect x="2" y="6" width="20" height="12" rx="4" fill="#8b00d2" fillOpacity="0.12"/><path d="M6 12h12" stroke="#8b00d2" strokeWidth="2" strokeLinecap="round"/></svg>
    ),
    title: "Voitures custom",
    desc: "Des véhicules uniques, importés et modélisés pour l'immersion."
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#8b00d2" fillOpacity="0.12"/><path d="M8 12l2 2 4-4" stroke="#8b00d2" strokeWidth="2" strokeLinecap="round"/></svg>
    ),
    title: "Système légal/illégal",
    desc: "Braquages, jobs, justice, tout est possible."
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none"><rect x="4" y="4" width="16" height="16" rx="4" fill="#8b00d2" fillOpacity="0.12"/><path d="M12 8v4l3 3" stroke="#8b00d2" strokeWidth="2" strokeLinecap="round"/></svg>
    ),
    title: "Événements RP",
    desc: "Courses, soirées, scénarios inédits chaque semaine."
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none"><ellipse cx="12" cy="12" rx="10" ry="6" fill="#8b00d2" fillOpacity="0.12"/><path d="M6 12c0-3.31 2.69-6 6-6s6 2.69 6 6" stroke="#8b00d2" strokeWidth="2"/></svg>
    ),
    title: "Map exclusive",
    desc: "Une map retravaillée, quartiers inédits, lieux secrets."
  }
];

const events = [
  { date: "Samedi 21h", title: "Course illégale", desc: "Affronte les meilleurs pilotes de la ville !" },
  { date: "Dimanche 18h", title: "Event Police vs Gangs", desc: "Un affrontement épique RP, qui gagnera ?" },
  { date: "Vendredi 20h", title: "Soirée RP libre", desc: "Laissez libre cours à votre imagination !" },
];

const staffFonda = [
  { name: "Freziks", role: "Fondateur", avatar: "/staff-freziks.png" },
  { name: "OBZ", role: "Fondateur", avatar: "/staff-obz.png" },
];
const staffDevs = [
  { name: "BLK", role: "Développeur", avatar: "/staff-blk.png" },
  { name: "ZUUX", role: "Développeur", avatar: "/staff-zuux.png" },
  { name: "Kipstz", role: "Développeur", avatar: "/staff-kipstz.png" },
];

const avis = [
  { name: "Lucas", avatar: "/avatar1.png", stars: 5, text: "Le meilleur serveur RP, staff à l'écoute et ambiance incroyable !" },
  { name: "Sarah", avatar: "/avatar2.png", stars: 5, text: "Des scripts uniques, une map magnifique, je recommande à 100%." },
  { name: "Mehdi", avatar: "/avatar3.png", stars: 4, text: "Communauté active, events réguliers, top !" },
];

const gallery = [
  "/galerie1.jpg",
  "/galerie2.jpg",
  "/galerie3.jpg",
  "/galerie4.jpg",
];

// --- COMPONENTS ---
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = () => {
    setOpen(false);
  };

  const navItems = [
    { name: 'Accueil', href: '#hero' },
    { name: 'Scripts', href: '#scripts' },
    { name: 'Présentation', href: '#presentation' },
    { name: 'Événements', href: '#events' },
    { name: 'Règles', href: '#rules' },
    { name: 'Staff', href: '#staff' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 px-6 py-3 backdrop-blur-xl ${
      isScrolled ? 'bg-white/80' : 'bg-white/60'
    } border-b border-[#8b00d2]/10 shadow-md transition-all duration-300`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.img 
            src="/alkia-logo.png" 
            alt="Alkia RP" 
            className="w-9 h-9 rounded-lg" 
            initial={{ rotate: -10 }} 
            animate={{ rotate: 0 }} 
            transition={{ duration: 0.7, type: 'spring' }} 
          />
          <span className="text-lg font-bold text-[#8b00d2] tracking-widest" style={{fontFamily:'Sora,Inter,sans-serif'}}>
            ALKIA RP
          </span>
          <span className="ml-3 px-3 py-1 rounded-full bg-gradient-to-r from-[#8b00d2] to-[#b47aff] text-white text-xs font-bold shadow-lg animate-pulse">
            Serveur FiveM Premium
          </span>
        </div>
        <div className="hidden md:flex items-center gap-7">
          {navItems.map((item) => (
            <motion.a
              key={item.name}
              href={item.href}
              className="text-[#181828] hover:text-[#8b00d2] transition"
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              {item.name}
            </motion.a>
          ))}
        </div>
        <button 
          className="md:hidden flex flex-col gap-1" 
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <span className={`block w-7 h-1 rounded bg-[#8b00d2] transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-7 h-1 rounded bg-[#8b00d2] transition-all duration-300 ${open ? 'opacity-0' : ''}`}></span>
          <span className={`block w-7 h-1 rounded bg-[#8b00d2] transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/95 rounded-xl mt-3 p-4 flex flex-col gap-4 shadow-xl"
          >
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="text-[#181828] hover:text-[#8b00d2] transition"
                whileHover={{ x: 5 }}
                onClick={handleLinkClick}
              >
                {item.name}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const title = "Alkia RP : L'expérience FiveM ultime";
  return (
    <section id="hero" className="relative min-h-[80vh] flex flex-col items-center justify-center pt-40 pb-16 bg-[#ededed] overflow-hidden">
      {/* Fond animé SVG */}
      <svg className="absolute left-0 top-0 w-full h-full -z-10" width="100%" height="100%">
        <circle cx="20%" cy="30%" r="80" fill="#8b00d2" fillOpacity="0.08">
          <animate attributeName="cy" values="30%;40%;30%" dur="6s" repeatCount="indefinite" />
        </circle>
        <circle cx="80%" cy="70%" r="60" fill="#8b00d2" fillOpacity="0.06">
          <animate attributeName="cy" values="70%;60%;70%" dur="7s" repeatCount="indefinite" />
        </circle>
      </svg>
      <motion.h1 initial="hidden" animate="visible" variants={{hidden:{},visible:{transition:{staggerChildren:0.04}}}} className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-[#8b00d2] via-[#b47aff] to-[#8b00d2] bg-clip-text text-transparent drop-shadow-xl text-center select-none" style={{fontFamily:'Sora,Inter,sans-serif'}}>
        {title.split("").map((l,i)=>(
          <motion.span key={i} initial={{opacity:0, y:40}} animate={{opacity:1, y:0}} transition={{delay:i*0.04, duration:0.5}}>{l===" "?"\u00A0":l}</motion.span>
        ))}
                  </motion.h1>
      <motion.p initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.7, duration:1}} className="text-xl md:text-2xl text-[#181828] mb-10 max-w-2xl mx-auto text-center">
        Scripts exclusifs, staff passionné, communauté soudée. Rejoins Alkia RP et écris ta propre histoire !
                  </motion.p>
      <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:1, duration:1}} className="flex flex-col md:flex-row gap-4 justify-center">
        <a href="fivem://connect/game-02.epycore.fr:30174" className="px-8 py-4 rounded-full bg-white/80 border border-[#8b00d2]/30 text-[#8b00d2] font-semibold shadow-xl hover:scale-105 hover:bg-[#8b00d2]/10 transition-all duration-200 backdrop-blur-xl">
          Commencer l'aventure
        </a>
        <a href="https://discord.gg/EacTmrsb" target="_blank" className="px-8 py-4 rounded-full bg-[#8b00d2] text-white font-semibold shadow-xl hover:scale-105 hover:bg-[#7a00b8] transition-all duration-200">
          Rejoindre le Discord
        </a>
                    </motion.div>
    </section>
  );
};

const Presentation = () => (
  <section id="presentation" className="relative py-32 bg-[#f7f3fa] flex flex-col items-center">
    <motion.h2 initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} className="text-4xl md:text-5xl font-bold mb-10 text-[#8b00d2] text-center" style={{fontFamily:'Sora,Inter,sans-serif'}}>Présentation vidéo</motion.h2>
    <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-[#8b00d2]/10 max-w-2xl w-full aspect-video bg-white/80 backdrop-blur-xl flex items-center justify-center">
      <motion.div initial={{scale:0.8, opacity:0}} whileInView={{scale:1, opacity:1}} viewport={{once:true}} transition={{duration:0.7}} className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <div className="w-20 h-20 bg-[#8b00d2]/80 rounded-full flex items-center justify-center shadow-lg animate-pulse">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="12" fill="#fff" fillOpacity="0.2"/><polygon points="10,8 16,12 10,16" fill="#fff"/></svg>
              </div>
            </motion.div>
      <iframe width="100%" height="100%" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="Présentation Alkia" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full h-full relative z-0"></iframe>
    </div>
  </section>
);

const Scripts = () => {
  const [current, setCurrent] = useState(0);
  return (
    <section id="scripts" className="relative py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2 initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} className="text-4xl md:text-5xl font-bold mb-12 text-[#8b00d2] text-center" style={{fontFamily:'Sora,Inter,sans-serif'}}>Scripts exclusifs</motion.h2>
        <div className="flex gap-8 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-[#8b00d2]/30 scrollbar-track-transparent">
          {scripts.map((script, i) => (
            <motion.div 
              key={i}
              initial={{opacity:0, y:30}}
              whileInView={{opacity:1, y:0}}
              viewport={{once:true}}
              transition={{delay:i*0.1}}
              className={`min-w-[320px] max-w-xs p-8 rounded-3xl bg-white/80 border-2 border-transparent hover:border-[#8b00d2] shadow-xl flex flex-col items-start cursor-pointer relative overflow-hidden group hover:scale-105 transition-all duration-200 ${current===i?'ring-4 ring-[#8b00d2]/30':''}`}
              onMouseEnter={()=>setCurrent(i)}
                >
              <div className="absolute right-4 top-4 opacity-20 scale-150 pointer-events-none group-hover:opacity-30 transition-all duration-200">{script.icon}</div>
              <div className="text-3xl mb-4 z-10 group-hover:scale-110 transition-transform drop-shadow-lg">{script.icon}</div>
              <h3 className="text-lg font-bold mb-2 bg-gradient-to-r from-[#8b00d2] to-[#b47aff] bg-clip-text text-transparent z-10" style={{fontFamily:'Sora,Inter,sans-serif'}}>{script.title}</h3>
              <p className="text-[#181828] z-10">{script.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Events = () => (
  <section id="events" className="relative py-32 bg-[#f7f3fa]">
    <div className="max-w-5xl mx-auto px-6">
      <motion.h2 initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} className="text-4xl md:text-5xl font-bold mb-12 text-[#8b00d2] text-center" style={{fontFamily:'Sora,Inter,sans-serif'}}>Événements à venir</motion.h2>
      <div className="relative border-l-4 border-[#8b00d2]/20 pl-8 flex flex-col gap-12">
        {events.map((event, i) => (
          <motion.div key={i} initial={{opacity:0, x:-40}} whileInView={{opacity:1, x:0}} viewport={{once:true}} transition={{delay:i*0.1}} className="bg-white rounded-2xl shadow-lg p-8 border border-[#8b00d2]/10 hover:scale-[1.02] transition-transform flex flex-col md:flex-row items-center gap-6 relative group">
            <span className="absolute -left-12 top-1/2 -translate-y-1/2 bg-[#8b00d2] text-white text-xs px-4 py-1 rounded-full shadow font-bold group-hover:scale-110 transition-transform">{event.date}</span>
            <div>
              <h3 className="text-xl font-bold mb-2 text-[#181828] text-center md:text-left">{event.title}</h3>
              <p className="text-[#181828] text-center md:text-left">{event.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
  </section>
);

const Rules = () => (
  <section id="rules" className="relative py-32">
    <div className="max-w-4xl mx-auto px-6 text-center">
      <motion.h2 initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} className="text-4xl md:text-5xl font-bold mb-12 text-[#8b00d2]" style={{fontFamily:'Sora,Inter,sans-serif'}}>Règles du serveur</motion.h2>
      <p className="text-lg text-[#181828] mb-10">
        Alkia RP est un serveur de roleplay où les joueurs peuvent vivre des expériences uniques et immersives. Voici quelques règles importantes à respecter pour une expérience positive pour tous :
      </p>
      <ul className="text-left">
        <li>Respectez les autres joueurs et le staff.</li>
        <li>Évitez toutes les formes de harcèlement ou de discrimination.</li>
        <li>Respectez les règles de la communauté et les lois en vigueur.</li>
        <li>Évitez les abus de pouvoir et les comportements inappropriés.</li>
        <li>Ne partagez aucune information personnelle ou sensible.</li>
      </ul>
    </div>
  </section>
);

const Staff = () => (
  <section id="staff" className="relative py-32">
    <div className="max-w-5xl mx-auto px-6">
      <motion.h2 initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} className="text-4xl md:text-5xl font-bold mb-12 text-[#8b00d2] text-center" style={{fontFamily:'Sora,Inter,sans-serif'}}>L'équipe Alkia</motion.h2>
      <div className="flex flex-wrap justify-center gap-10 mb-12">
        {staffFonda.map((m,i)=>(
          <motion.div key={i} initial={{opacity:0, y:30}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{delay:i*0.1}} className="flex flex-col items-center bg-white rounded-3xl shadow-2xl p-10 border-2 border-[#8b00d2]/40 hover:scale-105 transition-transform relative">
            <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#8b00d2] to-[#b47aff] text-white text-xs px-4 py-1 rounded-full shadow font-bold animate-pulse">Fondateur</span>
            <img src={m.avatar} alt={m.name} className="w-24 h-24 rounded-full mb-4 border-4 border-[#8b00d2]/40 shadow-lg" />
            <div className="text-2xl font-bold text-[#8b00d2]" style={{fontFamily:'Sora,Inter,sans-serif'}}>{m.name}</div>
            <div className="text-[#181828] text-base">{m.role}</div>
          </motion.div>
        ))}
                </div>
      <div className="flex flex-wrap justify-center gap-8">
        {staffDevs.map((m,i)=>(
          <motion.div key={i} initial={{opacity:0, y:30}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{delay:i*0.1}} className="flex flex-col items-center bg-white rounded-2xl shadow-lg p-7 border border-[#8b00d2]/20 hover:scale-105 transition-transform relative">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#ededed] text-[#8b00d2] text-xs px-3 py-0.5 rounded-full border border-[#8b00d2]/30 font-bold">Développeur</span>
            <img src={m.avatar} alt={m.name} className="w-16 h-16 rounded-full mb-3 border-2 border-[#8b00d2]/20 shadow" />
            <div className="text-lg font-bold text-[#8b00d2]" style={{fontFamily:'Sora,Inter,sans-serif'}}>{m.name}</div>
            <div className="text-[#181828] text-sm">{m.role}</div>
              </motion.div>
            ))}
          </div>
        </div>
  </section>
);

const Footer = () => (
  <footer className="relative py-16 border-t border-[#8b00d2]/20 bg-gradient-to-r from-[#ededed] via-[#f7f3fa] to-[#ededed]">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-4 gap-8">
        <div>
          <img src="/alkia-logo.png" alt="Alkia RP" className="w-12 h-12 rounded-lg mb-4" />
          <p className="text-[#181828]">
            Le serveur FiveM où l'immersion, l'action et la communauté sont au cœur de l'expérience.
          </p>
            </div>
        <div>
          <h3 className="font-bold mb-4 text-[#8b00d2]">Navigation</h3>
          <ul className="space-y-2">
            <li><a href="#hero" className="text-[#181828] hover:text-[#8b00d2] transition">Accueil</a></li>
            <li><a href="#presentation" className="text-[#181828] hover:text-[#8b00d2] transition">Présentation</a></li>
            <li><a href="#scripts" className="text-[#181828] hover:text-[#8b00d2] transition">Scripts</a></li>
            <li><a href="#events" className="text-[#181828] hover:text-[#8b00d2] transition">Événements</a></li>
            <li><a href="#staff" className="text-[#181828] hover:text-[#8b00d2] transition">Staff</a></li>
            <li><a href="#rules" className="text-[#181828] hover:text-[#8b00d2] transition">Règles</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-4 text-[#8b00d2]">Réseaux</h3>
          <ul className="space-y-2">
            <li><a href="https://discord.gg/EacTmrsb" target="_blank" className="text-[#181828] hover:text-[#8b00d2] transition">Discord</a></li>
            <li><a href="#" className="text-[#181828] hover:text-[#8b00d2] transition">YouTube</a></li>
            <li><a href="#" className="text-[#181828] hover:text-[#8b00d2] transition">TikTok</a></li>
          </ul>
              </div>
        <div>
          <h3 className="font-bold mb-4 text-[#8b00d2]">Légal</h3>
          <ul className="space-y-2">
            <li><a href="/terms" className="text-[#181828] hover:text-[#8b00d2] transition">CGU</a></li>
            <li><a href="/privacy" className="text-[#181828] hover:text-[#8b00d2] transition">Confidentialité</a></li>
          </ul>
            </div>
          </div>
      <div className="mt-16 pt-8 border-t border-[#8b00d2]/20 text-center text-[#181828]/50 flex flex-col md:flex-row items-center justify-between gap-4">
        <span>© 2024 Alkia Roleplay. Tous droits réservés.</span>
        <div className="flex gap-4 justify-center">
          <a href="https://discord.gg/EacTmrsb" target="_blank" className="hover:text-[#8b00d2] transition"><svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M17.472 4.382A16.888 16.888 0 0012.06 3.5c-.041 0-.082 0-.123.002a16.888 16.888 0 00-5.412.88A2.13 2.13 0 004 6.24v12.02a2.13 2.13 0 001.525 2.06c2.2.7 4.4 1.05 6.535 1.05 2.135 0 4.335-.35 6.535-1.05A2.13 2.13 0 0020 18.26V6.24a2.13 2.13 0 00-1.525-1.858zm-7.43 10.13c-.789 0-1.438-.72-1.438-1.6 0-.88.64-1.6 1.438-1.6.8 0 1.44.72 1.44 1.6 0 .88-.65 1.6-1.44 1.6zm4.916 0c-.789 0-1.438-.72-1.438-1.6 0-.88.64-1.6 1.438-1.6.8 0 1.44.72 1.44 1.6 0 .88-.65 1.6-1.44 1.6z" fill="#8b00d2"/></svg></a>
          <a href="#" className="hover:text-[#8b00d2] transition"><svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0022.4.36a9.09 9.09 0 01-2.88 1.1A4.52 4.52 0 0016.11 0c-2.5 0-4.52 2.01-4.52 4.5 0 .35.04.7.11 1.03C7.69 5.4 4.07 3.7 1.64 1.15c-.38.65-.6 1.4-.6 2.2 0 1.52.78 2.86 2.01 3.65A4.48 4.48 0 01.96 6v.06c0 2.13 1.52 3.91 3.56 4.31-.37.1-.76.16-1.16.16-.28 0-.55-.03-.81-.08.55 1.7 2.16 2.94 4.07 2.97A9.05 9.05 0 010 21.54a12.8 12.8 0 006.95 2.03c8.34 0 12.9-6.91 12.9-12.9 0-.2 0-.39-.01-.58A9.22 9.22 0 0023 3z" fill="#8b00d2"/></svg></a>
          <a href="#" className="hover:text-[#8b00d2] transition"><svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M12 2.04c-5.5 0-9.96 4.46-9.96 9.96 0 4.41 3.6 8.07 8.19 8.93.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.54-1.37-1.32-1.74-1.32-1.74-1.08-.74.08-.73.08-.73 1.2.08 1.83 1.23 1.83 1.23 1.06 1.82 2.78 1.3 3.46.99.11-.77.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.97 0-1.32.47-2.39 1.24-3.23-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 013.01-.4c1.02.01 2.05.14 3.01.4 2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.91 1.24 3.23 0 4.64-2.8 5.67-5.47 5.97.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.82.58C20.36 20.07 24 16.41 24 12c0-5.5-4.46-9.96-9.96-9.96z" fill="#8b00d2"/></svg></a>
        </div>
      </div>
    </div>
  </footer>
);

// --- MAIN APP ---
const App = () => {
  return (
    <div className="relative min-h-screen bg-[#ededed] text-[#181828] overflow-x-hidden" style={{fontFamily:'Inter, Sora, sans-serif'}}>
      <Navbar />
      <Hero />
      <Scripts />
      <Presentation />
      <Events />
      <Rules />
      <Staff />
      <Footer />
    </div>
  );
};

export default App; 