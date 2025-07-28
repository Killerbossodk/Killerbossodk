# 🎓 English Trainer - Application d'Entraînement en Anglais

Une application web moderne et interactive pour apprendre l'anglais avec des exercices de grammaire, conjugaison, vocabulaire, quiz et correction de texte par IA.

## ✨ Fonctionnalités

### 🏠 **Tableau de Bord**
- Vue d'ensemble de vos progrès
- Statistiques personnalisées
- Exercice du jour
- Suivi de votre série quotidienne

### 📚 **Grammaire Interactive**
- Exercices sur les temps verbaux (Present Perfect vs Past Simple, etc.)
- Articles (a, an, the)
- Phrases conditionnelles
- Explications détaillées pour chaque réponse

### 🔄 **Conjugaison des Verbes**
- Entraînement sur tous les temps verbaux
- Verbes réguliers et irréguliers
- Exercices interactifs avec correction immédiate
- Tableaux de conjugaison de référence

### 📖 **Vocabulaire par Thèmes**
- Catégories : Vie quotidienne, Travail, Voyage
- Mode apprentissage et mode quiz
- Prononciation audio des mots
- Exemples d'utilisation en contexte

### 🎯 **Quiz Variés**
- Quiz par niveau (Débutant, Intermédiaire, Avancé)
- Questions de grammaire, vocabulaire et compréhension
- Système de scoring et progression
- Explications détaillées

### ✍️ **Correction de Texte par IA**
- Analyseur grammatical et orthographique
- Suggestions d'amélioration stylistique
- Correction en temps réel
- Exemples de textes pour s'entraîner

### 📊 **Suivi des Progrès**
- Statistiques détaillées
- Graphiques de progression
- Système de réalisations
- Objectifs hebdomadaires

## 🚀 Installation et Démarrage

### Prérequis
- Node.js (version 16 ou supérieure)
- npm ou yarn

### Installation

1. **Cloner le projet**
```bash
git clone <url-du-repo>
cd english-trainer
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Démarrer l'application**
```bash
npm start
```

Cette commande lance automatiquement :
- Le serveur backend sur http://localhost:3001
- L'application React sur http://localhost:3000

### Commandes disponibles

```bash
# Démarrer en mode développement (frontend + backend)
npm start

# Démarrer uniquement le frontend
npm run dev

# Démarrer uniquement le backend
npm run server

# Construire pour la production
npm run build

# Prévisualiser la version de production
npm run preview
```

## 🛠️ Technologies Utilisées

### Frontend
- **React 18** - Framework JavaScript moderne
- **React Router** - Navigation entre les pages
- **Tailwind CSS** - Framework CSS utilitaire
- **Framer Motion** - Animations fluides
- **Lucide React** - Icônes modernes
- **Axios** - Client HTTP pour les API

### Backend
- **Express.js** - Serveur web Node.js
- **CORS** - Gestion des requêtes cross-origin
- **OpenAI API** - Intelligence artificielle (optionnel)

## 📁 Structure du Projet

```
english-trainer/
├── public/                 # Fichiers statiques
├── src/                   # Code source React
│   ├── components/        # Composants réutilisables
│   │   └── Navigation.jsx # Navigation principale
│   ├── pages/            # Pages de l'application
│   │   ├── Dashboard.jsx  # Tableau de bord
│   │   ├── Grammar.jsx    # Exercices de grammaire
│   │   ├── Verbs.jsx      # Conjugaison des verbes
│   │   ├── Vocabulary.jsx # Apprentissage vocabulaire
│   │   ├── Quiz.jsx       # Quiz interactifs
│   │   ├── TextCorrection.jsx # Correction de texte IA
│   │   └── Progress.jsx   # Suivi des progrès
│   ├── App.jsx           # Composant principal
│   ├── main.jsx          # Point d'entrée React
│   └── index.css         # Styles globaux
├── server/               # Serveur backend
│   └── index.js          # API Express
├── package.json          # Dépendances et scripts
├── tailwind.config.js    # Configuration Tailwind
├── vite.config.js        # Configuration Vite
└── README.md            # Documentation
```

## 🎮 Comment Utiliser l'Application

### 1. **Page d'Accueil**
- Consultez vos statistiques
- Choisissez un type d'exercice
- Suivez vos progrès quotidiens

### 2. **Exercices de Grammaire**
- Sélectionnez un sujet (Present Perfect, Articles, etc.)
- Répondez aux questions à choix multiples
- Lisez les explications détaillées

### 3. **Conjugaison des Verbes**
- Choisissez un temps verbal
- Conjuguez les verbes proposés
- Utilisez les indices si nécessaire

### 4. **Apprentissage du Vocabulaire**
- Sélectionnez une catégorie thématique
- Mode apprentissage : découvrez les mots
- Mode quiz : testez vos connaissances

### 5. **Quiz Interactifs**
- Choisissez votre niveau
- Répondez aux questions variées
- Consultez votre score final

### 6. **Correction de Texte**
- Écrivez ou collez votre texte en anglais
- Cliquez sur "Analyser"
- Appliquez les corrections suggérées

## 🔧 Configuration Avancée

### Intégration OpenAI (Optionnel)

Pour activer la vraie correction par IA, ajoutez votre clé API OpenAI :

1. Créez un fichier `.env` à la racine :
```env
OPENAI_API_KEY=votre_clé_api_openai
```

2. Décommentez les lignes OpenAI dans `server/index.js`

### Personnalisation

- **Couleurs** : Modifiez `tailwind.config.js`
- **Contenu** : Ajoutez vos propres exercices dans les fichiers de pages
- **API** : Étendez les routes dans `server/index.js`

## 📱 Responsive Design

L'application est entièrement responsive et s'adapte à tous les écrans :
- 📱 Mobile (320px+)
- 📱 Tablette (768px+)
- 💻 Desktop (1024px+)

## 🎨 Interface Utilisateur

- **Design moderne** avec Tailwind CSS
- **Animations fluides** avec Framer Motion
- **Navigation intuitive** avec React Router
- **Feedback visuel** pour toutes les interactions
- **Mode sombre/clair** (à implémenter)

## 🚀 Déploiement

### Netlify/Vercel (Frontend)
```bash
npm run build
# Déployez le dossier 'dist'
```

### Heroku/Railway (Backend)
```bash
# Le serveur est prêt pour le déploiement
# Variables d'environnement : PORT, OPENAI_API_KEY
```

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Fork le projet
2. Créez votre branche (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add AmazingFeature'`)
4. Poussez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🆘 Support

Si vous rencontrez des problèmes :

1. Vérifiez que Node.js est installé
2. Assurez-vous que les ports 3000 et 3001 sont libres
3. Consultez les logs de la console
4. Ouvrez une issue sur GitHub

## 🔮 Fonctionnalités Futures

- [ ] Mode hors ligne
- [ ] Notifications push
- [ ] Système de badges
- [ ] Classements entre utilisateurs
- [ ] Import/Export de données
- [ ] Mode sombre
- [ ] Support multilingue
- [ ] Application mobile native

---

**Développé avec ❤️ pour l'apprentissage de l'anglais**
