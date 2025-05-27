import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'

const Formations = () => {
  const location = useLocation()

  useEffect(() => {
    if (location.state?.scrollTo) {
      setTimeout(() => {
        const element = document.getElementById(location.state.scrollTo)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    }
  }, [location])

  const formations = [
    {
      id: 'starter',
      title: 'Formation Starter',
      price: '49€',
      duration: '4 semaines',
      description: 'Formation simple pour apprendre à vendre des services de création de site internet et gagner 30% de commission',
      features: [
        'Module 1: Comment trouver des clients',
        'Module 2: Comment présenter nos services',
        'Module 3: Comment conclure une vente',
        'Module 4: Comment gérer vos commissions',
        'Accès aux ressources en ligne',
        'Support par email',
        'Certificat de formation'
      ],
      schedule: [
        'Formation en ligne à votre rythme',
        'Accès 1H par jour',
        'Formation rapide et efficace'
      ],
      details: [
        'Apprenez à contacter des clients potentiels',
        'Découvrez comment présenter nos services de création de site',
        'Maîtrisez les étapes pour conclure une vente',
        'Comprenez comment toucher vos 30% de commission'
      ],
      benefits: [
        'Pas besoin d\'expérience',
        'Formation simple et rapide',
        'Gains immédiats dès la première vente',
        'Accompagnement personnalisé'
      ]
    },
    {
      id: 'pro',
      title: 'Formation Pro',
      price: '399€',
      duration: '8 semaines',
      description: 'Formation avancée pour devenir un expert en vente et en développement commercial',
      features: [
        'Tous les modules de la formation Starter',
        'Module 5: Stratégies avancées de vente',
        'Module 6: Leadership et management',
        'Module 7: Marketing digital',
        'Module 8: Gestion de projet',
        'Accès aux webinaires exclusifs',
        'Support prioritaire',
        'Mentorat individuel',
        'Certificat professionnel'
      ],
      schedule: [
        'Formation en ligne à votre rythme',
        'Accès 24h/24 et 7j/7',
        'Durée moyenne : 3h par jour',
        'Webinaires exclusifs le samedi'
      ],
      details: [
        'Perfectionnez vos techniques de vente et de négociation',
        'Devenez un leader commercial inspirant',
        'Maîtrisez le marketing digital pour augmenter vos ventes',
        'Gérez efficacement votre portefeuille clients'
      ],
      benefits: [
        'Stratégies de vente avancées',
        'Techniques de closing professionnelles',
        'Gestion de portefeuille clients',
        'Analyse de performance commerciale'
      ]
    },
    {
      id: 'elite',
      title: 'Formation Elite',
      price: 'Sur mesure',
      duration: 'Personnalisé',
      description: 'Formation exclusive pour devenir un expert en vente et en développement commercial',
      features: [
        'Programme 100% personnalisé',
        'Accompagnement individuel',
        'Analyse de votre situation',
        'Stratégies sur mesure',
        'Suivi personnalisé',
        'Accès VIP aux événements',
        'Certificat Elite'
      ],
      schedule: [
        'Horaires flexibles selon vos besoins',
        'Sessions individuelles',
        'Accompagnement prioritaire'
      ],
      details: [
        'Programme sur mesure selon vos objectifs commerciaux',
        'Accompagnement par un expert senior en vente',
        'Stratégies adaptées à votre secteur d\'activité',
        'Suivi personnalisé intensif de vos performances'
      ],
      benefits: [
        'Stratégies commerciales sur mesure',
        'Coaching individuel intensif',
        'Analyse approfondie de votre marché',
        'Plan d\'action personnalisé'
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 pt-20 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 blur-3xl animate-gradient-shift"></div>
        <div className="absolute inset-0 bg-[url('/src/assets/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/20 to-gray-900"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-purple-600/10 animate-gradient-x"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-purple-600/10 to-pink-600/10 blur-2xl"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: 0.5 + Math.random() * 0.5,
            }}
            animate={{
              x: [
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth,
              ],
              y: [
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight,
              ],
            }}
            transition={{
              duration: 15 + Math.random() * 5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 blur-3xl"></div>
          <div className="absolute inset-0 bg-[url('/src/assets/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/20 to-gray-900"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="inline-block mb-8"
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25"></div>
                <div className="relative bg-gray-900/50 backdrop-blur-sm px-6 py-3 rounded-lg border border-gray-800">
                  <motion.span 
                    className="text-purple-400 font-semibold inline-block"
                    animate={{ 
                      textShadow: [
                        "0 0 8px rgba(192, 132, 252, 0.5)",
                        "0 0 16px rgba(192, 132, 252, 0.8)",
                        "0 0 8px rgba(192, 132, 252, 0.5)"
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    Formations Professionnelles
                  </motion.span>
                </div>
              </div>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="relative text-7xl font-bold mb-8"
            >
              <span className="relative inline-block">
                <span className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 bg-[length:200%_100%] animate-gradient-x bg-clip-text text-transparent">
                  Transformez Votre Carrière
                </span>
                <span className="relative bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 bg-[length:200%_100%] animate-gradient-x bg-clip-text text-transparent">
                  Transformez Votre Carrière
                </span>
              </span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed"
            >
              Des formations professionnelles conçues pour vous propulser vers le succès. 
              Développez vos compétences avec nos experts et atteignez vos objectifs.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block"
            >
              <a
                href="#formations"
                className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-lg font-semibold rounded-xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-full group-hover:translate-x-0"></div>
                <span className="relative z-10 flex items-center">
                  Découvrir nos formations
                  <svg className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Formations Section */}
      <div id="formations" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="inline-block mb-6"
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25"></div>
              <div className="relative bg-gray-900/50 backdrop-blur-sm px-6 py-3 rounded-lg border border-gray-800">
                <span className="text-purple-400 font-semibold">Nos Programmes</span>
              </div>
            </div>
          </motion.div>
          <h2 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-6">
            Nos Formations
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Choisissez le programme qui correspond le mieux à vos objectifs et à votre niveau d'expertise
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {formations.map((formation, index) => (
            <motion.div
              key={formation.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.01 }}
              className="relative group h-full"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-800 h-full flex flex-col">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-full blur-2xl -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-600/20 to-pink-600/20 rounded-full blur-2xl -ml-16 -mb-16"></div>
                
                <div className="relative flex flex-col h-full">
                  {/* Header Section */}
                  <div className="mb-8">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="inline-block mb-4">
                          <div className="relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25"></div>
                            <div className="relative bg-gray-900/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-gray-800">
                              <span className="text-purple-400 font-semibold text-sm">{formation.duration}</span>
                            </div>
                          </div>
                        </div>
                        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-3">
                          {formation.title}
                        </h2>
                        <p className="text-gray-300 text-lg leading-relaxed">{formation.description}</p>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                          {formation.price}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="flex-grow space-y-8">
                    {/* Learning Section */}
                    <div>
                      <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-6">
                        Ce que vous allez apprendre
                      </h3>
                      <ul className="space-y-4">
                        {formation.details.map((detail, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-start text-gray-300 group/item"
                          >
                            <div className="h-6 w-6 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center mr-3 mt-1 flex-shrink-0 group-hover/item:scale-110 transition-transform duration-200">
                              <svg
                                className="h-4 w-4 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </div>
                            <span className="leading-relaxed group-hover/item:text-white transition-colors duration-200">{detail}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Features Section */}
                    <div>
                      <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-6">
                        Programme détaillé
                      </h3>
                      <ul className="space-y-4">
                        {formation.features.map((feature, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-start text-gray-300 group/item"
                          >
                            <div className="h-6 w-6 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center mr-3 mt-1 flex-shrink-0 group-hover/item:scale-110 transition-transform duration-200">
                              <svg
                                className="h-4 w-4 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </div>
                            <span className="leading-relaxed group-hover/item:text-white transition-colors duration-200">{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Footer Section */}
                  <div className="mt-8">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="group relative w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-lg font-semibold rounded-xl overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-x-full group-hover:translate-x-0"></div>
                      <span className="relative z-10 flex items-center justify-center">
                        Commencer maintenant
                        <svg className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </span>
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Section détaillée sur les services */}
        <motion.div
          id="methodologie"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-24 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 blur-3xl"></div>
          <div className="relative">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
                Notre Expertise à Votre Service
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Découvrez comment nous transformons les professionnels en leaders d'exception
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-gray-900/50 backdrop-blur-sm p-8 rounded-lg border border-gray-800">
                  <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-6">
                    Comment ça marche ?
                  </h3>
                  <ul className="space-y-6">
                    <li className="flex items-start">
                      <div className="h-12 w-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mr-4">
                        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <span className="text-gray-200 font-semibold text-lg">1. Contactez le client</span>
                        <p className="text-gray-400 mt-2">Nous vous donnons les contacts de clients potentiels. Vous les appelez pour comprendre leurs besoins en création de site internet.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="h-12 w-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mr-4">
                        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <div>
                        <span className="text-gray-200 font-semibold text-lg">2. Présentez nos services</span>
                        <p className="text-gray-400 mt-2">Vous expliquez au client les services de création de site que nous proposons et leurs avantages.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="h-12 w-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mr-4">
                        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                        </svg>
                      </div>
                      <div>
                        <span className="text-gray-200 font-semibold text-lg">3. Touchez votre commission</span>
                        <p className="text-gray-400 mt-2">Dès que le client signe, vous recevez automatiquement 30% de commission sur le montant de la vente.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-gray-900/50 backdrop-blur-sm p-8 rounded-lg border border-gray-800">
                  <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-6">
                    Nos Résultats
                  </h3>
                  <div className="space-y-8">
                    <div className="flex items-center">
                      <div className="h-16 w-32 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mr-6">
                        <span className="text-white text-2xl font-bold">98%</span>
                      </div>
                      <div>
                        <span className="text-gray-200 font-semibold text-lg">Taux de Satisfaction</span>
                        <p className="text-gray-400 mt-1">Parmi nos apprenants recommandent nos formations et ont atteint leurs objectifs professionnels</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="h-16 w-32 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mr-6">
                        <span className="text-white text-2xl font-bold">5000+</span>
                      </div>
                      <div>
                        <span className="text-gray-200 font-semibold text-lg">Professionnels Formés</span>
                        <p className="text-gray-400 mt-1">Depuis le lancement de nos programmes, avec des résultats concrets et mesurables</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="h-16 w-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mr-6">
                        <span className="text-white text-2xl font-bold">15+</span>
                      </div>
                      <div>
                        <span className="text-gray-200 font-semibold text-lg">Années d'Expertise</span>
                        <p className="text-gray-400 mt-1">Dans la formation professionnelle, avec une méthodologie éprouvée et en constante évolution</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-16 text-center"
            >
              <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-6">
                Prêt à Transformer Votre Carrière ?
              </h3>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Rejoignez des milliers de professionnels qui ont déjà transformé leur carrière avec nos formations
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <a
                  href="#methodologie"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-lg font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
                >
                  En savoir plus
                  <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Ajout d'une nouvelle section après les cartes de formation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-24 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 blur-3xl"></div>
          <div className="relative">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
                Devenez un Expert en Vente
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Découvrez notre méthodologie unique pour maîtriser l'art de la vente
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-gray-900/50 backdrop-blur-sm p-8 rounded-lg border border-gray-800">
                  <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-6">
                    Notre Méthodologie de Vente
                  </h3>
                  <ul className="space-y-6">
                    <li className="flex items-start">
                      <div className="h-12 w-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mr-4">
                        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <span className="text-gray-200 font-semibold text-lg">Techniques de Prospection</span>
                        <p className="text-gray-400 mt-2">Apprenez à identifier et qualifier vos prospects, à établir un premier contact efficace et à construire une relation de confiance.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="h-12 w-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mr-4">
                        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <div>
                        <span className="text-gray-200 font-semibold text-lg">Négociation Avancée</span>
                        <p className="text-gray-400 mt-2">Maîtrisez les techniques de négociation, la gestion des objections et l'art de conclure une vente avec succès.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="h-12 w-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mr-4">
                        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                        </svg>
                      </div>
                      <div>
                        <span className="text-gray-200 font-semibold text-lg">Gestion de la Relation Client</span>
                        <p className="text-gray-400 mt-2">Développez des relations durables avec vos clients, fidélisez votre portefeuille et maximisez vos opportunités de vente.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-gray-900/50 backdrop-blur-sm p-8 rounded-lg border border-gray-800">
                  <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-6">
                    Outils et Ressources
                  </h3>
                  <ul className="space-y-6">
                    <li className="flex items-start">
                      <div className="h-12 w-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mr-4">
                        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <span className="text-gray-200 font-semibold text-lg">Templates de Vente</span>
                        <p className="text-gray-400 mt-2">Accédez à des modèles de scripts de vente, d'emails et de présentations professionnelles.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="h-12 w-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mr-4">
                        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <div>
                        <span className="text-gray-200 font-semibold text-lg">Outils d'Analyse</span>
                        <p className="text-gray-400 mt-2">Utilisez des outils d'analyse de performance et de suivi de vos activités commerciales.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="h-12 w-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mr-4">
                        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                        </svg>
                      </div>
                      <div>
                        <span className="text-gray-200 font-semibold text-lg">Ressources Pédagogiques</span>
                        <p className="text-gray-400 mt-2">Bénéficiez de vidéos, études de cas et exercices pratiques pour renforcer votre apprentissage.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Formations 