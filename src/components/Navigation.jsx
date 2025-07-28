import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Home, 
  BookOpen, 
  Languages, 
  List, 
  HelpCircle, 
  PenTool, 
  TrendingUp,
  User,
  Award,
  Flame
} from 'lucide-react'

const Navigation = ({ user }) => {
  const location = useLocation()

  const navItems = [
    { path: '/', icon: Home, label: 'Accueil' },
    { path: '/grammar', icon: BookOpen, label: 'Grammaire' },
    { path: '/verbs', icon: Languages, label: 'Verbes' },
    { path: '/vocabulary', icon: List, label: 'Vocabulaire' },
    { path: '/quiz', icon: HelpCircle, label: 'Quiz' },
    { path: '/correction', icon: PenTool, label: 'Correction' },
    { path: '/progress', icon: TrendingUp, label: 'Progrès' },
  ]

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-800">English Trainer</span>
          </Link>

          {/* Navigation principale */}
          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2 ${
                    isActive 
                      ? 'text-primary-600 bg-primary-50' 
                      : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-primary-100 rounded-lg -z-10"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              )
            })}
          </div>

          {/* Informations utilisateur */}
          <div className="flex items-center space-x-4">
            {/* Points et streak */}
            <div className="hidden sm:flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1 text-yellow-600">
                <Award className="w-4 h-4" />
                <span className="font-medium">{user.points}</span>
              </div>
              <div className="flex items-center space-x-1 text-orange-600">
                <Flame className="w-4 h-4" />
                <span className="font-medium">{user.streak} jours</span>
              </div>
            </div>

            {/* Profil utilisateur */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="hidden sm:block">
                <div className="text-sm font-medium text-gray-800">{user.name}</div>
                <div className="text-xs text-gray-500">{user.level}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation mobile */}
        <div className="md:hidden border-t border-gray-200">
          <div className="flex overflow-x-auto py-2 space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex-shrink-0 px-3 py-2 rounded-lg transition-colors duration-200 flex flex-col items-center space-y-1 min-w-[70px] ${
                    isActive 
                      ? 'text-primary-600 bg-primary-50' 
                      : 'text-gray-600 hover:text-primary-600'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-xs font-medium">{item.label}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation