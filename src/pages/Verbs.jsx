import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Languages, 
  CheckCircle, 
  XCircle, 
  RotateCcw,
  Clock,
  BookOpen,
  Target
} from 'lucide-react'

const Verbs = () => {
  const [selectedTense, setSelectedTense] = useState(0)
  const [currentVerb, setCurrentVerb] = useState(0)
  const [userAnswer, setUserAnswer] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [attempts, setAttempts] = useState(0)

  const tenses = [
    {
      name: "Present Simple",
      description: "Actions habituelles et vérités générales",
      example: "I work every day",
      color: "bg-blue-500"
    },
    {
      name: "Past Simple",
      description: "Actions terminées dans le passé",
      example: "I worked yesterday",
      color: "bg-green-500"
    },
    {
      name: "Present Perfect",
      description: "Actions liées au présent",
      example: "I have worked here for 2 years",
      color: "bg-purple-500"
    },
    {
      name: "Future Simple",
      description: "Actions futures",
      example: "I will work tomorrow",
      color: "bg-orange-500"
    }
  ]

  const verbs = [
    {
      infinitive: "work",
      translation: "travailler",
      regular: true,
      forms: {
        "Present Simple": ["work", "works"],
        "Past Simple": ["worked", "worked"],
        "Present Perfect": ["have worked", "has worked"],
        "Future Simple": ["will work", "will work"]
      }
    },
    {
      infinitive: "go",
      translation: "aller",
      regular: false,
      forms: {
        "Present Simple": ["go", "goes"],
        "Past Simple": ["went", "went"],
        "Present Perfect": ["have gone", "has gone"],
        "Future Simple": ["will go", "will go"]
      }
    },
    {
      infinitive: "eat",
      translation: "manger",
      regular: false,
      forms: {
        "Present Simple": ["eat", "eats"],
        "Past Simple": ["ate", "ate"],
        "Present Perfect": ["have eaten", "has eaten"],
        "Future Simple": ["will eat", "will eat"]
      }
    },
    {
      infinitive: "study",
      translation: "étudier",
      regular: true,
      forms: {
        "Present Simple": ["study", "studies"],
        "Past Simple": ["studied", "studied"],
        "Present Perfect": ["have studied", "has studied"],
        "Future Simple": ["will study", "will study"]
      }
    },
    {
      infinitive: "be",
      translation: "être",
      regular: false,
      forms: {
        "Present Simple": ["am/is/are", "am/is/are"],
        "Past Simple": ["was/were", "was/were"],
        "Present Perfect": ["have been", "has been"],
        "Future Simple": ["will be", "will be"]
      }
    }
  ]

  const subjects = ["I", "He/She/It"]
  const currentTenseData = tenses[selectedTense]
  const currentVerbData = verbs[currentVerb]
  const currentSubject = Math.floor(Math.random() * 2)

  const checkAnswer = () => {
    const correctAnswer = currentVerbData.forms[currentTenseData.name][currentSubject]
    const isCorrect = userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase()
    
    setShowResult(true)
    setAttempts(attempts + 1)
    
    if (isCorrect) {
      setScore(score + 1)
    }
  }

  const nextVerb = () => {
    setCurrentVerb((prev) => (prev + 1) % verbs.length)
    setUserAnswer('')
    setShowResult(false)
  }

  const resetExercise = () => {
    setCurrentVerb(0)
    setUserAnswer('')
    setShowResult(false)
    setScore(0)
    setAttempts(0)
  }

  const getHint = () => {
    const correctAnswer = currentVerbData.forms[currentTenseData.name][currentSubject]
    return `Indice: La réponse commence par "${correctAnswer.charAt(0).toUpperCase()}"`
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
          <Languages className="w-8 h-8 text-primary-600" />
          Conjugaison des Verbes
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Maîtrisez la conjugaison des verbes anglais avec des exercices pratiques sur tous les temps.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sélection des temps */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-1"
        >
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Temps verbaux
            </h2>
            <div className="space-y-3">
              {tenses.map((tense, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedTense(index)
                    resetExercise()
                  }}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                    selectedTense === index
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-primary-300 hover:bg-primary-50'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-3 h-3 rounded-full ${tense.color}`} />
                    <span className="font-medium text-gray-900">{tense.name}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{tense.description}</p>
                  <p className="text-xs text-primary-600 font-medium">{tense.example}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Statistiques */}
          <div className="card mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-yellow-500" />
              Statistiques
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Score</span>
                <span className="font-medium">{score}/{attempts}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Précision</span>
                <span className="font-medium">
                  {attempts > 0 ? Math.round((score / attempts) * 100) : 0}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${attempts > 0 ? (score / attempts) * 100 : 0}%` }}
                />
              </div>
            </div>
          </div>

          {/* Tableau de conjugaison */}
          <div className="card mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Référence
            </h3>
            <div className="space-y-2 text-sm">
              <div className="font-medium text-gray-900">{currentVerbData.infinitive} ({currentVerbData.translation})</div>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-600">I:</span>
                  <span className="font-medium">{currentVerbData.forms[currentTenseData.name][0]}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">He/She/It:</span>
                  <span className="font-medium">{currentVerbData.forms[currentTenseData.name][1]}</span>
                </div>
              </div>
              <div className={`text-xs px-2 py-1 rounded ${
                currentVerbData.regular ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {currentVerbData.regular ? 'Verbe régulier' : 'Verbe irrégulier'}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Zone d'exercice */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <div className="card">
            {/* En-tête de l'exercice */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{currentTenseData.name}</h2>
                <p className="text-gray-600">{currentTenseData.description}</p>
              </div>
              <div className={`w-4 h-4 rounded-full ${currentTenseData.color}`} />
            </div>

            {/* Question */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-6">
                Conjuguez le verbe :
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600 mb-2">
                    {currentVerbData.infinitive}
                  </div>
                  <div className="text-sm text-gray-600">
                    ({currentVerbData.translation})
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
                <p className="text-lg text-gray-800 leading-relaxed">
                  <span className="font-semibold">{subjects[currentSubject]}</span>
                  <span className="mx-2">_______</span>
                  <span className="text-gray-600">every day.</span>
                </p>
              </div>
            </div>

            {/* Zone de réponse */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Votre réponse :
              </label>
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Tapez la forme conjuguée..."
                className="input-field text-lg"
                disabled={showResult}
                onKeyPress={(e) => e.key === 'Enter' && !showResult && userAnswer.trim() && checkAnswer()}
              />
            </div>

            {/* Résultat */}
            {showResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-8"
              >
                <div className={`p-4 rounded-lg border-2 ${
                  userAnswer.toLowerCase().trim() === currentVerbData.forms[currentTenseData.name][currentSubject].toLowerCase()
                    ? 'bg-green-50 border-green-200'
                    : 'bg-red-50 border-red-200'
                }`}>
                  <div className="flex items-start gap-3">
                    {userAnswer.toLowerCase().trim() === currentVerbData.forms[currentTenseData.name][currentSubject].toLowerCase() ? (
                      <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                    )}
                    <div>
                      <h4 className={`font-semibold mb-2 ${
                        userAnswer.toLowerCase().trim() === currentVerbData.forms[currentTenseData.name][currentSubject].toLowerCase() 
                          ? 'text-green-800' : 'text-red-800'
                      }`}>
                        {userAnswer.toLowerCase().trim() === currentVerbData.forms[currentTenseData.name][currentSubject].toLowerCase() 
                          ? 'Correct !' : 'Incorrect'}
                      </h4>
                      <p className="text-sm text-gray-700 mb-2">
                        <span className="font-medium">Réponse correcte :</span> {currentVerbData.forms[currentTenseData.name][currentSubject]}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Phrase complète :</span> {subjects[currentSubject]} {currentVerbData.forms[currentTenseData.name][currentSubject]} every day.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Boutons d'action */}
            <div className="flex justify-between items-center">
              <div className="flex gap-3">
                <button
                  onClick={resetExercise}
                  className="btn-secondary flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Recommencer
                </button>
                {!showResult && (
                  <button
                    onClick={() => alert(getHint())}
                    className="btn-secondary"
                  >
                    Indice
                  </button>
                )}
              </div>

              <div className="flex gap-3">
                {!showResult ? (
                  <button
                    onClick={checkAnswer}
                    disabled={!userAnswer.trim()}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Vérifier
                  </button>
                ) : (
                  <button
                    onClick={nextVerb}
                    className="btn-primary flex items-center gap-2"
                  >
                    Verbe suivant
                    <Languages className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Liste des verbes */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Verbes disponibles :</h4>
              <div className="flex flex-wrap gap-2">
                {verbs.map((verb, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentVerb(index)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      currentVerb === index
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {verb.infinitive}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Verbs