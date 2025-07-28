import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { 
  PenTool, 
  CheckCircle, 
  AlertCircle, 
  RefreshCw, 
  Save, 
  FileText,
  Lightbulb,
  BookOpen
} from 'lucide-react'
import axios from 'axios'

const TextCorrection = () => {
  const [text, setText] = useState('')
  const [corrections, setCorrections] = useState([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const [selectedSuggestion, setSelectedSuggestion] = useState(null)
  const textareaRef = useRef(null)

  // Données d'exemple pour la démonstration
  const sampleTexts = [
    {
      title: "Email professionnel",
      content: "Dear Mr. Johnson,\n\nI am writing to you about the meeting we had yesterday. I think that the proposal you presented was very interessting and I would like to discuss it more. Could we schedule another meeting next week?\n\nBest regards,\nJohn"
    },
    {
      title: "Description personnelle",
      content: "My name is Sarah and I am 25 years old. I live in Paris and I work as a teacher. In my free time, I like to reading books and watching movies. I also enjoy to travel and discover new places."
    },
    {
      title: "Récit de voyage",
      content: "Last summer, I went to London for the first time. It was an amazing experience! I visited many famous places like Big Ben, the Tower Bridge, and the British Museum. The weather was quite good, altough it rained a few times."
    }
  ]

  const analyzeText = async () => {
    if (!text.trim()) return

    setIsAnalyzing(true)
    
    try {
      const response = await axios.post('/api/analyze-text', {
        text: text
      })

      if (response.data.success) {
        setCorrections(response.data.corrections)
        setSuggestions(response.data.suggestions)
      } else {
        console.error('Erreur lors de l\'analyse:', response.data.error)
        // Fallback vers la simulation en cas d'erreur
        setTimeout(() => {
          const mockCorrections = [
            {
              id: 1,
              original: "interessting",
              correction: "interesting",
              type: "spelling",
              position: { start: text.toLowerCase().indexOf('interessting'), end: text.toLowerCase().indexOf('interessting') + 'interessting'.length },
              explanation: "Faute d'orthographe : 'interesting' prend deux 's'"
            }
          ]
          setCorrections(mockCorrections)
          setSuggestions([])
        }, 500)
      }
    } catch (error) {
      console.error('Erreur de connexion à l\'API:', error)
      // Fallback vers la simulation en cas d'erreur de connexion
      setTimeout(() => {
        const mockCorrections = []
        const commonMistakes = ['interessting', 'altough', 'I like to reading', 'enjoy to travel']
        
        commonMistakes.forEach((mistake, index) => {
          const position = text.toLowerCase().indexOf(mistake.toLowerCase())
          if (position !== -1) {
            mockCorrections.push({
              id: index + 1,
              original: mistake,
              correction: mistake === 'interessting' ? 'interesting' : 
                        mistake === 'altough' ? 'although' :
                        mistake === 'I like to reading' ? 'I like reading' :
                        'enjoy traveling',
              type: mistake.includes('to') ? 'grammar' : 'spelling',
              position: { start: position, end: position + mistake.length },
              explanation: `Correction suggérée pour "${mistake}"`
            })
          }
        })
        
        setCorrections(mockCorrections)
        setSuggestions([])
      }, 1000)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const applySuggestion = (correction) => {
    const newText = text.substring(0, correction.position.start) + 
                   correction.correction + 
                   text.substring(correction.position.end)
    setText(newText)
    
    // Retirer la correction appliquée
    setCorrections(corrections.filter(c => c.id !== correction.id))
  }

  const loadSampleText = (sample) => {
    setText(sample.content)
    setCorrections([])
    setSuggestions([])
  }

  const highlightText = (text, corrections) => {
    if (!corrections.length) return text

    let highlightedText = text
    let offset = 0

    corrections.forEach((correction) => {
      const start = correction.position.start + offset
      const end = correction.position.end + offset
      const original = highlightedText.substring(start, end)
      const highlighted = `<span class="correction-highlight" data-correction-id="${correction.id}">${original}</span>`
      
      highlightedText = highlightedText.substring(0, start) + highlighted + highlightedText.substring(end)
      offset += highlighted.length - original.length
    })

    return highlightedText
  }

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
          <PenTool className="w-8 h-8 text-primary-600" />
          Correction de texte par IA
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Écrivez votre texte en anglais et laissez l'IA vous aider à l'améliorer.
          Corrections grammaticales, orthographiques et suggestions stylistiques.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Zone d'écriture */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-2"
        >
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Votre texte</h2>
              <div className="flex gap-2">
                <button
                  onClick={analyzeText}
                  disabled={isAnalyzing || !text.trim()}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Analyse...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Analyser
                    </>
                  )}
                </button>
                <button className="btn-secondary flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  Sauvegarder
                </button>
              </div>
            </div>

            <textarea
              ref={textareaRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Commencez à écrire votre texte en anglais ici..."
              className="input-field min-h-[400px] resize-none font-mono text-sm leading-relaxed"
            />

            <div className="mt-4 text-sm text-gray-500">
              {text.length} caractères • {text.split(/\s+/).filter(Boolean).length} mots
            </div>
          </div>

          {/* Textes d'exemple */}
          <div className="card mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Textes d'exemple
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {sampleTexts.map((sample, index) => (
                <button
                  key={index}
                  onClick={() => loadSampleText(sample)}
                  className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors text-left"
                >
                  <div className="font-medium text-gray-900 mb-1">{sample.title}</div>
                  <div className="text-sm text-gray-600 line-clamp-2">
                    {sample.content.substring(0, 80)}...
                  </div>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Panneau de corrections */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6"
        >
          {/* Corrections */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              Corrections ({corrections.length})
            </h3>
            
            {corrections.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                {isAnalyzing ? (
                  <div className="flex items-center justify-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Analyse en cours...
                  </div>
                ) : (
                  <>
                    <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-500" />
                    Aucune correction nécessaire ou cliquez sur "Analyser"
                  </>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                {corrections.map((correction) => (
                  <div key={correction.id} className="border border-gray-200 rounded-lg p-3">
                    <div className="flex items-start justify-between mb-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        correction.type === 'spelling' 
                          ? 'bg-red-100 text-red-700' 
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {correction.type === 'spelling' ? 'Orthographe' : 'Grammaire'}
                      </span>
                      <button
                        onClick={() => applySuggestion(correction)}
                        className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                      >
                        Appliquer
                      </button>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm">
                        <span className="line-through text-red-600">{correction.original}</span>
                        {' → '}
                        <span className="text-green-600 font-medium">{correction.correction}</span>
                      </div>
                      <div className="text-xs text-gray-600">{correction.explanation}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Suggestions d'amélioration */}
          {suggestions.length > 0 && (
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                Suggestions
              </h3>
              <div className="space-y-3">
                {suggestions.map((suggestion, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-medium">
                        {suggestion.type === 'style' ? 'Style' : 'Vocabulaire'}
                      </span>
                      <span className="text-sm font-medium text-gray-900">{suggestion.title}</span>
                    </div>
                    <div className="text-sm space-y-1">
                      <div>
                        <span className="text-gray-600">Avant :</span> {suggestion.original}
                      </div>
                      <div>
                        <span className="text-gray-600">Après :</span> 
                        <span className="text-green-600 font-medium"> {suggestion.suggestion}</span>
                      </div>
                      <div className="text-xs text-gray-600 mt-2">{suggestion.explanation}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Conseils */}
          <div className="card bg-blue-50 border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Conseils d'écriture
            </h3>
            <ul className="text-sm text-blue-800 space-y-2">
              <li>• Utilisez des phrases courtes et claires</li>
              <li>• Variez votre vocabulaire</li>
              <li>• Vérifiez la concordance des temps</li>
              <li>• Relisez votre texte à voix haute</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default TextCorrection