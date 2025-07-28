import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { List, Play, Volume2, CheckCircle, XCircle, Star, RotateCcw } from 'lucide-react'

const Vocabulary = () => {
  const [selectedCategory, setSelectedCategory] = useState(0)
  const [currentMode, setCurrentMode] = useState('learn') // 'learn' or 'quiz'
  const [currentWord, setCurrentWord] = useState(0)
  const [showTranslation, setShowTranslation] = useState(false)
  const [userAnswer, setUserAnswer] = useState('')
  const [score, setScore] = useState(0)
  const [attempts, setAttempts] = useState(0)

  const categories = [
    {
      name: "Vie quotidienne",
      color: "bg-blue-500",
      words: [
        { english: "breakfast", french: "petit-déjeuner", example: "I have breakfast at 8 AM", difficulty: "easy" },
        { english: "appointment", french: "rendez-vous", example: "I have an appointment with the doctor", difficulty: "medium" },
        { english: "grocery", french: "épicerie", example: "I need to go to the grocery store", difficulty: "easy" },
        { english: "laundry", french: "lessive", example: "I do the laundry every weekend", difficulty: "medium" }
      ]
    },
    {
      name: "Travail",
      color: "bg-green-500",
      words: [
        { english: "colleague", french: "collègue", example: "My colleague helped me with the project", difficulty: "easy" },
        { english: "deadline", french: "échéance", example: "The deadline for this project is Friday", difficulty: "medium" },
        { english: "presentation", french: "présentation", example: "I have to give a presentation tomorrow", difficulty: "easy" },
        { english: "achievement", french: "réalisation", example: "This is a great achievement for our team", difficulty: "hard" }
      ]
    },
    {
      name: "Voyage",
      color: "bg-purple-500",
      words: [
        { english: "luggage", french: "bagages", example: "Don't forget your luggage at the airport", difficulty: "easy" },
        { english: "itinerary", french: "itinéraire", example: "Our travel itinerary includes three cities", difficulty: "hard" },
        { english: "accommodation", french: "hébergement", example: "We need to book accommodation for our trip", difficulty: "medium" },
        { english: "destination", french: "destination", example: "Paris is our final destination", difficulty: "easy" }
      ]
    }
  ]

  const currentCategory = categories[selectedCategory]
  const currentWordData = currentCategory.words[currentWord]

  const nextWord = () => {
    setCurrentWord((prev) => (prev + 1) % currentCategory.words.length)
    setShowTranslation(false)
    setUserAnswer('')
  }

  const checkAnswer = () => {
    const isCorrect = userAnswer.toLowerCase().trim() === currentWordData.french.toLowerCase()
    setAttempts(attempts + 1)
    if (isCorrect) setScore(score + 1)
    setShowTranslation(true)
  }

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'easy': return 'bg-green-100 text-green-700'
      case 'medium': return 'bg-yellow-100 text-yellow-700'
      case 'hard': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const speakWord = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'en-US'
      speechSynthesis.speak(utterance)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* En-tête */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
          <List className="w-8 h-8 text-primary-600" />
          Vocabulaire Anglais
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Enrichissez votre vocabulaire avec des mots organisés par thème et des exercices de mémorisation.
        </p>
      </motion.div>

      {/* Sélection de mode */}
      <div className="flex justify-center">
        <div className="bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setCurrentMode('learn')}
            className={`px-4 py-2 rounded-md transition-colors ${
              currentMode === 'learn' ? 'bg-white shadow-sm text-primary-600' : 'text-gray-600'
            }`}
          >
            Apprendre
          </button>
          <button
            onClick={() => setCurrentMode('quiz')}
            className={`px-4 py-2 rounded-md transition-colors ${
              currentMode === 'quiz' ? 'bg-white shadow-sm text-primary-600' : 'text-gray-600'
            }`}
          >
            Quiz
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Catégories */}
        <div className="lg:col-span-1">
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Catégories</h2>
            <div className="space-y-3">
              {categories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedCategory(index)
                    setCurrentWord(0)
                    setShowTranslation(false)
                    setUserAnswer('')
                  }}
                  className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                    selectedCategory === index
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-primary-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full ${category.color}`} />
                    <span className="font-medium text-gray-900">{category.name}</span>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {category.words.length} mots
                  </div>
                </button>
              ))}
            </div>
          </div>

          {currentMode === 'quiz' && (
            <div className="card mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Score</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Correct</span>
                  <span className="font-medium">{score}/{attempts}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Précision</span>
                  <span className="font-medium">
                    {attempts > 0 ? Math.round((score / attempts) * 100) : 0}%
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Zone principale */}
        <div className="lg:col-span-3">
          <div className="card">
            {currentMode === 'learn' ? (
              // Mode apprentissage
              <div className="text-center">
                <div className="mb-6">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(currentWordData.difficulty)}`}>
                      {currentWordData.difficulty === 'easy' ? 'Facile' : 
                       currentWordData.difficulty === 'medium' ? 'Moyen' : 'Difficile'}
                    </span>
                    <span className="text-sm text-gray-600">
                      {currentWord + 1}/{currentCategory.words.length}
                    </span>
                  </div>
                  
                  <div className="bg-primary-50 p-8 rounded-xl border-2 border-primary-200 mb-6">
                    <div className="text-4xl font-bold text-primary-600 mb-4">
                      {currentWordData.english}
                    </div>
                    <button
                      onClick={() => speakWord(currentWordData.english)}
                      className="btn-secondary flex items-center gap-2 mx-auto"
                    >
                      <Volume2 className="w-4 h-4" />
                      Écouter
                    </button>
                  </div>

                  <div className="mb-6">
                    <button
                      onClick={() => setShowTranslation(!showTranslation)}
                      className="btn-primary"
                    >
                      {showTranslation ? 'Masquer' : 'Voir'} la traduction
                    </button>
                  </div>

                  {showTranslation && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      <div className="text-2xl font-semibold text-gray-800">
                        {currentWordData.french}
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-gray-700 italic">
                          "{currentWordData.example}"
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>

                <button
                  onClick={nextWord}
                  className="btn-primary flex items-center gap-2 mx-auto"
                >
                  Mot suivant
                  <Play className="w-4 h-4" />
                </button>
              </div>
            ) : (
              // Mode quiz
              <div>
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(currentWordData.difficulty)}`}>
                      {currentWordData.difficulty === 'easy' ? 'Facile' : 
                       currentWordData.difficulty === 'medium' ? 'Moyen' : 'Difficile'}
                    </span>
                    <span className="text-sm text-gray-600">
                      {currentWord + 1}/{currentCategory.words.length}
                    </span>
                  </div>

                  <div className="bg-blue-50 p-8 rounded-xl border-2 border-blue-200 mb-6">
                    <div className="text-3xl font-bold text-blue-600 mb-4">
                      {currentWordData.english}
                    </div>
                    <button
                      onClick={() => speakWord(currentWordData.english)}
                      className="btn-secondary flex items-center gap-2 mx-auto"
                    >
                      <Volume2 className="w-4 h-4" />
                      Écouter
                    </button>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Traduction en français :
                    </label>
                    <input
                      type="text"
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      placeholder="Tapez la traduction..."
                      className="input-field text-lg max-w-md mx-auto"
                      disabled={showTranslation}
                      onKeyPress={(e) => e.key === 'Enter' && !showTranslation && userAnswer.trim() && checkAnswer()}
                    />
                  </div>

                  {showTranslation && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-6"
                    >
                      <div className={`p-4 rounded-lg border-2 ${
                        userAnswer.toLowerCase().trim() === currentWordData.french.toLowerCase()
                          ? 'bg-green-50 border-green-200'
                          : 'bg-red-50 border-red-200'
                      }`}>
                        <div className="flex items-center justify-center gap-3 mb-3">
                          {userAnswer.toLowerCase().trim() === currentWordData.french.toLowerCase() ? (
                            <CheckCircle className="w-6 h-6 text-green-600" />
                          ) : (
                            <XCircle className="w-6 h-6 text-red-600" />
                          )}
                          <span className={`font-semibold ${
                            userAnswer.toLowerCase().trim() === currentWordData.french.toLowerCase()
                              ? 'text-green-800' : 'text-red-800'
                          }`}>
                            {userAnswer.toLowerCase().trim() === currentWordData.french.toLowerCase() 
                              ? 'Correct !' : 'Incorrect'}
                          </span>
                        </div>
                        <div className="text-lg font-medium text-gray-800 mb-2">
                          Réponse : {currentWordData.french}
                        </div>
                        <div className="bg-white p-3 rounded text-gray-700 italic">
                          "{currentWordData.example}"
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div className="flex justify-center gap-3">
                    {!showTranslation ? (
                      <button
                        onClick={checkAnswer}
                        disabled={!userAnswer.trim()}
                        className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Vérifier
                      </button>
                    ) : (
                      <button
                        onClick={nextWord}
                        className="btn-primary flex items-center gap-2"
                      >
                        Mot suivant
                        <Play className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Liste des mots */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-900 mb-3">
                Mots de la catégorie "{currentCategory.name}" :
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {currentCategory.words.map((word, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentWord(index)}
                    className={`p-2 rounded-lg text-sm transition-colors text-left ${
                      currentWord === index
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <div className="font-medium">{word.english}</div>
                    <div className="text-xs opacity-75">{word.french}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Vocabulary