import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  BookOpen, 
  CheckCircle, 
  XCircle, 
  ArrowRight, 
  RotateCcw,
  Star,
  Trophy,
  Target
} from 'lucide-react'

const Grammar = () => {
  const [currentTopic, setCurrentTopic] = useState(0)
  const [currentExercise, setCurrentExercise] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [completedExercises, setCompletedExercises] = useState([])

  const grammarTopics = [
    {
      id: 1,
      title: "Present Perfect vs Past Simple",
      description: "Apprenez à distinguer ces deux temps essentiels",
      difficulty: "Intermédiaire",
      exercises: [
        {
          question: "I _____ to London three times this year.",
          options: ["went", "have gone", "have been", "was going"],
          correct: 2,
          explanation: "On utilise 'have been' avec le Present Perfect pour indiquer une expérience répétée dans une période qui continue jusqu'au présent."
        },
        {
          question: "She _____ her homework yesterday evening.",
          options: ["has finished", "finished", "have finished", "was finishing"],
          correct: 1,
          explanation: "On utilise le Past Simple avec 'yesterday' car c'est un moment précis du passé."
        },
        {
          question: "They _____ here since 2019.",
          options: ["live", "lived", "have lived", "are living"],
          correct: 2,
          explanation: "Avec 'since', on utilise le Present Perfect pour une action qui a commencé dans le passé et continue."
        }
      ]
    },
    {
      id: 2,
      title: "Articles (a, an, the)",
      description: "Maîtrisez l'usage des articles en anglais",
      difficulty: "Débutant",
      exercises: [
        {
          question: "I saw _____ elephant at _____ zoo yesterday.",
          options: ["a / the", "an / the", "the / a", "an / a"],
          correct: 1,
          explanation: "'Elephant' commence par une voyelle donc 'an', et 'zoo' est spécifique donc 'the'."
        },
        {
          question: "_____ sun rises in _____ east.",
          options: ["A / the", "The / the", "The / an", "A / an"],
          correct: 1,
          explanation: "Le soleil est unique donc 'the sun', et les points cardinaux prennent 'the'."
        }
      ]
    },
    {
      id: 3,
      title: "Conditional Sentences",
      description: "Les phrases conditionnelles (if clauses)",
      difficulty: "Avancé",
      exercises: [
        {
          question: "If I _____ rich, I _____ travel around the world.",
          options: ["am / will", "were / would", "was / will", "would be / will"],
          correct: 1,
          explanation: "Conditionnel irréel du présent : If + past simple, would + infinitif."
        },
        {
          question: "If it _____ tomorrow, we _____ the picnic.",
          options: ["rains / will cancel", "will rain / cancel", "rained / would cancel", "would rain / will cancel"],
          correct: 0,
          explanation: "Conditionnel réel du futur : If + present simple, will + infinitif."
        }
      ]
    }
  ]

  const currentTopicData = grammarTopics[currentTopic]
  const currentExerciseData = currentTopicData.exercises[currentExercise]

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex)
  }

  const submitAnswer = () => {
    setShowResult(true)
    if (selectedAnswer === currentExerciseData.correct) {
      setScore(score + 1)
    }
  }

  const nextExercise = () => {
    if (currentExercise < currentTopicData.exercises.length - 1) {
      setCurrentExercise(currentExercise + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      // Fin du topic
      setCompletedExercises([...completedExercises, currentTopic])
      alert(`Topic terminé ! Score: ${score + (selectedAnswer === currentExerciseData.correct ? 1 : 0)}/${currentTopicData.exercises.length}`)
    }
  }

  const resetExercise = () => {
    setCurrentExercise(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
  }

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Débutant': return 'bg-green-100 text-green-700'
      case 'Intermédiaire': return 'bg-yellow-100 text-yellow-700'
      case 'Avancé': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
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
          <BookOpen className="w-8 h-8 text-primary-600" />
          Exercices de Grammaire
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Perfectionnez votre grammaire anglaise avec des exercices interactifs et des explications détaillées.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sélection des sujets */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-1"
        >
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Sujets</h2>
            <div className="space-y-3">
              {grammarTopics.map((topic, index) => (
                <button
                  key={topic.id}
                  onClick={() => {
                    setCurrentTopic(index)
                    resetExercise()
                  }}
                  className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                    currentTopic === index
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-primary-300 hover:bg-primary-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm text-gray-900">{topic.title}</span>
                    {completedExercises.includes(index) && (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                  <div className="text-xs text-gray-600 mb-2">{topic.description}</div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(topic.difficulty)}`}>
                    {topic.difficulty}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Statistiques */}
          <div className="card mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              Statistiques
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Sujets complétés</span>
                <span className="font-medium">{completedExercises.length}/{grammarTopics.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Score actuel</span>
                <span className="font-medium">{score}/{currentExercise + (showResult ? 1 : 0)}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(completedExercises.length / grammarTopics.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Zone d'exercice */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-3"
        >
          <div className="card">
            {/* En-tête de l'exercice */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{currentTopicData.title}</h2>
                <p className="text-gray-600">{currentTopicData.description}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(currentTopicData.difficulty)}`}>
                  {currentTopicData.difficulty}
                </span>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Target className="w-4 h-4" />
                  {currentExercise + 1}/{currentTopicData.exercises.length}
                </div>
              </div>
            </div>

            {/* Barre de progression */}
            <div className="mb-8">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Progression</span>
                <span>{Math.round(((currentExercise + (showResult ? 1 : 0)) / currentTopicData.exercises.length) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentExercise + (showResult ? 1 : 0)) / currentTopicData.exercises.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-6">
                Complétez la phrase :
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200">
                <p className="text-lg text-gray-800 font-medium leading-relaxed">
                  {currentExerciseData.question}
                </p>
              </div>
            </div>

            {/* Options de réponse */}
            <div className="mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentExerciseData.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => !showResult && handleAnswerSelect(index)}
                    disabled={showResult}
                    className={`quiz-option ${
                      selectedAnswer === index ? 'selected' : ''
                    } ${
                      showResult && index === currentExerciseData.correct ? 'correct' : ''
                    } ${
                      showResult && selectedAnswer === index && index !== currentExerciseData.correct ? 'incorrect' : ''
                    }`}
                  >
                    <span className="font-medium">{String.fromCharCode(65 + index)}.</span>
                    <span className="ml-3">{option}</span>
                    {showResult && index === currentExerciseData.correct && (
                      <CheckCircle className="w-5 h-5 text-green-600 ml-auto" />
                    )}
                    {showResult && selectedAnswer === index && index !== currentExerciseData.correct && (
                      <XCircle className="w-5 h-5 text-red-600 ml-auto" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Explication */}
            {showResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-8"
              >
                <div className={`p-4 rounded-lg border-2 ${
                  selectedAnswer === currentExerciseData.correct
                    ? 'bg-green-50 border-green-200'
                    : 'bg-red-50 border-red-200'
                }`}>
                  <div className="flex items-start gap-3 mb-3">
                    {selectedAnswer === currentExerciseData.correct ? (
                      <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                    )}
                    <div>
                      <h4 className={`font-semibold ${
                        selectedAnswer === currentExerciseData.correct ? 'text-green-800' : 'text-red-800'
                      }`}>
                        {selectedAnswer === currentExerciseData.correct ? 'Correct !' : 'Incorrect'}
                      </h4>
                      <p className={`text-sm ${
                        selectedAnswer === currentExerciseData.correct ? 'text-green-700' : 'text-red-700'
                      }`}>
                        {currentExerciseData.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Boutons d'action */}
            <div className="flex justify-between">
              <button
                onClick={resetExercise}
                className="btn-secondary flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Recommencer
              </button>

              <div className="flex gap-3">
                {!showResult ? (
                  <button
                    onClick={submitAnswer}
                    disabled={selectedAnswer === null}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Valider
                  </button>
                ) : (
                  <button
                    onClick={nextExercise}
                    className="btn-primary flex items-center gap-2"
                  >
                    {currentExercise < currentTopicData.exercises.length - 1 ? 'Suivant' : 'Terminer'}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Grammar