import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navigation from './components/Navigation'
import Dashboard from './pages/Dashboard'
import Grammar from './pages/Grammar'
import Verbs from './pages/Verbs'
import Vocabulary from './pages/Vocabulary'
import Quiz from './pages/Quiz'
import TextCorrection from './pages/TextCorrection'
import Progress from './pages/Progress'

function App() {
  const [user, setUser] = useState({
    name: 'Utilisateur',
    level: 'Intermédiaire',
    points: 1250,
    streak: 7
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation user={user} />
      
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Routes>
            <Route path="/" element={<Dashboard user={user} />} />
            <Route path="/grammar" element={<Grammar />} />
            <Route path="/verbs" element={<Verbs />} />
            <Route path="/vocabulary" element={<Vocabulary />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/correction" element={<TextCorrection />} />
            <Route path="/progress" element={<Progress user={user} />} />
          </Routes>
        </motion.div>
      </main>
    </div>
  )
}

export default App