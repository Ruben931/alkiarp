import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-black text-white font-montserrat">
      {/* Header avec logo et nom */}
      <header className="w-full flex flex-col items-center py-8">
        <Image src="/alkia-logo.png" alt="Alkia Roleplay" width={220} height={120} priority />
        <h1 className="text-5xl font-bebas text-purple-500 mt-2 tracking-widest drop-shadow-lg">ALKIA ROLEPLAY</h1>
      </header>

      {/* Description + Vidéo */}
      <section className="flex flex-col md:flex-row items-center justify-center w-full max-w-5xl gap-10 px-4 mt-4">
        <div className="flex-1 flex flex-col gap-4">
          <h2 className="text-3xl font-bebas text-purple-400 mb-2">Vivez l'Aventure RP, tiens la police</h2>
          <p className="text-lg text-gray-200">
            Bienvenue sur Alkia Roleplay, le serveur FiveM où l'aventure RP prend vie !<br />
            Rejoignez une communauté active, des événements réguliers et un staff à l'écoute.<br />
            Police, gangs, jobs, véhicules personnalisés et bien plus vous attendent !
          </p>
        </div>
        <div className="flex-1 flex flex-col items-center">
          <div className="rounded-xl overflow-hidden shadow-lg border-4 border-purple-700">
            <iframe width="400" height="225" src="https://www.youtube.com/embed/H1NfVSxcHp0" title="Présentation AlkiaRP" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          </div>
        </div>
      </section>

      {/* Points forts */}
      <section className="w-full max-w-5xl mt-12 px-4">
        <h2 className="text-3xl font-bebas text-purple-400 mb-6">Points forts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-900 rounded-xl p-6 border-l-4 border-purple-600 shadow flex flex-col items-center">
            <span className="text-4xl mb-2">🌆</span>
            <span className="text-lg font-bold text-purple-300">Map exclusive & immersive</span>
            <p className="text-gray-400 mt-2 text-center">Découvrez une map unique, pensée pour l'immersion et le RP.</p>
          </div>
          <div className="bg-gray-900 rounded-xl p-6 border-l-4 border-purple-600 shadow flex flex-col items-center">
            <span className="text-4xl mb-2">👮</span>
            <span className="text-lg font-bold text-purple-300">Système police avancé</span>
            <p className="text-gray-400 mt-2 text-center">Rejoignez la police ou affrontez-la, avec des scripts et mécaniques inédites.</p>
          </div>
          <div className="bg-gray-900 rounded-xl p-6 border-l-4 border-purple-600 shadow flex flex-col items-center">
            <span className="text-4xl mb-2">🎉</span>
            <span className="text-lg font-bold text-purple-300">Événements réguliers</span>
            <p className="text-gray-400 mt-2 text-center">Participez à des events RP, courses, soirées spéciales et bien plus !</p>
          </div>
        </div>
      </section>

      {/* Événements */}
      <section className="w-full max-w-5xl mt-12 px-4">
        <h2 className="text-3xl font-bebas text-purple-400 mb-6">Événements à venir</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-purple-700 via-gray-900 to-purple-900 rounded-xl p-6 shadow flex flex-col items-center border border-purple-800">
            <span className="text-lg font-bold text-purple-200">Course illégale</span>
            <span className="text-gray-400">Samedi 21h</span>
          </div>
          <div className="bg-gradient-to-br from-purple-700 via-gray-900 to-purple-900 rounded-xl p-6 shadow flex flex-col items-center border border-purple-800">
            <span className="text-lg font-bold text-purple-200">Event Police vs Gangs</span>
            <span className="text-gray-400">Dimanche 18h</span>
          </div>
          <div className="bg-gradient-to-br from-purple-700 via-gray-900 to-purple-900 rounded-xl p-6 shadow flex flex-col items-center border border-purple-800">
            <span className="text-lg font-bold text-purple-200">Soirée RP libre</span>
            <span className="text-gray-400">Tous les vendredis</span>
          </div>
        </div>
      </section>

      {/* Boutons Discord & FiveM */}
      <section className="flex flex-col md:flex-row gap-6 mt-12 mb-8 items-center justify-center">
        <a href="https://discord.gg/EacTmrsb" target="_blank" rel="noopener noreferrer" className="bg-purple-600 hover:bg-purple-800 text-white font-bold py-3 px-8 rounded-full text-xl shadow transition">Rejoindre le Discord</a>
        <a href="fivem://connect/game-02.epycore.fr:30174" className="bg-gray-800 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full text-xl shadow transition">Rejoindre le serveur FiveM</a>
      </section>

      <footer className="w-full text-center py-6 text-gray-500 text-sm mt-8 border-t border-gray-800">
        © 2024 Alkia Roleplay. Site créé pour la communauté FiveM.
      </footer>
    </div>
  );
}
