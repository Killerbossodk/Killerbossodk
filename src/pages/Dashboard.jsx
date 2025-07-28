import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  BookOpen, 
  Languages, 
  List, 
  HelpCircle, 
  PenTool, 
  TrendingUp,
  Target,
  Clock,
  Star,
  ChevronRight
} from 'lucide-react'

const Dashboard = ({ user }) => {
  const features = [
    {
      title: 'Grammaire',
      description: 'Maîtrisez les règles grammaticales anglaises',
      icon: BookOpen,
      path: '/grammar',
      color: 'bg-blue-500',
      progress: 75
    },
    {
      title: 'Conjugaison',
      description: 'Entraînez-vous sur les temps verbaux',
      icon: Languages,
      path: '/verbs',
      color: 'bg-green-500',
      progress: 60
    },
    {
      title: 'Vocabulaire',
      description: 'Enrichissez votre lexique anglais',
      icon: List,
      path: '/vocabulary',
      color: 'bg-purple-500',
      progress: 85
    },
    {
      title: 'Quiz',
      description: 'Testez vos connaissances',
      icon: HelpCircle,
      path: '/quiz',
      color: 'bg-orange-500',
      progress: 45
    },
    {
      title: 'Correction de texte',
      description: 'Améliorez votre écriture avec l\'IA',
      icon: PenTool,
      path: '/correction',
      color: 'bg-red-500',
      progress: 30
    },
    {
      title: 'Progrès',
      description: 'Suivez votre évolution',
      icon: TrendingUp,
      path: '/progress',
      color: 'bg-indigo-500',
      progress: 90
    }
  ]

  const stats = [
    { label: 'Exercices complétés', value: '127', icon: Target },
    { label: 'Temps d\'étude', value: '24h', icon: Clock },
    { label: 'Niveau actuel', value: user.level, icon: Star }
  ]

  return (
    <div className="space-y-8">
      {/* En-tête de bienvenue */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Bonjour {user.name} ! 👋
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Continuez votre apprentissage de l'anglais avec des exercices personnalisés
          et un suivi de vos progrès en temps réel.
        </p>
      </motion.div>

      {/* Statistiques rapides */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="card text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg mx-auto mb-4">
                <Icon className="w-6 h-6 text-primary-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          )
        })}
      </motion.div>

      {/* Fonctionnalités principales */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Choisissez votre entraînement</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Link to={feature.path} className="block">
                  <div className="card hover:shadow-xl transition-shadow duration-300 group">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary-600 transition-colors" />
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 mb-4">{feature.description}</p>
                    
                    {/* Barre de progression */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Progression</span>
                        <span className="text-gray-700 font-medium">{feature.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${feature.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Exercice du jour */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="card bg-gradient-to-r from-primary-500 to-primary-600 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-2">Exercice du jour</h3>
            <p className="text-primary-100 mb-4">
              Complétez l'exercice de grammaire sur les temps du passé pour maintenir votre série !
            </p>
            <Link 
              to="/grammar" 
              className="inline-flex items-center px-4 py-2 bg-white text-primary-600 rounded-lg font-medium hover:bg-primary-50 transition-colors"
            >
              Commencer l'exercice
              <ChevronRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <Target className="w-12 h-12 text-white" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Dashboard