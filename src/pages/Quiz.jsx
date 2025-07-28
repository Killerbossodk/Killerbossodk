import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { HelpCircle, CheckCircle, XCircle, Trophy, RotateCcw, Target } from 'lucide-react'

const Quiz = () => {
  const [currentQuiz, setCurrentQuiz] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)

  const quizzes = [
    {
      title: "Quiz Général - Niveau Débutant",
      description: "Testez vos connaissances de base en anglais",
      difficulty: "Débutant",
      questions: [
        {
          question: "What is the past tense of 'go'?",
          options: ["goed", "went", "gone", "going"],
          correct: 1,
          explanation: "Le passé simple de 'go' est 'went'. C'est un verbe irrégulier."
        },
        {
          question: "Choose the correct article: I saw ___ elephant.",
          options: ["a", "an", "the", "no article"],
          correct: 1,
          explanation: "'Elephant' commence par une voyelle, donc on utilise 'an'."
        },
        {
          question: "What does 'beautiful' mean in French?",
          options: ["grand", "petit", "beau/belle", "rapide"],
          correct: 2,
          explanation: "'Beautiful' signifie 'beau' ou 'belle' en français."
        }
      ]
    },
    {
      title: "Quiz Grammaire - Niveau Intermédiaire",
      description: "Perfectionnez votre grammaire anglaise",
      difficulty: "Intermédiaire",
      questions: [
        {
          question: "I ___ in London for three years.",
          options: ["live", "lived", "have lived", "am living"],
          correct: 2,
          explanation: "Avec 'for three years', on utilise le Present Perfect pour une durée qui continue."
        },
        {
          question: "If I ___ rich, I would travel the world.",
          options: ["am", "was", "were", "would be"],
          correct: 2,
          explanation: "Dans les conditionnels irréels, on utilise 'were' pour toutes les personnes après 'if'."
        },
        {
          question: "The book ___ by millions of people.",
          options: ["reads", "is read", "has read", "was reading"],
          correct: 1,
          explanation: "Forme passive au présent : 'is read' (est lu)."
        }
      ]
    },
    {
      title: "Quiz Vocabulaire - Professionnel",
      description: "Vocabulaire du monde du travail",
      difficulty: "Avancé",
      questions: [
        {
          question: "What does 'deadline' mean?",
          options: ["réunion", "échéance", "promotion", "démission"],
          correct: 1,
          explanation: "'Deadline' signifie 'échéance' ou 'date limite'."
        },
        {
          question: "A 'colleague' is:",
          options: ["un patron", "un client", "un collègue", "un concurrent"],
          correct: 2,
          explanation: "'Colleague' signifie 'collègue' en français."
        },
        {
          question: "To 'achieve' means:",
          options: ["échouer", "commencer", "réaliser/atteindre", "reporter"],
          correct: 2,
          explanation: "'To achieve' signifie 'réaliser' ou 'atteindre' un objectif."
        }
      ]
    }
  ]

  const currentQuizData = quizzes[currentQuiz]
  const currentQuestionData = currentQuizData.questions[currentQuestion]

  const handleAnswerSelect = (answerIndex) => {
    if (!showResult) {
      setSelectedAnswer(answerIndex)
    }
  }

  const submitAnswer = () => {
    setShowResult(true)
    if (selectedAnswer === currentQuestionData.correct) {
      setScore(score + 1)
    }
  }

  const nextQuestion = () => {
    if (currentQuestion < currentQuizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      setQuizCompleted(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setQuizCompleted(false)
  }

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Débutant': return 'bg-green-100 text-green-700'
      case 'Intermédiaire': return 'bg-yellow-100 text-yellow-700'
      case 'Avancé': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getScoreColor = (percentage) => {
    if (percentage >= 80) return 'text-green-600'
    if (percentage >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  if (quizCompleted) {
    const percentage = Math.round((score / currentQuizData.questions.length) * 100)
    
    return (
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="card text-center"
        >
          <div className="mb-6">
            <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Quiz Terminé !</h1>
            <p className="text-gray-600">{currentQuizData.title}</p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <div className={`text-4xl font-bold mb-2 ${getScoreColor(percentage)}`}>
              {score}/{currentQuizData.questions.length}
            </div>
            <div className={`text-2xl font-semibold mb-4 ${getScoreColor(percentage)}`}>
              {percentage}%
            </div>
            <div className="text-gray-600">
              {percentage >= 80 ? 'Excellent travail !' :
               percentage >= 60 ? 'Bien joué !' :
               'Continuez à vous entraîner !'}
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={resetQuiz}
              className="btn-secondary flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Recommencer
            </button>
            <button
              onClick={() => {
                setCurrentQuiz((prev) => (prev + 1) % quizzes.length)
                resetQuiz()
              }}
              className="btn-primary"
            >
              Quiz suivant
            </button>
          </div>
        </motion.div>
      </div>
    )
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
          <HelpCircle className="w-8 h-8 text-primary-600" />
          Quiz Anglais
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Testez vos connaissances avec des quiz variés adaptés à votre niveau.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sélection des quiz */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-1"
        >
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quiz disponibles</h2>
            <div className="space-y-3">
              {quizzes.map((quiz, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentQuiz(index)
                    resetQuiz()
                  }}
                  className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                    currentQuiz === index
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-primary-300'
                  }`}
                >
                  <div className="font-medium text-sm text-gray-900 mb-2">{quiz.title}</div>
                  <div className="text-xs text-gray-600 mb-2">{quiz.description}</div>
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(quiz.difficulty)}`}>
                      {quiz.difficulty}
                    </span>
                    <span className="text-xs text-gray-500">{quiz.questions.length} questions</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Progression */}
          <div className="card mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Target className="w-5 h-5" />
              Progression
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Question</span>
                <span className="font-medium">{currentQuestion + 1}/{currentQuizData.questions.length}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / currentQuizData.questions.length) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Score actuel</span>
                <span className="font-medium">{score}/{currentQuestion + (showResult ? 1 : 0)}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Zone de question */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-3"
        >
          <div className="card">
            {/* En-tête du quiz */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{currentQuizData.title}</h2>
                <p className="text-gray-600">{currentQuizData.description}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(currentQuizData.difficulty)}`}>
                {currentQuizData.difficulty}
              </span>
            </div>

            {/* Question */}
            <div className="mb-8">
              <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200 mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Question {currentQuestion + 1}
                </h3>
                <p className="text-xl text-gray-800">{currentQuestionData.question}</p>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentQuestionData.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showResult}
                    className={`quiz-option ${
                      selectedAnswer === index ? 'selected' : ''
                    } ${
                      showResult && index === currentQuestionData.correct ? 'correct' : ''
                    } ${
                      showResult && selectedAnswer === index && index !== currentQuestionData.correct ? 'incorrect' : ''
                    }`}
                  >
                    <span className="font-medium">{String.fromCharCode(65 + index)}.</span>
                    <span className="ml-3">{option}</span>
                    {showResult && index === currentQuestionData.correct && (
                      <CheckCircle className="w-5 h-5 text-green-600 ml-auto" />
                    )}
                    {showResult && selectedAnswer === index && index !== currentQuestionData.correct && (
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
                  selectedAnswer === currentQuestionData.correct
                    ? 'bg-green-50 border-green-200'
                    : 'bg-red-50 border-red-200'
                }`}>
                  <div className="flex items-start gap-3">
                    {selectedAnswer === currentQuestionData.correct ? (
                      <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                    )}
                    <div>
                      <h4 className={`font-semibold mb-2 ${
                        selectedAnswer === currentQuestionData.correct ? 'text-green-800' : 'text-red-800'
                      }`}>
                        {selectedAnswer === currentQuestionData.correct ? 'Correct !' : 'Incorrect'}
                      </h4>
                      <p className="text-sm text-gray-700">
                        {currentQuestionData.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Actions */}
            <div className="flex justify-between">
              <button
                onClick={resetQuiz}
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
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Valider
                  </button>
                ) : (
                  <button
                    onClick={nextQuestion}
                    className="btn-primary"
                  >
                    {currentQuestion < currentQuizData.questions.length - 1 ? 'Question suivante' : 'Terminer'}
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

export default Quiz