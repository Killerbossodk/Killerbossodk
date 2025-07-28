const express = require('express')
const cors = require('cors')
// const OpenAI = require('openai') // Décommentez si vous avez une clé API OpenAI

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())

// Configuration OpenAI (décommentez si vous avez une clé API)
/*
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})
*/

// Simulation de correction de texte (remplacez par l'API OpenAI en production)
const simulateTextCorrection = (text) => {
  // Corrections communes simulées
  const corrections = []
  const suggestions = []
  
  // Recherche de fautes communes
  const commonMistakes = [
    { wrong: 'interessting', correct: 'interesting', type: 'spelling' },
    { wrong: 'altough', correct: 'although', type: 'spelling' },
    { wrong: 'recieve', correct: 'receive', type: 'spelling' },
    { wrong: 'seperate', correct: 'separate', type: 'spelling' },
    { wrong: 'definately', correct: 'definitely', type: 'spelling' },
    { wrong: 'I like to reading', correct: 'I like reading', type: 'grammar' },
    { wrong: 'enjoy to travel', correct: 'enjoy traveling', type: 'grammar' },
    { wrong: 'I am agree', correct: 'I agree', type: 'grammar' },
    { wrong: 'very interessting', correct: 'very interesting', type: 'spelling' }
  ]
  
  commonMistakes.forEach((mistake, index) => {
    const position = text.toLowerCase().indexOf(mistake.wrong.toLowerCase())
    if (position !== -1) {
      corrections.push({
        id: index + 1,
        original: mistake.wrong,
        correction: mistake.correct,
        type: mistake.type,
        position: { 
          start: position, 
          end: position + mistake.wrong.length 
        },
        explanation: getExplanation(mistake.wrong, mistake.correct, mistake.type)
      })
    }
  })
  
  // Suggestions d'amélioration
  if (text.includes('very interesting')) {
    suggestions.push({
      type: 'vocabulary',
      title: 'Enrichir le vocabulaire',
      original: 'very interesting',
      suggestion: 'fascinating / compelling / remarkable',
      explanation: 'Utilisez des adjectifs plus précis que "very interesting"'
    })
  }
  
  if (text.includes('I am writing to you about')) {
    suggestions.push({
      type: 'style',
      title: 'Améliorer la fluidité',
      original: 'I am writing to you about',
      suggestion: 'I am writing to follow up on',
      explanation: 'Cette formulation est plus concise et professionnelle'
    })
  }
  
  return { corrections, suggestions }
}

const getExplanation = (wrong, correct, type) => {
  const explanations = {
    'interessting': "Faute d'orthographe : 'interesting' prend deux 's'",
    'altough': "Faute d'orthographe : 'although' s'écrit avec 'h'",
    'I like to reading': "Après 'like', utilisez l'infinitif sans 'to' ou le gérondif",
    'enjoy to travel': "Après 'enjoy', utilisez le gérondif (-ing)",
    'I am agree': "Le verbe 'agree' ne se conjugue pas avec 'be' mais directement",
    'recieve': "Règle : 'i' avant 'e' sauf après 'c' - 'receive'",
    'seperate': "Faute d'orthographe courante : 'separate' avec 'a'",
    'definately': "Faute d'orthographe : 'definitely' avec 'i'"
  }
  
  return explanations[wrong] || `Correction ${type} : remplacer "${wrong}" par "${correct}"`
}

// API Routes

// Route pour analyser et corriger un texte
app.post('/api/analyze-text', async (req, res) => {
  try {
    const { text } = req.body
    
    if (!text || text.trim().length === 0) {
      return res.status(400).json({ error: 'Le texte ne peut pas être vide' })
    }
    
    // Simulation de délai d'analyse
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // En production, utilisez l'API OpenAI :
    /*
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an English grammar and spelling checker. Analyze the text and provide corrections with explanations in French."
        },
        {
          role: "user",
          content: `Please analyze this English text for grammar and spelling errors: "${text}"`
        }
      ],
      temperature: 0.3
    })
    */
    
    // Utilisation de la simulation pour la démonstration
    const analysis = simulateTextCorrection(text)
    
    res.json({
      success: true,
      corrections: analysis.corrections,
      suggestions: analysis.suggestions,
      originalText: text,
      analyzedAt: new Date().toISOString()
    })
    
  } catch (error) {
    console.error('Erreur lors de l\'analyse du texte:', error)
    res.status(500).json({ 
      error: 'Erreur lors de l\'analyse du texte',
      details: error.message 
    })
  }
})

// Route pour obtenir des suggestions de vocabulaire
app.post('/api/vocabulary-suggestions', async (req, res) => {
  try {
    const { word, context } = req.body
    
    // Simulation de suggestions de vocabulaire
    const suggestions = {
      'good': ['excellent', 'outstanding', 'remarkable', 'superb'],
      'bad': ['terrible', 'awful', 'dreadful', 'appalling'],
      'big': ['enormous', 'massive', 'gigantic', 'colossal'],
      'small': ['tiny', 'miniature', 'petite', 'compact'],
      'nice': ['pleasant', 'delightful', 'charming', 'lovely'],
      'interesting': ['fascinating', 'captivating', 'intriguing', 'compelling']
    }
    
    const wordSuggestions = suggestions[word.toLowerCase()] || []
    
    res.json({
      success: true,
      word,
      suggestions: wordSuggestions,
      context
    })
    
  } catch (error) {
    console.error('Erreur lors de la génération des suggestions:', error)
    res.status(500).json({ 
      error: 'Erreur lors de la génération des suggestions',
      details: error.message 
    })
  }
})

// Route pour sauvegarder les progrès de l'utilisateur
app.post('/api/save-progress', async (req, res) => {
  try {
    const { userId, exerciseType, score, timeSpent } = req.body
    
    // En production, sauvegarder en base de données
    console.log('Progrès sauvegardé:', { userId, exerciseType, score, timeSpent })
    
    res.json({
      success: true,
      message: 'Progrès sauvegardé avec succès',
      savedAt: new Date().toISOString()
    })
    
  } catch (error) {
    console.error('Erreur lors de la sauvegarde:', error)
    res.status(500).json({ 
      error: 'Erreur lors de la sauvegarde',
      details: error.message 
    })
  }
})

// Route pour obtenir les statistiques de l'utilisateur
app.get('/api/user-stats/:userId', async (req, res) => {
  try {
    const { userId } = req.params
    
    // Simulation de statistiques utilisateur
    const stats = {
      totalExercises: 127,
      totalTime: 48 * 60, // en minutes
      currentStreak: 7,
      averageScore: 85,
      wordsLearned: 245,
      grammarTopicsCompleted: 8,
      lastActivity: new Date().toISOString()
    }
    
    res.json({
      success: true,
      userId,
      stats
    })
    
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error)
    res.status(500).json({ 
      error: 'Erreur lors de la récupération des statistiques',
      details: error.message 
    })
  }
})

// Route de santé de l'API
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'English Trainer API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  })
})

// Gestion des erreurs 404
app.use((req, res) => {
  res.status(404).json({
    error: 'Route non trouvée',
    path: req.path,
    method: req.method
  })
})

// Gestion des erreurs globales
app.use((error, req, res, next) => {
  console.error('Erreur serveur:', error)
  res.status(500).json({
    error: 'Erreur interne du serveur',
    details: process.env.NODE_ENV === 'development' ? error.message : undefined
  })
})

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur English Trainer démarré sur le port ${PORT}`)
  console.log(`📚 API disponible sur http://localhost:${PORT}/api`)
  console.log(`🏥 Health check: http://localhost:${PORT}/api/health`)
  
  if (process.env.NODE_ENV === 'development') {
    console.log('🔧 Mode développement activé')
  }
})

module.exports = app