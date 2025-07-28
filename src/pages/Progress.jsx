import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Calendar, Award, Target, Clock, BookOpen, Star, Flame } from 'lucide-react'

const Progress = ({ user }) => {
  const stats = {
    totalTime: 48, // heures
    exercisesCompleted: 127,
    currentStreak: user.streak,
    averageScore: 85,
    wordsLearned: 245,
    grammarTopics: 8
  }

  const weeklyProgress = [
    { day: 'Lun', exercises: 5, time: 25 },
    { day: 'Mar', exercises: 8, time: 40 },
    { day: 'Mer', exercises: 3, time: 15 },
    { day: 'Jeu', exercises: 6, time: 30 },
    { day: 'Ven', exercises: 9, time: 45 },
    { day: 'Sam', exercises: 4, time: 20 },
    { day: 'Dim', exercises: 7, time: 35 }
  ]

  const achievements = [
    { title: "Premier pas", description: "Complétez votre premier exercice", unlocked: true, icon: Target },
    { title: "Série de 7", description: "Maintenez une série de 7 jours", unlocked: true, icon: Flame },
    { title: "Grammairien", description: "Terminez 5 sujets de grammaire", unlocked: true, icon: BookOpen },
    { title: "Vocabulaire riche", description: "Apprenez 100 nouveaux mots", unlocked: true, icon: Star },
    { title: "Quiz master", description: "Obtenez 90% à un quiz", unlocked: false, icon: Award },
    { title: "Perfectionniste", description: "Série de 30 jours", unlocked: false, icon: Calendar }
  ]

  const skillLevels = [
    { skill: "Grammaire", level: 75, color: "bg-blue-500" },
    { skill: "Vocabulaire", level: 85, color: "bg-green-500" },
    { skill: "Conjugaison", level: 60, color: "bg-purple-500" },
    { skill: "Compréhension", level: 70, color: "bg-orange-500" }
  ]

  const maxExercises = Math.max(...weeklyProgress.map(d => d.exercises))
  const maxTime = Math.max(...weeklyProgress.map(d => d.time))

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* En-tête */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
          <TrendingUp className="w-8 h-8 text-primary-600" />
          Vos Progrès
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Suivez votre évolution et célébrez vos réussites dans l'apprentissage de l'anglais.
        </p>
      </motion.div>

      {/* Statistiques principales */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
      >
        <div className="card text-center">
          <Clock className="w-8 h-8 text-blue-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{stats.totalTime}h</div>
          <div className="text-sm text-gray-600">Temps total</div>
        </div>
        <div className="card text-center">
          <Target className="w-8 h-8 text-green-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{stats.exercisesCompleted}</div>
          <div className="text-sm text-gray-600">Exercices</div>
        </div>
        <div className="card text-center">
          <Flame className="w-8 h-8 text-orange-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{stats.currentStreak}</div>
          <div className="text-sm text-gray-600">Jours consécutifs</div>
        </div>
        <div className="card text-center">
          <Award className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{stats.averageScore}%</div>
          <div className="text-sm text-gray-600">Score moyen</div>
        </div>
        <div className="card text-center">
          <BookOpen className="w-8 h-8 text-purple-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{stats.wordsLearned}</div>
          <div className="text-sm text-gray-600">Mots appris</div>
        </div>
        <div className="card text-center">
          <Star className="w-8 h-8 text-indigo-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{stats.grammarTopics}</div>
          <div className="text-sm text-gray-600">Sujets maîtrisés</div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Activité hebdomadaire */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="card"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Activité de la semaine
          </h2>
          
          <div className="space-y-4">
            {weeklyProgress.map((day, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-12 text-sm font-medium text-gray-600">{day.day}</div>
                
                {/* Exercices */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500">Exercices</span>
                    <span className="text-xs font-medium">{day.exercises}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(day.exercises / maxExercises) * 100}%` }}
                    />
                  </div>
                </div>
                
                {/* Temps */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500">Temps (min)</span>
                    <span className="text-xs font-medium">{day.time}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(day.time / maxTime) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Niveaux de compétence */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="card"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Niveaux de compétence
          </h2>
          
          <div className="space-y-6">
            {skillLevels.map((skill, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">{skill.skill}</span>
                  <span className="text-sm font-semibold text-gray-600">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    className={`${skill.color} h-3 rounded-full transition-all duration-300`}
                  />
                </div>
                <div className="mt-1 text-xs text-gray-500">
                  {skill.level >= 80 ? 'Excellent' : 
                   skill.level >= 60 ? 'Bon niveau' : 
                   skill.level >= 40 ? 'En progression' : 'À améliorer'}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Réalisations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="card"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <Award className="w-5 h-5" />
          Réalisations
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon
            return (
              <div
                key={index}
                className={`p-4 rounded-lg border-2 transition-all ${
                  achievement.unlocked
                    ? 'border-yellow-200 bg-yellow-50'
                    : 'border-gray-200 bg-gray-50 opacity-60'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Icon className={`w-6 h-6 ${
                    achievement.unlocked ? 'text-yellow-600' : 'text-gray-400'
                  }`} />
                  <span className={`font-medium ${
                    achievement.unlocked ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {achievement.title}
                  </span>
                </div>
                <p className={`text-sm ${
                  achievement.unlocked ? 'text-gray-700' : 'text-gray-500'
                }`}>
                  {achievement.description}
                </p>
                {achievement.unlocked && (
                  <div className="mt-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Débloqué
                    </span>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </motion.div>

      {/* Objectifs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="card bg-gradient-to-r from-primary-500 to-primary-600 text-white"
      >
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Target className="w-5 h-5" />
          Objectifs de la semaine
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white bg-opacity-20 p-4 rounded-lg">
            <div className="text-2xl font-bold mb-1">5/7</div>
            <div className="text-sm text-primary-100">Jours d'activité</div>
            <div className="w-full bg-white bg-opacity-20 rounded-full h-2 mt-2">
              <div className="bg-white h-2 rounded-full" style={{ width: '71%' }} />
            </div>
          </div>
          
          <div className="bg-white bg-opacity-20 p-4 rounded-lg">
            <div className="text-2xl font-bold mb-1">42/50</div>
            <div className="text-sm text-primary-100">Exercices</div>
            <div className="w-full bg-white bg-opacity-20 rounded-full h-2 mt-2">
              <div className="bg-white h-2 rounded-full" style={{ width: '84%' }} />
            </div>
          </div>
          
          <div className="bg-white bg-opacity-20 p-4 rounded-lg">
            <div className="text-2xl font-bold mb-1">18/25</div>
            <div className="text-sm text-primary-100">Nouveaux mots</div>
            <div className="w-full bg-white bg-opacity-20 rounded-full h-2 mt-2">
              <div className="bg-white h-2 rounded-full" style={{ width: '72%' }} />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Progress