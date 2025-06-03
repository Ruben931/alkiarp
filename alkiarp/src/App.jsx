import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { FaDiscord, FaInstagram, FaTiktok, FaPlay, FaArrowRight, FaRocket, FaStar, FaGamepad, FaFire } from 'react-icons/fa';
import { MdMenu, MdClose, MdLightMode, MdDarkMode, MdLocationCity, MdElectricBolt } from 'react-icons/md';
import { HiOutlineCode, HiSparkles, HiLightningBolt, HiChip, HiBeaker } from 'react-icons/hi';
import { TbCalendarEvent, TbRocket, TbPolygon, TbAtom } from 'react-icons/tb';
import { BiSupport, BiWorld, BiNetworkChart } from 'react-icons/bi';
import { RiVipCrownFill, RiSpaceShipLine, RiSettings3Fill } from 'react-icons/ri';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState(0);
  const [activeWikiTab, setActiveWikiTab] = useState('general'); // Nouvel état pour les onglets wiki
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isScrolled, setIsScrolled] = useState(false);
  
  // États pour les données en temps réel
  const [discordMembers, setDiscordMembers] = useState(61587); // Valeur par défaut
  const [fivemPlayers, setFivemPlayers] = useState(1544); // Valeur par défaut
  const [isOnline, setIsOnline] = useState(true);
  
  const { scrollY } = useScroll();
  const containerRef = useRef(null);

  // Configuration des APIs
  const DISCORD_SERVER_ID = "revrp"; // Remplace par ton ID serveur Discord
  const FIVEM_SERVER_IP = "play.rev-rp.fr"; // Remplace par l'IP de ton serveur FiveM
  const FIVEM_SERVER_PORT = "30120"; // Port par défaut FiveM

  // Fonction pour récupérer les membres Discord
  const fetchDiscordMembers = async () => {
    try {
      // Option 1: Via Discord Widget API (public)
      const response = await fetch(`https://discord.com/api/guilds/${DISCORD_SERVER_ID}/widget.json`);
      if (response.ok) {   
        const data = await response.json();
        setDiscordMembers(data.presence_count || discordMembers);
      }
    } catch (error) {
      console.log('Erreur Discord API:', error);
      // Garde la valeur par défaut en cas d'erreur
    }
  };

  // Fonction pour récupérer les joueurs FiveM
  const fetchFiveMPlayers = async () => {
    try {
      // API FiveM pour récupérer les infos serveur
      const response = await fetch(`https://servers-frontend.fivem.net/api/servers/single/${FIVEM_SERVER_IP}:${FIVEM_SERVER_PORT}`);
      if (response.ok) {
        const data = await response.json();
        const currentPlayers = data.Data?.clients || 0;
        const maxPlayers = data.Data?.sv_maxclients || 64;
        
        setFivemPlayers(currentPlayers);
        setIsOnline(currentPlayers > 0); // Serveur online si joueurs connectés
      }
    } catch (error) {
      console.log('Erreur FiveM API:', error);
      // Alternative: API directe serveur
      try {
        const directResponse = await fetch(`http://${FIVEM_SERVER_IP}:${FIVEM_SERVER_PORT}/players.json`);
        if (directResponse.ok) {
          const players = await directResponse.json();
          setFivemPlayers(players.length);
          setIsOnline(true);
        }
      } catch (directError) {
        console.log('Erreur API directe:', directError);
        setIsOnline(false);
      }
    }
  };

  // Fonction pour récupérer toutes les données
  const fetchRealTimeData = async () => {
    await Promise.all([
      fetchDiscordMembers(),
      fetchFiveMPlayers()
    ]);
  };

  // Références pour les sections
  const sectionRefs = {
    accueil: useRef(null),
    presentation: useRef(null),
    events: useRef(null),
    regles: useRef(null),
    staff: useRef(null)
  };

  // Fonction de connexion FiveM
  const connectToFiveM = () => {
    const fiveMUrl = "fivem://connect/game-02.epycore.fr:30174";
    window.location.href = fiveMUrl;
  };

  // Parallax values
  const y1 = useTransform(scrollY, [0, 300], [0, 100]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);
  const rotate = useTransform(scrollY, [0, 300], [0, 360]);

  // Navigation smooth scroll
  const scrollToSection = (sectionName) => {
    const element = sectionRefs[sectionName]?.current;
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Fonction pour rendre le contenu wiki dynamique
  const renderWikiContent = () => {
    switch(activeWikiTab) {
      case 'general':
        return (
          <div className="space-y-8">
            {/* Section Sanctions */}
            <div>
              <h2 className={`text-2xl font-black mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`} id="sanctions">
                SANCTIONS
              </h2>
              
              <div className={`p-6 bg-red-500/10 border border-red-500/30 rounded-xl mb-4 ${isDarkMode ? 'text-red-300' : 'text-red-600'}`}>
                <p className="italic mb-4">
                  Tout manquement au règlement (ci-dessous) ou illégal entraînera des sanctions pouvant être :
                </p>
                
                <ul className="space-y-2">
                  <li>- Avertissement oral</li>
                  <li>- Avertissement via le menu staff</li>
                  <li>- Jail</li>
                  <li>- Wipe</li>
                  <li>- Ban</li>
                  <li>- Kick</li>
                </ul>
                
                <p className="italic mt-4 text-sm">
                  Le choix de la sanction étant à la discrétion et l'appréciation du staff en fonction d'un barème préétabli par les gérants Staffs.
                </p>
                
                <div className="mt-4 p-3 bg-red-600/20 border border-red-600/50 rounded-lg">
                  <p className="font-bold text-red-200">
                    AltF4 LSPD = 4 jours de ban + 500 minutes de jail + Suppressions des armes.
                  </p>
                </div>
              </div>
            </div>

            {/* Section Règles Générales */}
            <div>
              <h2 className={`text-2xl font-black mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`} id="regles-generales">
                RÈGLES GÉNÉRALES
              </h2>
              
              <div className={`prose max-w-none ${isDarkMode ? 'text-white/80' : 'text-black/80'}`}>
                <p className="mb-4">
                  Le règlement permet de situer certaines actions non autorisées ou autorisées avec certaines conditions. 
                  Ce n'est pas parce que certains points ne sont pas abordés que vous ne pouvez pas être sujet à une sanction 
                  si une action manque de FairPlay ou n'est pas RolePlay.
                </p>
                
                <div className={`p-6 bg-red-500/10 border border-red-500/30 rounded-xl mb-6 ${isDarkMode ? 'text-red-300' : 'text-red-600'}`}>
                  <h4 className="font-bold mb-3">Règles basiques :</h4>
                  <p className="mb-3">
                    Toute diffamation sur un membre de la communauté est strictement interdite, la toxicité n'amène rien 
                    de bon sur un serveur RP et tout acte dans ce genre rentre en conflit avec les règles de vie d'une 
                    communauté et peut être considéré comme harcèlement.
                  </p>
                  <p className="font-bold">
                    Toutes scènes incluant des propos racistes, propos homophobes, d'agression sexuelle ou de viol sont 
                    strictement interdites et sanctionnées d'un jail permanent immédiat.
                  </p>
                </div>
                
                <div className={`p-6 bg-yellow-500/10 border border-yellow-500/30 rounded-xl mb-6 ${isDarkMode ? 'text-yellow-300' : 'text-yellow-600'}`}>
                  <p>
                    Les <strong>petites</strong> insultes sont <strong>tolérées</strong> à la condition de <strong>ne pas en abuser.</strong> 
                    Il est important de <strong>rester respectueux</strong> envers les joueurs.
                  </p>
                </div>
              </div>
            </div>

            {/* Section Zones Safe */}
            <div>
              <h2 className={`text-2xl font-black mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`} id="zones-safe">
                ZONES SAFE
              </h2>
              
              <div className={`p-6 bg-cyan-500/10 border border-cyan-500/30 rounded-xl mb-4 ${isDarkMode ? 'text-cyan-300' : 'text-cyan-600'}`}>
                <p className="mb-4">
                  Les commissariats (LSPD/BCSO), les hôpitaux (EMS), le gouvernement (y compris le palais de justice), 
                  magasins, entreprises, garages et fourrières (etc...) <strong>sont des zones SAFE et de MASS RP.</strong>
                </p>
                
                <p className="mb-4">
                  Il est interdit de venir dans ces lieux armés, cagoulés, de voler un véhicule, de drive-by, de frapper, 
                  de kidnapper, d'arnaquer ou toutes actions illégales.
                </p>
                
                <p>
                  Les zones militaires sont interdites sauf dérogation et <strong>uniquement pour le gouvernement/forces armées.</strong>
                </p>
              </div>
            </div>
          </div>
        );

      case 'lexique':
        return (
          <div className="space-y-8">
            <div>
              <h2 className={`text-2xl font-black mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                🔰 LEXIQUE RP
              </h2>
              
              <div className={`p-6 bg-blue-500/10 border border-blue-500/30 rounded-xl mb-6 ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                <h3 className="text-xl font-bold mb-4">TERMES DE BASE</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-bold mb-2">RP/RolePlay :</h4>
                    <p className="text-sm mb-3">Jouer un rôle, incarner un personnage</p>
                    
                    <h4 className="font-bold mb-2">HRP/Hors RP :</h4>
                    <p className="text-sm mb-3">Hors du jeu de rôle, discussions réelles</p>
                    
                    <h4 className="font-bold mb-2">IG/In Game :</h4>
                    <p className="text-sm mb-3">Dans le jeu, en cours de RP</p>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">CK/Character Kill :</h4>
                    <p className="text-sm mb-3">Mort définitive du personnage</p>
                    
                    <h4 className="font-bold mb-2">PK/Player Kill :</h4>
                    <p className="text-sm mb-3">Mort temporaire, réanimation possible</p>
                    
                    <h4 className="font-bold mb-2">OOC/Out Of Character :</h4>
                    <p className="text-sm mb-3">Comportement du joueur, pas du personnage</p>
                  </div>
                </div>
              </div>

              <div className={`p-6 bg-purple-500/10 border border-purple-500/30 rounded-xl mb-6 ${isDarkMode ? 'text-purple-300' : 'text-purple-600'}`}>
                <h3 className="text-xl font-bold mb-4">RÈGLES ACTIONS</h3>
                <ul className="space-y-2">
                  <li>• <strong>Power Gaming :</strong> Forcer des actions irréalistes</li>
                  <li>• <strong>Meta Gaming :</strong> Utiliser des infos HRP en RP</li>
                  <li>• <strong>God Mode :</strong> Refuser la mort ou blessures</li>
                  <li>• <strong>Revenge Kill :</strong> Se venger après sa mort</li>
                  <li>• <strong>Drive-by :</strong> Tirer depuis un véhicule</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'corruption':
        return (
          <div className="space-y-8">
            <div>
              <h2 className={`text-2xl font-black mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                💲 CORRUPTION
              </h2>
              
              <div className={`p-6 bg-green-500/10 border border-green-500/30 rounded-xl mb-6 ${isDarkMode ? 'text-green-300' : 'text-green-600'}`}>
                <h3 className="text-xl font-bold mb-4">CORRUPTION AUTORISÉE</h3>
                <ul className="space-y-2">
                  <li>• Accepter des pots-de-vin jusqu'à 50 000$</li>
                  <li>• Fermer les yeux sur des infractions mineures</li>
                  <li>• Revendre des informations non sensibles</li>
                  <li>• Retarder une intervention non urgente</li>
                </ul>
              </div>

              <div className={`p-6 bg-red-500/10 border border-red-500/30 rounded-xl mb-6 ${isDarkMode ? 'text-red-300' : 'text-red-600'}`}>
                <h3 className="text-xl font-bold mb-4">CORRUPTION INTERDITE</h3>
                <ul className="space-y-2">
                  <li>• Libérer des prisonniers sans raison</li>
                  <li>• Fournir des armes/équipements police</li>
                  <li>• Révéler des enquêtes en cours</li>
                  <li>• Participer à des braquages</li>
                  <li>• Tuer d'autres policiers</li>
                </ul>
              </div>

              <div className={`p-6 bg-yellow-500/10 border border-yellow-500/30 rounded-xl ${isDarkMode ? 'text-yellow-300' : 'text-yellow-600'}`}>
                <h3 className="text-xl font-bold mb-4">SANCTIONS</h3>
                <p>La corruption doit rester réaliste et être justifiée RP. Les abus entraînent :</p>
                <ul className="space-y-1 mt-2">
                  <li>• Avertissement</li>
                  <li>• Suspension du service</li>
                  <li>• Licenciement définitif</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'vehicules':
        return (
          <div className="space-y-8">
            <div>
              <h2 className={`text-2xl font-black mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                🚗 VÉHICULES
              </h2>
              
              <div className={`p-6 bg-blue-500/10 border border-blue-500/30 rounded-xl mb-6 ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                <h3 className="text-xl font-bold mb-4">CONDUITE RÉALISTE</h3>
                <ul className="space-y-2">
                  <li>• Respecter le code de la route en ville</li>
                  <li>• Vitesse limitée selon les zones</li>
                  <li>• Pas de conduite suicidaire sans raison RP</li>
                  <li>• Ceinture obligatoire (commande /ceinture)</li>
                  <li>• Casque obligatoire en moto</li>
                </ul>
              </div>

              <div className={`p-6 bg-orange-500/10 border border-orange-500/30 rounded-xl mb-6 ${isDarkMode ? 'text-orange-300' : 'text-orange-600'}`}>
                <h3 className="text-xl font-bold mb-4">ACCIDENTS & PANNES</h3>
                <ul className="space-y-2">
                  <li>• Roleplay obligatoire en cas d'accident</li>
                  <li>• Appeler EMS si blessés</li>
                  <li>• Déclarer l'accident aux assurances</li>
                  <li>• Réparer le véhicule en garage</li>
                  <li>• Faire le plein régulièrement</li>
                </ul>
              </div>

              <div className={`p-6 bg-red-500/10 border border-red-500/30 rounded-xl ${isDarkMode ? 'text-red-300' : 'text-red-600'}`}>
                <h3 className="text-xl font-bold mb-4">INTERDICTIONS</h3>
                <ul className="space-y-2">
                  <li>• Voler des véhicules dans les zones Safe</li>
                  <li>• Stunt/cascade sans contexte RP</li>
                  <li>• Écraser volontairement des piétons</li>
                  <li>• Fuir en VDM (Vehicle Death Match)</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'police':
        return (
          <div className="space-y-8">
            <div>
              <h2 className={`text-2xl font-black mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                📒 RÈGLEMENT POLICE
              </h2>
              
              <div className={`p-6 bg-blue-500/10 border border-blue-500/30 rounded-xl mb-6 ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                <h3 className="text-xl font-bold mb-4">PROCÉDURES D'ARRESTATION</h3>
                <ul className="space-y-2">
                  <li>• Lecture des droits obligatoire</li>
                  <li>• Menottage avec /menotter</li>
                  <li>• Fouille corporelle si nécessaire</li>
                  <li>• Transport au commissariat</li>
                  <li>• Booking et placement en cellule</li>
                </ul>
              </div>

              <div className={`p-6 bg-green-500/10 border border-green-500/30 rounded-xl mb-6 ${isDarkMode ? 'text-green-300' : 'text-green-600'}`}>
                <h3 className="text-xl font-bold mb-4">USAGE DE LA FORCE</h3>
                <ul className="space-y-2">
                  <li>• Escalade progressive obligatoire</li>
                  <li>• Avertissement avant tir</li>
                  <li>• Tir uniquement si menace directe</li>
                  <li>• Secours immédiat après neutralisation</li>
                  <li>• Rapport obligatoire après usage arme</li>
                </ul>
              </div>

              <div className={`p-6 bg-purple-500/10 border border-purple-500/30 rounded-xl ${isDarkMode ? 'text-purple-300' : 'text-purple-600'}`}>
                <h3 className="text-xl font-bold mb-4">HIÉRARCHIE & GRADES</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-bold mb-2">LSPD :</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Cadet</li>
                      <li>• Officer I, II, III</li>
                      <li>• Detective</li>
                      <li>• Sergeant</li>
                      <li>• Lieutenant</li>
                      <li>• Captain</li>
                      <li>• Chief</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">BCSO :</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Deputy</li>
                      <li>• Senior Deputy</li>
                      <li>• Corporal</li>
                      <li>• Sergeant</li>
                      <li>• Lieutenant</li>
                      <li>• Captain</li>
                      <li>• Sheriff</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'vip':
        return (
          <div className="space-y-8">
            <div>
              <h2 className={`text-2xl font-black mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                💲 INFORMATIONS VIP
              </h2>
              
              <div className={`p-6 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl mb-6 ${isDarkMode ? 'text-yellow-300' : 'text-yellow-600'}`}>
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <RiVipCrownFill className="w-6 h-6 mr-2" />
                  AVANTAGES VIP
                </h3>
                <ul className="space-y-2">
                  <li>• Priority queue lors de la connexion</li>
                  <li>• Accès aux véhicules VIP exclusifs</li>
                  <li>• Bonus salaire +50% sur tous les jobs</li>
                  <li>• Badge VIP visible en jeu</li>
                  <li>• Support prioritaire</li>
                  <li>• Accès au salon VIP Discord</li>
                </ul>
              </div>

              <div className={`p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl mb-6 ${isDarkMode ? 'text-purple-300' : 'text-purple-600'}`}>
                <h3 className="text-xl font-bold mb-4">COMMANDES VIP</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-bold mb-2">Utilitaires :</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• /veh [modèle] - Spawn véhicule</li>
                      <li>• /heal - Soigner instantanément</li>
                      <li>• /repair - Réparer véhicule</li>
                      <li>• /fuel - Faire le plein</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Apparence :</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• /skin - Changer d'apparence</li>
                      <li>• /clothes - Menu vêtements</li>
                      <li>• /hair - Salon de coiffure</li>
                      <li>• /tattoo - Salon de tatouage</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className={`p-6 bg-gradient-to-r from-green-500/10 to-cyan-500/10 border border-green-500/30 rounded-xl ${isDarkMode ? 'text-green-300' : 'text-green-600'}`}>
                <h3 className="text-xl font-bold mb-4">TARIFS VIP</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-green-600/20 rounded-lg">
                    <h4 className="font-bold">VIP Bronze</h4>
                    <p className="text-2xl font-black">5€</p>
                    <p className="text-sm">30 jours</p>
                  </div>
                  <div className="text-center p-4 bg-yellow-600/20 rounded-lg">
                    <h4 className="font-bold">VIP Silver</h4>
                    <p className="text-2xl font-black">10€</p>
                    <p className="text-sm">60 jours</p>
                  </div>
                  <div className="text-center p-4 bg-orange-600/20 rounded-lg">
                    <h4 className="font-bold">VIP Gold</h4>
                    <p className="text-2xl font-black">20€</p>
                    <p className="text-sm">Permanent</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'bugs':
        return (
          <div className="space-y-8">
            <div>
              <h2 className={`text-2xl font-black mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                🔧 RÉSOLUTION DES BUGS
              </h2>
              
              <div className={`p-6 bg-red-500/10 border border-red-500/30 rounded-xl mb-6 ${isDarkMode ? 'text-red-300' : 'text-red-600'}`}>
                <h3 className="text-xl font-bold mb-4">🔌 PROBLÈMES DE CONNEXION</h3>
                <ul className="space-y-2">
                  <li>• Vérifier que Steam est ouvert et connecté</li>
                  <li>• Mettre à jour FiveM vers la dernière version</li>
                  <li>• Redémarrer Steam et FiveM</li>
                  <li>• Vérifier la connexion internet</li>
                  <li>• Désactiver VPN/proxy temporairement</li>
                </ul>
              </div>

              <div className={`p-6 bg-blue-500/10 border border-blue-500/30 rounded-xl mb-6 ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                <h3 className="text-xl font-bold mb-4">🎤 PROBLÈMES CHAT VOCAL</h3>
                <ul className="space-y-2">
                  <li>• Vérifier le micro dans Paramètres Windows</li>
                  <li>• Régler le micro dans FiveM (F1 → Settings)</li>
                  <li>• Tester avec d'autres applications</li>
                  <li>• Redémarrer FiveM après changement</li>
                  <li>• Vérifier les permissions micro</li>
                </ul>
              </div>

              <div className={`p-6 bg-green-500/10 border border-green-500/30 rounded-xl mb-6 ${isDarkMode ? 'text-green-300' : 'text-green-600'}`}>
                <h3 className="text-xl font-bold mb-4">🔩 PROBLÈMES PERFORMANCES</h3>
                <ul className="space-y-2">
                  <li>• Vider le cache FiveM : %localappdata%/FiveM/FiveM.app/cache</li>
                  <li>• Réduire les paramètres graphiques</li>
                  <li>• Fermer les applications en arrière-plan</li>
                  <li>• Mettre à jour les drivers carte graphique</li>
                  <li>• Vérifier l'utilisation RAM/CPU</li>
                </ul>
              </div>

              <div className={`p-6 bg-orange-500/10 border border-orange-500/30 rounded-xl ${isDarkMode ? 'text-orange-300' : 'text-orange-600'}`}>
                <h3 className="text-xl font-bold mb-4">⚠️ EN CAS DE CRASH</h3>
                <ul className="space-y-2">
                  <li>• Noter le moment exact du crash</li>
                  <li>• Envoyer les logs à l'équipe technique</li>
                  <li>• Vérifier l'intégrité des fichiers Steam</li>
                  <li>• Redémarrer en mode fenêtré</li>
                  <li>• Contacter le support avec détails</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'illegal':
        return (
          <div className="space-y-8">
            <div>
              <h2 className={`text-2xl font-black mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                RÈGLEMENT ILLÉGAL
              </h2>
              
              <div className={`p-6 bg-red-500/10 border border-red-500/30 rounded-xl mb-6 ${isDarkMode ? 'text-red-300' : 'text-red-600'}`}>
                <h3 className="text-xl font-bold mb-4">🏦 BRAQUAGES</h3>
                <ul className="space-y-2 mb-4">
                  <li>• Minimum 2 policiers en service pour braquer une banque</li>
                  <li>• Maximum 6 braqueurs par braquage</li>
                  <li>• Négociation obligatoire avec la police</li>
                  <li>• Prise d'otage civile autorisée (max 2 otages)</li>
                </ul>
              </div>

              <div className={`p-6 bg-orange-500/10 border border-orange-500/30 rounded-xl mb-6 ${isDarkMode ? 'text-orange-300' : 'text-orange-600'}`}>
                <h3 className="text-xl font-bold mb-4">💀 PRISE D'OTAGE</h3>
                <ul className="space-y-2 mb-4">
                  <li>• Otage doit être un civil (pas de policier/EMS)</li>
                  <li>• Demande de rançon maximale : 500K$</li>
                  <li>• Lieu d'échange négocié avec la police</li>
                  <li>• Respect de la vie de l'otage obligatoire</li>
                </ul>
              </div>

              <div className={`p-6 bg-purple-500/10 border border-purple-500/30 rounded-xl mb-6 ${isDarkMode ? 'text-purple-300' : 'text-purple-600'}`}>
                <h3 className="text-xl font-bold mb-4">🔫 ORGANISATIONS</h3>
                <ul className="space-y-2 mb-4">
                  <li>• Maximum 8 membres par organisation</li>
                  <li>• Territoire défendable avec accord staff</li>
                  <li>• Guerre entre orgas avec autorisation préalable</li>
                  <li>• Respect de la hiérarchie interne</li>
                </ul>
              </div>

              <div className={`p-6 bg-yellow-500/10 border border-yellow-500/30 rounded-xl ${isDarkMode ? 'text-yellow-300' : 'text-yellow-600'}`}>
                <h3 className="text-xl font-bold mb-4">🪓 GANGS</h3>
                <ul className="space-y-2">
                  <li>• Création avec minimum 4 membres actifs</li>
                  <li>• Couleurs et codes vestimentaires respectés</li>
                  <li>• Activités criminelles cohérentes avec le gang</li>
                  <li>• Alliances et rivalités RP développées</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'legal':
        return (
          <div className="space-y-8">
            <div>
              <h2 className={`text-2xl font-black mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                RÈGLEMENT LÉGAL
              </h2>
              
              <div className={`p-6 bg-green-500/10 border border-green-500/30 rounded-xl mb-6 ${isDarkMode ? 'text-green-300' : 'text-green-600'}`}>
                <h3 className="text-xl font-bold mb-4">🏢 ENTREPRISES</h3>
                <ul className="space-y-2 mb-4">
                  <li>• Capital minimum requis : 1M$ pour créer une entreprise</li>
                  <li>• Business plan obligatoire pour validation</li>
                  <li>• Employés avec contrats de travail officiels</li>
                  <li>• Respect des horaires d'ouverture annoncés</li>
                  <li>• Taxes mensuelles à payer à l'État</li>
                </ul>
              </div>

              <div className={`p-6 bg-blue-500/10 border border-blue-500/30 rounded-xl mb-6 ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                <h3 className="text-xl font-bold mb-4">💵 SALAIRES</h3>
                <ul className="space-y-2 mb-4">
                  <li>• LSPD/BCSO : 2500$ - 4000$ selon grade</li>
                  <li>• EMS : 2000$ - 3500$ selon grade</li>
                  <li>• Gouvernement : 3000$ - 6000$ selon poste</li>
                  <li>• Jobs civils : 800$ - 2000$ selon activité</li>
                  <li>• Paiement automatique toutes les 30min</li>
                </ul>
              </div>

              <div className={`p-6 bg-cyan-500/10 border border-cyan-500/30 rounded-xl mb-6 ${isDarkMode ? 'text-cyan-300' : 'text-cyan-600'}`}>
                <h3 className="text-xl font-bold mb-4">💰 TAXES</h3>
                <ul className="space-y-2 mb-4">
                  <li>• TVA sur achats : 20%</li>
                  <li>• Taxe immobilière : 5% de la valeur/mois</li>
                  <li>• Taxe véhicule : 1% de la valeur/mois</li>
                  <li>• Impôt sur le revenu : 15% des gains</li>
                </ul>
              </div>

              <div className={`p-6 bg-red-500/10 border border-red-500/30 rounded-xl ${isDarkMode ? 'text-red-300' : 'text-red-600'}`}>
                <h3 className="text-xl font-bold mb-4">🚑 EMS/LSMC</h3>
                <ul className="space-y-2">
                  <li>• Intervention obligatoire sur appel priority 1</li>
                  <li>• Facture maximum : 5000$ par intervention</li>
                  <li>• Secret médical absolu respecté</li>
                  <li>• Coopération avec la police sur demande</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'guide':
        return (
          <div className="space-y-8">
            <div>
              <h2 className={`text-2xl font-black mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                GUIDE JOUEUR
              </h2>
              
              <div className={`p-6 bg-purple-500/10 border border-purple-500/30 rounded-xl mb-6 ${isDarkMode ? 'text-purple-300' : 'text-purple-600'}`}>
                <h3 className="text-xl font-bold mb-4">💲 INFORMATIONS VIP</h3>
                <ul className="space-y-2 mb-4">
                  <li>• Accès aux véhicules exclusifs</li>
                  <li>• Priority queue lors de la connexion</li>
                  <li>• Bonus salaire +50%</li>
                  <li>• Commandes VIP (/veh, /tp, /heal)</li>
                  <li>• Badge VIP visible en jeu</li>
                </ul>
              </div>

              <div className={`p-6 bg-blue-500/10 border border-blue-500/30 rounded-xl mb-6 ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                <h3 className="text-xl font-bold mb-4">🎮 COMMANDES UTILES</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-bold mb-2">Générales :</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• /me [action] - Décrire une action</li>
                      <li>• /do [description] - Décrire un environnement</li>
                      <li>• /ooc [message] - Chat hors RP</li>
                      <li>• /report [pseudo] - Signaler un joueur</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Véhicules :</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• /motor - Allumer/éteindre moteur</li>
                      <li>• /seat [numéro] - Changer de place</li>
                      <li>• /trunk - Ouvrir le coffre</li>
                      <li>• /hood - Ouvrir le capot</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className={`p-6 bg-green-500/10 border border-green-500/30 rounded-xl mb-6 ${isDarkMode ? 'text-green-300' : 'text-green-600'}`}>
                <h3 className="text-xl font-bold mb-4">🔧 RÉSOLUTION DES BUGS</h3>
                <ul className="space-y-2 mb-4">
                  <li>• <strong>Connexion :</strong> Vérifier Steam et FiveM à jour</li>
                  <li>• <strong>Chat vocal :</strong> Régler micro dans Windows et FiveM</li>
                  <li>• <strong>Performances :</strong> Vider cache FiveM régulièrement</li>
                  <li>• <strong>Textures :</strong> Vérifier intégrité des fichiers</li>
                  <li>• <strong>Crash :</strong> Réduire les graphismes et mods</li>
                </ul>
              </div>

              <div className={`p-6 bg-orange-500/10 border border-orange-500/30 rounded-xl ${isDarkMode ? 'text-orange-300' : 'text-orange-600'}`}>
                <h3 className="text-xl font-bold mb-4">⚙️ OPTIMISATION</h3>
                <ul className="space-y-2">
                  <li>• Fermer les applications inutiles en arrière-plan</li>
                  <li>• Paramètres graphiques adaptés à votre PC</li>
                  <li>• Driver carte graphique à jour</li>
                  <li>• Minimum 8GB RAM recommandé</li>
                  <li>• SSD fortement conseillé pour les temps de chargement</li>
                </ul>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ 
        x: (e.clientX / window.innerWidth) * 2 - 1, 
        y: (e.clientY / window.innerHeight) * 2 - 1 
      });
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Détection ultra-précise des sections avec throttling
      const sections = [
        { ref: sectionRefs.accueil, index: 0 },
        { ref: sectionRefs.presentation, index: 1 },
        { ref: sectionRefs.events, index: 2 },
        { ref: sectionRefs.regles, index: 3 },
        { ref: sectionRefs.staff, index: 4 }
      ];

      let currentSection = 0;
      const scrollPosition = window.scrollY + 150; // Offset pour trigger plus tôt
      
      // Trouve la section active la plus proche
      sections.forEach((section, index) => {
        if (section.ref.current) {
          const element = section.ref.current;
          const sectionTop = element.offsetTop;
          
          // Si le scroll a dépassé le début de cette section
          if (scrollPosition >= sectionTop) {
            currentSection = index;
          }
        }
      });
      
      // Met à jour seulement si différent
      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    // Appel initial pour définir la section active
    handleScroll();
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#0a0a0a] text-white' : 'bg-white text-black'} font-mono overflow-x-hidden relative`}>
      
      {/* Background sophistiqué et premium */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        
        {/* Gradient principal amélioré */}
        <motion.div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at ${50 + mousePos.x * 25}% ${50 + mousePos.y * 25}%, #8b00d2 0%, transparent 60%),
              radial-gradient(circle at ${70 + mousePos.x * -20}% ${30 + mousePos.y * 20}%, #b366ff 0%, transparent 65%),
              radial-gradient(circle at ${30 + mousePos.x * 15}% ${70 + mousePos.y * -15}%, #00d4ff 0%, transparent 70%)
            `,
            filter: 'blur(80px)',
            opacity: isDarkMode ? 0.15 : 0.08
          }}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 0.5, -0.5, 0]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Mesh gradient sophistiqué */}
        <div className={`absolute inset-0 ${isDarkMode ? 'opacity-30' : 'opacity-15'}`}>
          <div 
            className="w-full h-full"
            style={{
              background: `
                conic-gradient(from 0deg at 50% 50%, 
                  transparent 0deg, 
                  rgba(139, 0, 210, ${isDarkMode ? '0.1' : '0.05'}) 60deg, 
                  transparent 120deg, 
                  rgba(0, 212, 255, ${isDarkMode ? '0.1' : '0.05'}) 180deg, 
                  transparent 240deg, 
                  rgba(255, 0, 110, ${isDarkMode ? '0.1' : '0.05'}) 300deg, 
                  transparent 360deg
                )
              `,
              filter: 'blur(40px)'
            }}
          />
        </div>

        {/* Grille premium avec animation */}
        <div className={`absolute inset-0 ${isDarkMode ? 'opacity-8' : 'opacity-4'}`}>
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="premiumGrid" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
                <path d="M 8 0 L 0 0 0 8" fill="none" stroke="#8b00d2" strokeWidth="0.3" opacity="0.6">
                  <animate attributeName="opacity" values="0.3;0.8;0.3" dur="8s" repeatCount="indefinite"/>
                </path>
                <circle cx="0" cy="0" r="0.8" fill="#8b00d2" opacity="0.4">
                  <animate attributeName="r" values="0.5;1.2;0.5" dur="6s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="0.2;0.6;0.2" dur="6s" repeatCount="indefinite"/>
                </circle>
              </pattern>
              
              <filter id="gridGlow">
                <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <rect width="100%" height="100%" fill="url(#premiumGrid)" filter="url(#gridGlow)" />
          </svg>
        </div>

        {/* Particules élégantes améliorées */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
              animate={{
                y: [0, -window.innerHeight - 200],
                x: [0, Math.sin(i) * 100],
                opacity: [0, 0.8, 0],
                scale: [0, 1.5, 0]
              }}
              transition={{
                duration: 20 + Math.random() * 15,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 15
              }}
            >
              <div 
                className={`w-3 h-3 rounded-full ${
                  i % 3 === 0 ? 'bg-alkia-violet' : i % 3 === 1 ? 'bg-cyan-400' : 'bg-pink-400'
                }`}
                style={{
                  boxShadow: `0 0 20px ${
                    i % 3 === 0 ? '#8b00d2' : i % 3 === 1 ? '#00d4ff' : '#ff006e'
                  }`,
                  filter: 'blur(0.5px)'
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Orbes flottants décoratifs */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${isDarkMode ? 'opacity-20' : 'opacity-10'}`}
            style={{
              width: `${100 + i * 50}px`,
              height: `${100 + i * 50}px`,
              left: `${10 + i * 20}%`,
              top: `${10 + i * 15}%`,
              background: `radial-gradient(circle, ${
                i % 3 === 0 ? '#8b00d2' : i % 3 === 1 ? '#00d4ff' : '#ff006e'
              } 0%, transparent 70%)`
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              scale: [1, 1.2, 1],
              opacity: [isDarkMode ? 0.1 : 0.05, isDarkMode ? 0.3 : 0.15, isDarkMode ? 0.1 : 0.05]
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 2
            }}
          />
        ))}
      </div>

      {/* NAVBAR ultra-premium avec effets sophistiqués */}
      <motion.nav 
        className="fixed top-0 left-0 w-full z-40"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <div className="relative">
          {/* Background glassmorphism premium */}
          <motion.div 
            className={`absolute inset-0 transition-all duration-700 ${
              isScrolled ? 
              `${isDarkMode ? 'bg-black/50' : 'bg-white/50'} backdrop-blur-2xl border-b border-alkia-violet/30` : 
              `${isDarkMode ? 'bg-black/20' : 'bg-white/20'} backdrop-blur-xl`
            }`}
            style={{
              background: isScrolled ?
                `linear-gradient(135deg, ${isDarkMode ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)'} 0%, rgba(59,130,246,0.1) 50%, ${isDarkMode ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)'} 100%)` :
                `linear-gradient(135deg, ${isDarkMode ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)'} 0%, rgba(59,130,246,0.05) 50%, ${isDarkMode ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)'} 100%)`,
              boxShadow: isScrolled ? '0 8px 32px rgba(59,130,246,0.1)' : 'none'
            }}
          >
            {/* Barre de lumière supérieure */}
            <motion.div 
              className="h-0.5 bg-gradient-to-r from-transparent via-alkia-violet to-transparent"
              animate={{ 
                opacity: [0.3, 0.8, 0.3],
                scaleX: [0.8, 1, 0.8]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </motion.div>
          
          {/* Contenu navbar avec effets premium */}
          <div className="relative h-20 px-8 flex items-center justify-between">
            
            {/* Logo premium avec effets sophistiqués */}
            <motion.div 
              className="flex items-center space-x-3 group cursor-pointer" // Assure l'alignement horizontal et l'espacement
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <img src="/alkia-logo.png" alt="AlkiaRP" className="w-10 h-10 object-contain" /> {/* Logo AlkiaRP */}
              <div className="flex flex-col">
                <motion.h1 
                  className="text-2xl font-black tracking-tight relative"
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Titre modifié : Evolution en bleu, RP en couleur par défaut */}
                  <span className="text-blue-500">Evolution</span>
                  <span className={`${isDarkMode ? 'text-white' : 'text-black'}`}> RP</span>
                </motion.h1>
              </div>
            </motion.div>

            {/* Menu navigation avec effets premium */}
            <div className="hidden md:flex items-center space-x-2">
              {[
                { name: 'ACCUEIL', icon: <BiWorld className="w-4 h-4" />, section: 'accueil' },
                { name: 'PRÉSENTATION', icon: <TbPolygon className="w-4 h-4" />, section: 'presentation' },
                { name: 'ÉVÉNEMENTS', icon: <TbCalendarEvent className="w-4 h-4" />, section: 'events' },
                { name: 'RÈGLES', icon: <TbPolygon className="w-4 h-4" />, section: 'regles' },
                { name: 'STAFF', icon: <HiLightningBolt className="w-4 h-4" />, section: 'staff' }
              ].map((item, index) => (
                <motion.div
                  key={item.name}
                  className="relative group cursor-pointer"
                  whileHover={{ y: -2, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => scrollToSection(item.section)}
                >
                  <div className="relative px-6 py-3 rounded-xl overflow-hidden">
                    {/* Background hover premium */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-alkia-violet/10 to-cyan-400/10 opacity-0 group-hover:opacity-100 rounded-xl"
                      transition={{ duration: 0.3 }}
                    />
                    
                    <div className={`relative z-10 flex items-center space-x-2 ${
                      activeSection === index ? 'text-alkia-violet' : `${isDarkMode ? 'text-white/70' : 'text-black/70'} group-hover:${isDarkMode ? 'text-white' : 'text-black'}`
                    } transition-all duration-300`}>
                      <motion.div
                        animate={activeSection === index ? { rotate: 360 } : {}}
                        transition={{ duration: 2, repeat: activeSection === index ? Infinity : 0, ease: "linear" }}
                      >
                        {item.icon}
                      </motion.div>
                      <span className="font-bold text-sm">{item.name}</span>
                    </div>

                    {/* Indicateur actif premium */}
                    {activeSection === index && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute inset-0 bg-alkia-violet/10 rounded-xl border border-alkia-violet/40"
                        style={{
                          boxShadow: '0 0 20px rgba(139, 92, 246, 0.2)'
                        }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                    
                    {/* Bordure premium */}
                    <div className={`absolute inset-0 rounded-xl border ${isDarkMode ? 'border-white/5' : 'border-black/5'} group-hover:border-alkia-violet/30 transition-all duration-300`} />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Boutons d'action ultra-premium */}
            <div className="flex items-center space-x-4">
              <motion.button
                className="px-5 py-3 bg-[#5865F2] text-white font-bold rounded-xl flex items-center space-x-2 relative overflow-hidden"
                onClick={() => window.open('https://discord.gg/revrp', '_blank')}
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 8px 30px rgba(88, 101, 242, 0.4)" 
                }}
                whileTap={{ scale: 0.95 }}
                style={{
                  boxShadow: '0 4px 20px rgba(88, 101, 242, 0.2)'
                }}
              >
                <FaDiscord className="w-4 h-4" />
                <span>DISCORD</span>
                
                {/* Effet de brillance */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    repeatDelay: 5
                  }}
                />
              </motion.button>

              <motion.button
                className="px-6 py-3 bg-gradient-to-r from-alkia-violet to-alkia-violetLight text-white font-bold rounded-xl flex items-center space-x-2 relative overflow-hidden"
                onClick={connectToFiveM}
                whileHover={{ 
                  scale: 1.05, 
                  y: -3,
                  boxShadow: "0 15px 50px rgba(139, 92, 246, 0.5)" 
                }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{
                  backgroundPosition: { duration: 4, repeat: Infinity },
                  default: { duration: 0.3 }
                }}
                style={{ 
                  backgroundSize: "200% 200%",
                  boxShadow: '0 8px 30px rgba(139, 92, 246, 0.3)'
                }}
              >
                <RiSpaceShipLine className="w-4 h-4" />
                <span>REJOINDRE</span>
                
                {/* Particules internes */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-white/60 rounded-full"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`
                      }}
                      animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3
                      }}
                    />
                  ))}
                </div>
              </motion.button>

              <motion.button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-3 ${isDarkMode ? 'bg-white/10' : 'bg-black/10'} backdrop-blur-xl rounded-xl border ${isDarkMode ? 'border-white/20' : 'border-black/20'} relative overflow-hidden`}
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: `0 8px 20px ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`
                }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  animate={{ rotate: isDarkMode ? 0 : 180 }}
                  transition={{ duration: 0.5 }}
                >
                  {isDarkMode ? (
                    <MdLightMode className="w-5 h-5 text-yellow-400" />
                  ) : (
                    <MdDarkMode className="w-5 h-5 text-purple-600" />
                  )}
                </motion.div>
                
                {/* Glow effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-purple-600/10 opacity-0 hover:opacity-100 rounded-xl"
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero section ultra-premium avec Plan 3D intégré */}
      <section ref={sectionRefs.accueil} className="min-h-screen flex items-center relative overflow-hidden pt-20 lg:pt-32">
        <div className="max-w-7xl mx-auto px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            
            {/* Contenu textuel premium (Gauche) */}
            <motion.div 
              className="relative z-10 text-center lg:text-left"
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              {/* Badge ultra-élégant */}
              <motion.div 
                className="inline-flex items-center space-x-3 mb-8 px-6 py-3 bg-gradient-to-r from-alkia-violet/20 via-alkia-violetLight/20 to-cyan-400/20 backdrop-blur-2xl border border-alkia-violet/40 rounded-2xl relative overflow-hidden mx-auto lg:mx-0"
                whileHover={{ scale: 1.03, y: -2 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                style={{
                  boxShadow: '0 8px 32px rgba(139, 92, 246, 0.2)'
                }}
              >
                <motion.div 
                  className="w-3 h-3 bg-gradient-to-r from-alkia-violet to-cyan-400 rounded-full relative"
                  animate={{ 
                    scale: [1, 1.3, 1],
                    boxShadow: [
                      "0 0 10px rgba(59,130,246, 0.5)",
                      "0 0 20px rgba(59,130,246, 0.8)",
                      "0 0 10px rgba(59,130,246, 0.5)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <motion.div 
                    className="absolute inset-0 bg-white rounded-full"
                    animate={{ scale: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  />
                </motion.div>
                <span className="text-alkia-violet font-bold text-sm tracking-wide">
                  REVOLUTIONRP PREMIUM
                </span>
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <HiSparkles className="w-4 h-4 text-cyan-400" />
                </motion.div>
                
                {/* Shimmer effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    repeatDelay: 4
                  }}
                />
              </motion.div>

              {/* Titre épique avec effets premium */}
              <motion.h1 
                className="text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight relative"
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, delay: 0.5 }}
              >
                <motion.span 
                  className="block bg-gradient-to-r from-alkia-violet via-alkia-violetLight to-cyan-400 bg-clip-text text-transparent relative"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                  }}
                  transition={{ duration: 8, repeat: Infinity }}
                  style={{ 
                    backgroundSize: "200% 200%",
                    filter: 'drop-shadow(0 0 20px rgba(139, 92, 246, 0.3))'
                  }}
                >
                  REVOLUTION
                  
                  {/* Effet de glow sur le texte */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-alkia-violet/20 to-cyan-400/20 blur-2xl"
                    animate={{ 
                      opacity: [0.3, 0.8, 0.3],
                      scale: [0.8, 1.2, 0.8]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                </motion.span>
                <motion.span 
                  className={`block ${isDarkMode ? 'text-white' : 'text-black'} relative`}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1, duration: 1 }}
                  style={{
                    textShadow: `0 0 30px ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`
                  }}
                >
                  ROLEPLAY
                </motion.span>
              </motion.h1>

              <motion.p 
                className={`text-lg md:text-xl ${isDarkMode ? 'text-white/80' : 'text-black/80'} mb-10 max-w-lg leading-relaxed mx-auto lg:mx-0`}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                Découvrez les systèmes uniques qui font de RevolutionRP une 
                <span className="text-transparent bg-gradient-to-r from-alkia-violet to-cyan-400 bg-clip-text font-bold">
                  {" "}expérience RP exceptionnelle.
                </span>
                 Plongez dans un univers immersif avec des scripts exclusifs et une communauté active.
              </motion.p>
              
              {/* Boutons d'action Hero */}
              <motion.div 
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.2 }}
              >
                <motion.button
                  className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-alkia-violet to-alkia-violetLight text-white font-bold text-lg rounded-xl flex items-center justify-center space-x-3 relative overflow-hidden shadow-lg hover:shadow-blue-500/40 transition-all duration-300"
                  onClick={connectToFiveM}
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ boxShadow: '0 8px 30px rgba(59,130,246,0.3)'}}
                >
                  <RiSpaceShipLine className="w-5 h-5" />
                  <span>REJOINDRE L'AVENTURE</span>
                  <motion.div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                </motion.button>
                <motion.button
                  className="w-full sm:w-auto px-8 py-4 bg-transparent text-white font-semibold rounded-xl flex items-center justify-center space-x-3 border-2 border-alkia-violet/50 hover:bg-alkia-violet/20 hover:border-alkia-violet transition-all duration-300"
                  onClick={() => scrollToSection('presentation')} // Renvoie vers la section présentation (ancienne vidéo)
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaPlay className="w-4 h-4" />
                  <span>VOIR L'APERÇU</span>
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Plan 3D avec logo géant (Droite) - Déplacé ici */}
            <motion.div 
              className="hidden lg:flex items-center justify-center relative mt-12 lg:mt-0"
              initial={{ opacity: 0, x: 60, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
            >
              <div className="relative">
                {/* Logo principal géant en 3D */}
                <motion.div 
                  className="relative w-72 h-72 lg:w-96 lg:h-96 bg-gradient-to-br from-gray-800/70 via-gray-900/70 to-black/70 backdrop-blur-md rounded-3xl flex items-center justify-center overflow-hidden border border-alkia-violet/30"
                  animate={{ 
                    rotateY: [0, 360],
                    rotateX: [0, 10, -5, 10, 0],
                    scale: [1, 1.05, 1],
                    boxShadow: [
                      "0 0 50px rgba(139, 92, 246, 0.3)",
                      "0 0 100px rgba(139, 92, 246, 0.5)",
                      "0 0 50px rgba(139, 92, 246, 0.3)"
                    ]
                  }}
                  transition={{ 
                    rotateY: { duration: 25, repeat: Infinity, ease: "linear" },
                    rotateX: { duration: 10, repeat: Infinity, ease: "easeInOut" },
                    scale: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                    boxShadow: { duration: 3.5, repeat: Infinity, ease: "easeInOut" }
                  }}
                  style={{
                    transformStyle: "preserve-3d",
                    perspective: "1200px"
                  }}
                >
                  <motion.div
                    className="relative z-10"
                    animate={{
                      filter: ["drop-shadow(0 0 15px rgba(139, 92, 246, 0.4))", "drop-shadow(0 0 30px rgba(139, 92, 246, 0.6))", "drop-shadow(0 0 15px rgba(139, 92, 246, 0.4))"],
                      rotateZ: [0, -360],
                      scale: [0.85, 1.1, 0.85]
                    }}
                    transition={{
                      filter: {duration: 3.5, repeat: Infinity, ease: "easeInOut"},
                      rotateZ: { duration: 18, repeat: Infinity, ease: "linear" },
                      scale: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                    }}
                  >
                    <img src="/alkia-logo.png" alt="RevolutionRP Core" className="w-36 h-36 lg:w-48 lg:h-48 object-contain" />
                  </motion.div>
                  
                  {/* Particules orbitales */}
                  {[...Array(10)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-gradient-to-r from-alkia-violet to-cyan-400 rounded-full"
                      style={{
                        top: "50%",
                        left: "50%"
                      }}
                      animate={{
                        rotate: [0, 360],
                        x: [0, Math.cos(i * 36 * Math.PI / 180) * (140 + Math.random()*20)], // Variation du rayon
                        y: [0, Math.sin(i * 36 * Math.PI / 180) * (140 + Math.random()*20)], // Variation du rayon
                        scale: [0, 1.2, 0],
                        opacity: [0, 0.9, 0]
                      }}
                      transition={{
                        duration: 7 + Math.random() * 3,
                        repeat: Infinity,
                        delay: i * 0.25,
                        ease: "linear"
                      }}
                    />
                  ))}
                  
                  {/* Anneaux orbitaux */}
                  <motion.div 
                    className="absolute inset-2 border-2 border-alkia-violet/40 rounded-full opacity-50"
                    animate={{ 
                      rotate: [0, 360],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ 
                      rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                      scale: { duration: 7, repeat: Infinity, ease: "easeInOut" }
                    }}
                    style={{ transform: "rotateX(70deg)" }}
                  />
                  <motion.div 
                    className="absolute inset-4 border border-cyan-400/40 rounded-full opacity-40"
                    animate={{ 
                      rotate: [360, 0],
                      scale: [1.1, 0.9, 1.1]
                    }}
                    transition={{ 
                      rotate: { duration: 22, repeat: Infinity, ease: "linear" },
                      scale: { duration: 9, repeat: Infinity, ease: "easeInOut" }
                    }}
                    style={{ transform: "rotateX(-60deg) rotateY(20deg)" }}
                  />
                  
                  {/* Effet de lueur interne */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-radial from-alkia-violet/10 via-transparent to-transparent rounded-3xl blur-lg"
                    animate={{ 
                      opacity: [0.2, 0.6, 0.2],
                      scale: [0.9, 1.3, 0.9]
                    }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  />
                </motion.div>
                
                {/* Éléments flottants décoratifs */}
                <motion.div 
                  className="absolute -top-10 -left-10 w-20 h-20 bg-alkia-violet/10 rounded-2xl backdrop-blur-lg border border-alkia-violet/30 flex items-center justify-center shadow-xl"
                  animate={{ y: [0, -15, 0], x: [0, 10, 0], rotate: [0, 120, 240, 360] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                >
                  <HiOutlineCode className="w-10 h-10 text-alkia-violet opacity-70" />
                </motion.div>
                <motion.div 
                  className="absolute -bottom-12 right-0 w-24 h-24 bg-cyan-400/10 rounded-3xl backdrop-blur-lg border border-cyan-400/30 flex items-center justify-center shadow-xl"
                  animate={{ y: [0, 18, 0], x: [0, -12, 0], rotate: [360, 240, 120, 0] }}
                  transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                >
                  <TbAtom className="w-12 h-12 text-cyan-400 opacity-70" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section vidéo épurée */}
      <section ref={sectionRefs.presentation} className="py-24 relative">
        <div className="max-w-5xl mx-auto px-8">
          
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-black mb-6">
              <span className="bg-gradient-to-r from-alkia-violet to-cyan-400 bg-clip-text text-transparent">
                APERÇU
              </span>
              <br />
              <span className={isDarkMode ? 'text-white' : 'text-black'}>SERVEUR</span>
            </h2>
            
            <p className={`text-lg ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
              Découvrez l'univers RevolutionRP
            </p>
          </motion.div>

          <motion.div 
            className="relative group"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.01 }}
          >
            {/* Cadre vidéo conservé, contenu modifié */}
            <div className={`relative aspect-video ${isDarkMode ? 'bg-black/60' : 'bg-white/60'} border-2 border-alkia-violet/30 overflow-hidden rounded-2xl backdrop-blur-xl flex items-center justify-center`}>
              <motion.div
                className="text-center p-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className={`text-2xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                  Contenu Personnalisé Ici
                </h3>
                <p className={`text-sm ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
                  Cet espace peut être utilisé pour ce que vous souhaitez.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section Events ultra-premium */}
      <section ref={sectionRefs.events} className="py-24 relative">
        <div className="max-w-7xl mx-auto px-8">
          
          <motion.div 
            className="mb-20 text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-6xl font-black mb-6"
            >
              <span className="bg-gradient-to-r from-alkia-violet to-cyan-400 bg-clip-text text-transparent">
                ÉVÉNEMENTS
              </span>
              <br />
              <span className={isDarkMode ? 'text-white' : 'text-black'}>EXCLUSIFS</span>
            </motion.h2>
            
            <p className={`text-xl ${isDarkMode ? 'text-white/70' : 'text-black/70'} max-w-3xl mx-auto`}>
              Participez aux événements communautaires organisés chaque semaine par notre équipe 
              <span className="text-transparent bg-gradient-to-r from-alkia-violet to-cyan-400 bg-clip-text font-bold">
                {" "}avec des récompenses exceptionnelles
              </span>
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "COURSE PREMIUM",
                date: "Samedi 25 Mai",
                time: "20h00",
                participants: "64",
                reward: "500K$",
                status: "À venir",
                color: "from-yellow-500 to-orange-500",
                icon: <FaGamepad className="w-6 h-6" />,
                image: "/event1.jpg"
              },
              {
                title: "BRAQUAGE GÉANT",
                date: "Dimanche 26 Mai", 
                time: "21h30",
                participants: "32",
                reward: "1M$",
                status: "Complet",
                color: "from-red-500 to-pink-500",
                icon: <FaFire className="w-6 h-6" />,
                image: "/event2.jpg"
              },
              {
                title: "TOURNOI PVP",
                date: "Lundi 27 Mai",
                time: "19h00", 
                participants: "16",
                reward: "VIP",
                status: "Ouvert",
                color: "from-purple-500 to-indigo-500",
                icon: <FaStar className="w-6 h-6" />,
                image: "/event3.jpg"
              }
            ].map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group relative"
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <div className={`relative h-96 bg-gradient-to-br ${isDarkMode ? 'from-black/60 to-black/40' : 'from-white/60 to-white/40'} backdrop-blur-xl border ${isDarkMode ? 'border-white/10' : 'border-black/10'} hover:border-alkia-violet/40 transition-all duration-500 rounded-2xl overflow-hidden`}>
                  
                  {/* Image de fond avec overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                    <div className={`w-full h-full bg-gradient-to-br ${event.color} opacity-20`} />
                  </div>
                  
                  {/* Badge status */}
                  <div className="absolute top-4 right-4 z-10">
                    <div className={`px-3 py-1 text-xs font-bold rounded-full ${
                      event.status === 'Ouvert' ? 'bg-green-500/20 text-green-400 border border-green-500/50' :
                      event.status === 'Complet' ? 'bg-red-500/20 text-red-400 border border-red-500/50' :
                      'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50'
                    } backdrop-blur-xl`}>
                      {event.status}
                    </div>
                  </div>

                  {/* Contenu */}
                  <div className="relative z-10 h-full flex flex-col justify-between p-6">
                    
                    {/* Header */}
                    <div>
                      <div className={`flex items-center space-x-3 mb-4 p-3 bg-gradient-to-r ${event.color} rounded-xl`}>
                        <div className="text-white">
                          {event.icon}
                        </div>
                        <h3 className="text-white font-black text-lg tracking-wide">
                          {event.title}
                        </h3>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className={`${isDarkMode ? 'text-white/60' : 'text-black/60'} text-sm`}>Date</span>
                          <span className={`${isDarkMode ? 'text-white' : 'text-black'} font-bold`}>{event.date}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className={`${isDarkMode ? 'text-white/60' : 'text-black/60'} text-sm`}>Heure</span>
                          <span className={`${isDarkMode ? 'text-white' : 'text-black'} font-bold`}>{event.time}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className={`${isDarkMode ? 'text-white/60' : 'text-black/60'} text-sm`}>Participants</span>
                          <span className={`${isDarkMode ? 'text-white' : 'text-black'} font-bold`}>{event.participants}</span>
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className={`${isDarkMode ? 'text-white/60' : 'text-black/60'} text-sm`}>Récompense</span>
                        <span className="text-2xl font-black text-transparent bg-gradient-to-r from-alkia-violet to-cyan-400 bg-clip-text">
                          {event.reward}
                        </span>
                      </div>
                      
                      <motion.button
                        className={`w-full py-3 bg-gradient-to-r ${event.color} text-white font-bold rounded-xl backdrop-blur-xl relative overflow-hidden`}
                        onClick={() => window.open('https://discord.gg/revrp', '_blank')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={event.status === 'Complet'}
                      >
                        <span className="relative z-10">
                          {event.status === 'Complet' ? 'ÉVÉNEMENT COMPLET' : 'PARTICIPER'}
                        </span>
                        
                        {/* Effet de brillance */}
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0"
                          animate={{ x: ["-100%", "200%"] }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity,
                            repeatDelay: 3
                          }}
                        />
                      </motion.button>
                    </div>
                  </div>

                  {/* Particules flottantes */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className={`absolute w-1 h-1 bg-gradient-to-r ${event.color} rounded-full opacity-60`}
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`
                        }}
                        animate={{
                          scale: [0, 2, 0],
                          opacity: [0, 0.8, 0],
                          y: [0, -50]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: i * 0.5
                        }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Call to action */}
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <motion.button
              className="px-12 py-4 bg-gradient-to-r from-alkia-violet to-alkia-violetLight text-white font-bold text-lg rounded-2xl flex items-center space-x-3 mx-auto relative overflow-hidden"
              onClick={() => window.open('https://discord.gg/revrp', '_blank')}
              whileHover={{ 
                scale: 1.05, 
                y: -3,
                boxShadow: "0 15px 50px rgba(139, 92, 246, 0.5)" 
              }}
              whileTap={{ scale: 0.95 }}
              style={{ 
                boxShadow: '0 8px 30px rgba(139, 92, 246, 0.3)'
              }}
            >
              <TbCalendarEvent className="w-5 h-5" />
              <span>VOIR TOUS LES ÉVÉNEMENTS</span>
              <FaArrowRight className="w-4 h-4" />
              
              {/* Effet shimmer */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12"
                animate={{ x: ["-100%", "200%"] }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  repeatDelay: 4
                }}
              />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Section Wiki/Règles ultra-premium */}
      <section ref={sectionRefs.regles} className="py-24 relative">
        <div className="max-w-7xl mx-auto px-8">
          
          <motion.div 
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-6xl font-black mb-6"
            >
              <span className="bg-gradient-to-r from-alkia-violet to-cyan-400 bg-clip-text text-transparent">
                REVOLUTIONRP
              </span>
              <br />
              <span className={isDarkMode ? 'text-white' : 'text-black'}>WIKI</span>
            </motion.h2>
            
            <p className={`text-xl ${isDarkMode ? 'text-white/70' : 'text-black/70'} max-w-3xl mx-auto`}>
              Documentation complète du serveur RevolutionRP
            </p>
          </motion.div>

          {/* Structure Wiki à la GitBook */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Sidebar Navigation */}
            <motion.div 
              className={`lg:col-span-1 ${isDarkMode ? 'bg-black/40' : 'bg-white/40'} backdrop-blur-xl border ${isDarkMode ? 'border-white/10' : 'border-black/10'} rounded-2xl p-6 h-fit`}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <h3 className={`text-lg font-black mb-6 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                🚧 Règlement(s)
              </h3>
              
              <div className="space-y-2">
                {/* Règlement AlkiaRP */}
                <div>
                  <div className={`flex items-center space-x-2 p-2 rounded-lg ${isDarkMode ? 'text-white/90' : 'text-black/90'} font-bold`}>
                    <span>📄</span>
                    <span>Règlement RevolutionRP</span>
                  </div>
                  
                  {/* Sous-sections */}
                  <div className="ml-4 mt-2 space-y-1">
                    <div 
                      className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer ${
                        activeWikiTab === 'general' 
                          ? `${isDarkMode ? 'text-alkia-violet hover:bg-white/5' : 'text-alkia-violet hover:bg-black/5'} bg-alkia-violet/10 border border-alkia-violet/30` 
                          : `${isDarkMode ? 'text-white/70 hover:bg-white/5' : 'text-black/70 hover:bg-black/5'}`
                      }`}
                      onClick={() => setActiveWikiTab('general')}
                    >
                      <span>📘</span>
                      <span className="font-bold">Règles Générales</span>
                    </div>
                    
                    <div className="ml-4 space-y-1">
                      <div 
                        className={`flex items-center space-x-2 p-1 text-sm cursor-pointer ${
                          activeWikiTab === 'lexique'
                            ? `${isDarkMode ? 'text-alkia-violet hover:text-alkia-violet' : 'text-alkia-violet hover:text-alkia-violet'}`
                            : `${isDarkMode ? 'text-white/70 hover:text-white' : 'text-black/70 hover:text-black'}`
                        }`}
                        onClick={() => setActiveWikiTab('lexique')}
                      >
                        <span>🔰</span>
                        <span>Lexique RP</span>
                      </div>
                      <div 
                        className={`flex items-center space-x-2 p-1 text-sm cursor-pointer ${
                          activeWikiTab === 'corruption'
                            ? `${isDarkMode ? 'text-alkia-violet hover:text-alkia-violet' : 'text-alkia-violet hover:text-alkia-violet'}`
                            : `${isDarkMode ? 'text-white/70 hover:text-white' : 'text-black/70 hover:text-black'}`
                        }`}
                        onClick={() => setActiveWikiTab('corruption')}
                      >
                        <span>💲</span>
                        <span>Corruption</span>
                      </div>
                      <div 
                        className={`flex items-center space-x-2 p-1 text-sm cursor-pointer ${
                          activeWikiTab === 'vehicules'
                            ? `${isDarkMode ? 'text-alkia-violet hover:text-alkia-violet' : 'text-alkia-violet hover:text-alkia-violet'}`
                            : `${isDarkMode ? 'text-white/70 hover:text-white' : 'text-black/70 hover:text-black'}`
                        }`}
                        onClick={() => setActiveWikiTab('vehicules')}
                      >
                        <span>🚗</span>
                        <span>Véhicules</span>
                      </div>
                    </div>
                    
                    <div 
                      className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer ${
                        activeWikiTab === 'illegal'
                          ? `${isDarkMode ? 'text-alkia-violet hover:bg-white/5' : 'text-alkia-violet hover:bg-black/5'} bg-alkia-violet/10 border border-alkia-violet/30`
                          : `${isDarkMode ? 'text-white/70 hover:bg-white/5' : 'text-black/70 hover:bg-black/5'}`
                      }`}
                      onClick={() => setActiveWikiTab('illegal')}
                    >
                      <span>📕</span>
                      <span>Règlement Illégal</span>
                    </div>
                    
                    <div 
                      className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer ${
                        activeWikiTab === 'legal'
                          ? `${isDarkMode ? 'text-alkia-violet hover:bg-white/5' : 'text-alkia-violet hover:bg-black/5'} bg-alkia-violet/10 border border-alkia-violet/30`
                          : `${isDarkMode ? 'text-white/70 hover:bg-white/5' : 'text-black/70 hover:bg-black/5'}`
                      }`}
                      onClick={() => setActiveWikiTab('legal')}
                    >
                      <span>📗</span>
                      <span>Règlement Légal</span>
                    </div>
                    
                    <div 
                      className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer ${
                        activeWikiTab === 'police'
                          ? `${isDarkMode ? 'text-alkia-violet hover:bg-white/5' : 'text-alkia-violet hover:bg-black/5'} bg-alkia-violet/10 border border-alkia-violet/30`
                          : `${isDarkMode ? 'text-white/70 hover:bg-white/5' : 'text-black/70 hover:bg-black/5'}`
                      }`}
                      onClick={() => setActiveWikiTab('police')}
                    >
                      <span>📒</span>
                      <span>Règlement Police</span>
                    </div>
                  </div>
                </div>
                
                {/* Guide AlkiaRP */}
                <div className="mt-4">
                  <div className={`flex items-center space-x-2 p-2 rounded-lg ${isDarkMode ? 'text-white/90' : 'text-black/90'} font-bold`}>
                    <span>📚</span>
                    <span>Guide RevolutionRP</span>
                  </div>
                  
                  <div className="ml-4 mt-2 space-y-1">
                    <div 
                      className={`flex items-center space-x-2 p-1 text-sm cursor-pointer ${
                        activeWikiTab === 'vip'
                          ? `${isDarkMode ? 'text-alkia-violet hover:text-alkia-violet' : 'text-alkia-violet hover:text-alkia-violet'}`
                          : `${isDarkMode ? 'text-white/70 hover:text-white' : 'text-black/70 hover:text-black'}`
                      }`}
                      onClick={() => setActiveWikiTab('vip')}
                    >
                      <span>💲</span>
                      <span>Informations VIP</span>
                    </div>
                    <div 
                      className={`flex items-center space-x-2 p-1 text-sm cursor-pointer ${
                        activeWikiTab === 'guide'
                          ? `${isDarkMode ? 'text-alkia-violet hover:text-alkia-violet' : 'text-alkia-violet hover:text-alkia-violet'}`
                          : `${isDarkMode ? 'text-white/70 hover:text-white' : 'text-black/70 hover:text-black'}`
                      }`}
                      onClick={() => setActiveWikiTab('guide')}
                    >
                      <span>🎮</span>
                      <span>Guide en jeu</span>
                    </div>
                    <div 
                      className={`flex items-center space-x-2 p-1 text-sm cursor-pointer ${
                        activeWikiTab === 'bugs'
                          ? `${isDarkMode ? 'text-alkia-violet hover:text-alkia-violet' : 'text-alkia-violet hover:text-alkia-violet'}`
                          : `${isDarkMode ? 'text-white/70 hover:text-white' : 'text-black/70 hover:text-black'}`
                      }`}
                      onClick={() => setActiveWikiTab('bugs')}
                    >
                      <span>🔧</span>
                      <span>Résolution des bugs</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Contenu Principal */}
            <motion.div 
              className="lg:col-span-3"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <div className={`${isDarkMode ? 'bg-black/40' : 'bg-white/40'} backdrop-blur-xl border ${isDarkMode ? 'border-white/10' : 'border-black/10'} rounded-2xl p-8`}>
                
                {/* Header de la page */}
                <div className="mb-8">
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-sm text-alkia-violet">🚧 Règlement(s)</span>
                    <span className={`text-sm ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>{'>'}</span>
                    <span className="text-sm text-alkia-violet">
                      {(activeWikiTab === 'general' || activeWikiTab === 'lexique' || activeWikiTab === 'corruption' || activeWikiTab === 'vehicules' || activeWikiTab === 'illegal' || activeWikiTab === 'legal' || activeWikiTab === 'police') 
                        ? '📄 Règlement RevolutionRP' 
                        : '📚 Guide RevolutionRP'}
                    </span>
                  </div>
                  
                  <h1 className={`text-4xl font-black mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                    {activeWikiTab === 'general' && '📘 Règles Générales'}
                    {activeWikiTab === 'lexique' && '🔰 Lexique RP'}
                    {activeWikiTab === 'corruption' && '💲 Corruption'}
                    {activeWikiTab === 'vehicules' && '🚗 Véhicules'}
                    {activeWikiTab === 'illegal' && '📕 Règlement Illégal'}
                    {activeWikiTab === 'legal' && '📗 Règlement Légal'}
                    {activeWikiTab === 'police' && '📒 Règlement Police'}
                    {activeWikiTab === 'vip' && '💲 Informations VIP'}
                    {activeWikiTab === 'guide' && '🎮 Guide en Jeu'}
                    {activeWikiTab === 'bugs' && '🔧 Résolution des Bugs'}
                  </h1>
                </div>

                {/* Table des matières dynamique */}
                {activeWikiTab === 'general' && (
                  <div className="mb-8">
                    <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                      Sur cette page
                    </h3>
                    <div className="space-y-2">
                      {[
                        "Sanctions",
                        "Règles Générales", 
                        "Zones Safe"
                      ].map((item, index) => (
                        <div key={index} className={`text-sm ${isDarkMode ? 'text-white/70 hover:text-alkia-violet' : 'text-black/70 hover:text-alkia-violet'} cursor-pointer`}>
                          {index + 1}. {item}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeWikiTab === 'lexique' && (
                  <div className="mb-8">
                    <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                      Sur cette page
                    </h3>
                    <div className="space-y-2">
                      {[
                        "Termes de Base",
                        "Règles Actions"
                      ].map((item, index) => (
                        <div key={index} className={`text-sm ${isDarkMode ? 'text-white/70 hover:text-alkia-violet' : 'text-black/70 hover:text-alkia-violet'} cursor-pointer`}>
                          {index + 1}. {item}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeWikiTab === 'corruption' && (
                  <div className="mb-8">
                    <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                      Sur cette page
                    </h3>
                    <div className="space-y-2">
                      {[
                        "Corruption Autorisée",
                        "Corruption Interdite",
                        "Sanctions"
                      ].map((item, index) => (
                        <div key={index} className={`text-sm ${isDarkMode ? 'text-white/70 hover:text-alkia-violet' : 'text-black/70 hover:text-alkia-violet'} cursor-pointer`}>
                          {index + 1}. {item}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeWikiTab === 'vehicules' && (
                  <div className="mb-8">
                    <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                      Sur cette page
                    </h3>
                    <div className="space-y-2">
                      {[
                        "Conduite Réaliste",
                        "Accidents & Pannes",
                        "Interdictions"
                      ].map((item, index) => (
                        <div key={index} className={`text-sm ${isDarkMode ? 'text-white/70 hover:text-alkia-violet' : 'text-black/70 hover:text-alkia-violet'} cursor-pointer`}>
                          {index + 1}. {item}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeWikiTab === 'police' && (
                  <div className="mb-8">
                    <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                      Sur cette page
                    </h3>
                    <div className="space-y-2">
                      {[
                        "Procédures d'Arrestation",
                        "Usage de la Force",
                        "Hiérarchie & Grades"
                      ].map((item, index) => (
                        <div key={index} className={`text-sm ${isDarkMode ? 'text-white/70 hover:text-alkia-violet' : 'text-black/70 hover:text-alkia-violet'} cursor-pointer`}>
                          {index + 1}. {item}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeWikiTab === 'vip' && (
                  <div className="mb-8">
                    <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                      Sur cette page
                    </h3>
                    <div className="space-y-2">
                      {[
                        "Avantages VIP",
                        "Commandes VIP",
                        "Tarifs VIP"
                      ].map((item, index) => (
                        <div key={index} className={`text-sm ${isDarkMode ? 'text-white/70 hover:text-alkia-violet' : 'text-black/70 hover:text-alkia-violet'} cursor-pointer`}>
                          {index + 1}. {item}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeWikiTab === 'bugs' && (
                  <div className="mb-8">
                    <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                      Sur cette page
                    </h3>
                    <div className="space-y-2">
                      {[
                        "Problèmes de Connexion",
                        "Problèmes Chat Vocal",
                        "Problèmes Performances",
                        "En Cas de Crash"
                      ].map((item, index) => (
                        <div key={index} className={`text-sm ${isDarkMode ? 'text-white/70 hover:text-alkia-violet' : 'text-black/70 hover:text-alkia-violet'} cursor-pointer`}>
                          {index + 1}. {item}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Contenu dynamique des règles */}
                {renderWikiContent()}
                
                {/* Navigation bas de page */}
                <div className="flex justify-between items-center pt-8 border-t border-alkia-violet/20 mt-8">
                  <div>
                    {/* Bouton Précédent */}
                    {activeWikiTab !== 'general' && (
                      <div 
                        className={`flex items-center space-x-2 text-alkia-violet cursor-pointer`}
                        onClick={() => {
                          const tabs = ['general', 'lexique', 'corruption', 'vehicules', 'illegal', 'legal', 'police', 'vip', 'guide', 'bugs'];
                          const currentIndex = tabs.indexOf(activeWikiTab);
                          if (currentIndex > 0) {
                            setActiveWikiTab(tabs[currentIndex - 1]);
                          }
                        }}
                      >
                        <span>←</span>
                        <span className="font-bold">
                          {activeWikiTab === 'lexique' && '📘 Règles Générales'}
                          {activeWikiTab === 'corruption' && '🔰 Lexique RP'}
                          {activeWikiTab === 'vehicules' && '💲 Corruption'}
                          {activeWikiTab === 'illegal' && '🚗 Véhicules'}
                          {activeWikiTab === 'legal' && '📕 Règlement Illégal'}
                          {activeWikiTab === 'police' && '📗 Règlement Légal'}
                          {activeWikiTab === 'vip' && '📒 Règlement Police'}
                          {activeWikiTab === 'guide' && '💲 Informations VIP'}
                          {activeWikiTab === 'bugs' && '🎮 Guide en Jeu'}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    {/* Bouton Suivant */}
                    {activeWikiTab !== 'bugs' && (
                      <div 
                        className={`flex items-center space-x-2 text-alkia-violet cursor-pointer`}
                        onClick={() => {
                          const tabs = ['general', 'lexique', 'corruption', 'vehicules', 'illegal', 'legal', 'police', 'vip', 'guide', 'bugs'];
                          const currentIndex = tabs.indexOf(activeWikiTab);
                          if (currentIndex < tabs.length - 1) {
                            setActiveWikiTab(tabs[currentIndex + 1]);
                          }
                        }}
                      >
                        <span className="font-bold">
                          {activeWikiTab === 'general' && '🔰 Lexique RP'}
                          {activeWikiTab === 'lexique' && '💲 Corruption'}
                          {activeWikiTab === 'corruption' && '🚗 Véhicules'}
                          {activeWikiTab === 'vehicules' && '📕 Règlement Illégal'}
                          {activeWikiTab === 'illegal' && '📗 Règlement Légal'}
                          {activeWikiTab === 'legal' && '📒 Règlement Police'}
                          {activeWikiTab === 'police' && '💲 Informations VIP'}
                          {activeWikiTab === 'vip' && '🎮 Guide en Jeu'}
                          {activeWikiTab === 'guide' && '🔧 Résolution des Bugs'}
                        </span>
                        <span>→</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section Staff ultra-premium */}
      <section ref={sectionRefs.staff} className="py-24 relative">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div 
            className="mb-20 text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className={`text-6xl font-black mb-6 ${isDarkMode ? 'text-white' : 'text-black'}`}>
              NOTRE 
              <span className="bg-gradient-to-r from-alkia-violet to-cyan-400 bg-clip-text text-transparent">
                STAFF
              </span>
            </h2>
            <p className={`text-xl ${isDarkMode ? 'text-white/70' : 'text-black/70'} max-w-2xl mx-auto`}>
              Une équipe dévouée et compétente pour garantir la meilleure expérience de jeu.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {[ // Remplacement des noms par les rôles et spécialités
              {
                role: "Fondateur Principal",
                specialty: "Direction & Vision Stratégique",
                icon: <RiVipCrownFill className="w-8 h-8 text-alkia-violet" />,
                color: "alkia-violet",
                details: [
                  "Supervision globale du projet",
                  "Développement des partenariats",
                  "Gestion de la communauté principale"
                ]
              },
              {
                role: "Co-Fondateur & Tech Lead",
                specialty: "Infrastructure & Développement Senior",
                icon: <HiChip className="w-8 h-8 text-cyan-400" />,
                color: "cyan-400",
                details: [
                  "Maintenance des serveurs",
                  "Développement des scripts clés",
                  "Sécurité et optimisation"
                ]
              },
              {
                role: "Responsable Développement",
                specialty: "Gestion de l'Équipe Dev & Scripts",
                icon: <HiOutlineCode className="w-8 h-8 text-green-400" />,
                color: "green-400",
                details: [
                  "Coordination des développeurs",
                  "Revue de code et intégration",
                  "Innovation et nouvelles fonctionnalités"
                ]
              },
              {
                role: "Administrateur Serveur",
                specialty: "Gestion In-Game & Support Élevé",
                icon: <RiSettings3Fill className="w-8 h-8 text-orange-400" />,
                color: "orange-400",
                details: [
                  "Application du règlement",
                  "Gestion des événements majeurs",
                  "Support technique aux joueurs"
                ]
              },
              {
                role: "Modérateur Principal",
                specialty: "Modération & Vie Communautaire",
                icon: <BiSupport className="w-8 h-8 text-blue-400" />,
                color: "blue-400",
                details: [
                  "Surveillance du chat et des comportements",
                  "Aide et orientation des joueurs",
                  "Organisation d'animations mineures"
                ]
              },
              {
                role: "Community Manager",
                specialty: "Réseaux Sociaux & Communication",
                icon: <FaDiscord className="w-8 h-8 text-indigo-400" />,
                color: "indigo-400",
                details: [
                  "Animation Discord et réseaux",
                  "Création de contenu promotionnel",
                  "Recueil des retours joueurs"
                ]
              }
            ].map((staff, index) => (
              <motion.div
                key={index}
                className={`relative p-8 rounded-3xl overflow-hidden border ${isDarkMode ? 'bg-black/50 border-white/10' : 'bg-white/50 border-black/10'} backdrop-blur-2xl shadow-2xl`}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, delay: index * 0.15, ease: "circOut" }}
                whileHover={{ y: -8, boxShadow: `0 20px 40px rgba(${staff.color === 'alkia-violet' ? '139,0,210' : staff.color === 'cyan-400' ? '0,212,255' : staff.color === 'green-400' ? '74,222,128' : staff.color === 'orange-400' ? '251,146,60' : staff.color === 'blue-400' ? '96,165,250' : '99,102,241'}, 0.3)` }}
              >
                <div className={`absolute -top-3 -left-3 w-16 h-16 bg-${staff.color}/20 rounded-full blur-xl`} />
                <div className={`absolute -bottom-3 -right-3 w-20 h-20 bg-${staff.color}/10 rounded-full blur-2xl`} /> 

                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    <div className={`p-3 rounded-xl bg-${staff.color}/20 border border-${staff.color}/30 mr-4`}>
                      {staff.icon}
                    </div>
                    <div>
                      <h3 className={`text-xl font-black ${isDarkMode ? 'text-white' : 'text-black'}`}>{staff.role}</h3>
                      <p className={`text-sm text-${staff.color}`}>{staff.specialty}</p>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {staff.details.map((detail, i) => (
                      <li key={i} className="flex items-center">
                        <div className={`w-2 h-2 rounded-full bg-${staff.color} mr-3 shrink-0`} />
                        <span className={`${isDarkMode ? 'text-white/80' : 'text-black/80'} text-sm`}>{detail}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <motion.button 
                    className={`w-full py-3 rounded-xl bg-${staff.color}/20 text-${staff.color} font-bold border border-${staff.color}/40`}
                    whileHover={{ backgroundColor: `rgba(${staff.color === 'alkia-violet' ? '139,0,210' : staff.color === 'cyan-400' ? '0,212,255' : staff.color === 'green-400' ? '74,222,128' : staff.color === 'orange-400' ? '251,146,60' : staff.color === 'blue-400' ? '96,165,250' : '99,102,241'}, 0.3)`}}
                    whileTap={{scale: 0.95}}
                  >
                    Contacter (Prochainement)
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer ultra-premium */}
      <footer className="py-20 relative border-t border-alkia-violet/20 bg-gradient-to-br from-black/30 via-alkia-violet/10 to-black/30 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-8">
          
          {/* Contenu principal du footer */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            
            {/* Logo et description */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-4 mb-6">
          <motion.div 
                  className="w-12 h-12 bg-gradient-to-br from-alkia-violet to-alkia-violetLight rounded-xl flex items-center justify-center relative overflow-hidden"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  style={{
                    boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)'
                  }}
                >
                  <img src="/alkia-logo.png" alt="RevolutionRP" className="w-7 h-7 object-contain" />
                  
                  {/* Effet de brillance */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0"
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity,
                      repeatDelay: 5
                    }}
                  />
                </motion.div>
                
              <div>
                  <h3 className="text-2xl font-black">
                  <span className="bg-gradient-to-r from-alkia-violet to-cyan-400 bg-clip-text text-transparent">
                    RevolutionRP
                  </span>
                </h3>
                  <p className="text-alkia-violet/60 font-mono text-sm">PREMIUM FIVEM SERVER</p>
              </div>
            </div>
            
              <p className={`${isDarkMode ? 'text-white/70' : 'text-black/70'} leading-relaxed mb-6 max-w-md`}>
                Le serveur FiveM de référence pour une expérience RP immersive et authentique. 
                Rejoignez notre communauté passionnée et vivez des aventures uniques.
              </p>
              
              {/* Statistiques */}
              <div className="flex space-x-6">
                <div className="text-center">
                  <div className="text-2xl font-black text-transparent bg-gradient-to-r from-alkia-violet to-cyan-400 bg-clip-text">
                    1544
                  </div>
                  <div className={`${isDarkMode ? 'text-white/60' : 'text-black/60'} text-xs`}>JOUEURS</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-black text-transparent bg-gradient-to-r from-alkia-violet to-cyan-400 bg-clip-text">
                    61K
                  </div>
                  <div className={`${isDarkMode ? 'text-white/60' : 'text-black/60'} text-xs`}>DISCORD</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-black text-transparent bg-gradient-to-r from-alkia-violet to-cyan-400 bg-clip-text">
                    24/7
                  </div>
                  <div className={`${isDarkMode ? 'text-white/60' : 'text-black/60'} text-xs`}>ONLINE</div>
                </div>
              </div>
            </div>
            
            {/* Liens rapides */}
            <div>
              <h4 className={`text-lg font-black mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                Navigation
              </h4>
              <ul className="space-y-2">
                {[
                  { name: 'Accueil', href: '#accueil' },
                  { name: 'Scripts', href: '#scripts' },
                  { name: 'Présentation', href: '#presentation' },
                  { name: 'Événements', href: '#events' },
                  { name: 'Règles', href: '#regles' },
                  { name: 'Staff', href: '#staff' }
                ].map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href}
                      className={`${isDarkMode ? 'text-white/70 hover:text-alkia-violet' : 'text-black/70 hover:text-alkia-violet'} transition-colors duration-300 text-sm`}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Réseaux sociaux */}
            <div>
              <h4 className={`text-lg font-black mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                Communauté
              </h4>
              <div className="space-y-3">
                <motion.a
                  href="https://discord.gg/revrp"
                  target="_blank"
                  className="flex items-center space-x-3 p-3 bg-[#5865F2]/20 border border-[#5865F2]/30 rounded-xl hover:bg-[#5865F2]/30 transition-all duration-300"
                  whileHover={{ scale: 1.02, x: 5 }}
                >
                  <FaDiscord className="w-5 h-5 text-[#5865F2]" />
                  <span className={`${isDarkMode ? 'text-white' : 'text-black'} font-bold text-sm`}>Discord</span>
                </motion.a>
                
                <motion.a
                  href="https://www.tiktok.com/@alkiafa"
                  target="_blank"
                  className="flex items-center space-x-3 p-3 bg-black/20 border border-black/30 rounded-xl hover:bg-black/30 transition-all duration-300"
                  whileHover={{ scale: 1.02, x: 5 }}
                >
                  <FaTiktok className="w-5 h-5 text-white" />
                  <span className={`${isDarkMode ? 'text-white' : 'text-black'} font-bold text-sm`}>TikTok</span>
                </motion.a>
                
                <motion.a
                  href="https://www.instagram.com/alkiarp"
                  target="_blank"
                  className="flex items-center space-x-3 p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-300"
                  whileHover={{ scale: 1.02, x: 5 }}
                >
                  <FaInstagram className="w-5 h-5 text-pink-400" />
                  <span className={`${isDarkMode ? 'text-white' : 'text-black'} font-bold text-sm`}>Instagram</span>
                </motion.a>
                
                <motion.button
                  onClick={connectToFiveM}
                  className="flex items-center space-x-3 p-3 bg-alkia-violet/20 border border-alkia-violet/30 rounded-xl hover:bg-alkia-violet/30 transition-all duration-300 w-full"
                  whileHover={{ scale: 1.02, x: 5 }}
                >
                  <RiSpaceShipLine className="w-5 h-5 text-alkia-violet" />
                  <span className={`${isDarkMode ? 'text-white' : 'text-black'} font-bold text-sm`}>Se connecter</span>
                </motion.button>
              </div>
            </div>
          </div>
          
          {/* Séparateur */}
          <div className="border-t border-alkia-violet/20 pt-8">
            <motion.div 
              className="flex flex-col md:flex-row justify-between items-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <p className={`${isDarkMode ? 'text-white/40' : 'text-black/40'} font-mono text-sm mb-4 md:mb-0`}>
                © 2024 RevolutionRP - Tous droits réservés
              </p>
              
              <div className="flex items-center space-x-4">
                <span className={`${isDarkMode ? 'text-white/40' : 'text-black/40'} font-mono text-xs`}>
                  Made by
                </span>
                <motion.div 
                  className="flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div 
                    className="w-2 h-2 bg-alkia-violet rounded-full"
                    animate={{ 
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-alkia-violet font-mono text-sm font-bold">
                    RUBEN
                  </span>
          </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Particules de fond */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-alkia-violet/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
              animate={{
                scale: [0, 1.5, 0],
                opacity: [0, 0.6, 0],
                y: [0, -50]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.8
              }}
            />
          ))}
        </div>
      </footer>
    </div>
  );
};

export default App;