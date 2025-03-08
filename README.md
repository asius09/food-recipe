# Recipe Explorer

## Overview

Recipe Explorer is a powerful React application that lets users discover, search, and curate personalized recipe collections. The application features an intuitive, responsive interface designed to enhance the cooking experience through thoughtful UX and robust functionality.

## Why I Built This

I developed this project to strengthen my expertise in:

- React Router for seamless navigation and routing
- Context API for efficient global state management
- Custom hooks for modular, reusable logic
- Modern UI/UX principles with accessibility in mind

## Features

### Advanced Search Functionality

- Real-time recipe search with instant results
- Comprehensive filtering by ingredients, cuisine, dietary restrictions, and meal type
- Intelligent autocomplete with trending suggestions

### Interactive Explore Section

- Curated recipe collections by seasonal categories
- Infinite scroll with optimized "Load More" pagination
- Detailed recipe cards displaying preparation time, difficulty, and nutritional highlights

### Smart Favorites System

- One-click recipe saving functionality
- Persistent favorites with local storage integration
- Organized access to saved recipes with custom sorting options

### Premium UI Enhancements

- Fully responsive design optimized for mobile, tablet, and desktop
- Customizable dark/light mode with user preference detection
- Smooth, animated transitions between application states
- Sophisticated loading skeletons for enhanced perceived performance

## Technologies Used

- React.js with functional components and hooks
- React Router v6 for navigation management
- Context API for global state architecture
- Custom Hooks for logic abstraction
- CSS Modules and SCSS for component styling
- Spoonacular API integration with custom data handling

## Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   └── MainLayout.jsx
│   ├── recipes/
│   │   ├── RecipeCard.jsx
│   │   ├── RecipeDetail.jsx
│   │   └── RecipeList.jsx
│   ├── search/
│   │   ├── SearchBar.jsx
│   │   ├── FilterOptions.jsx
│   │   └── SearchResults.jsx
│   └── ui/
│       ├── Button.jsx
│       ├── Loader.jsx
│       └── ThemeToggle.jsx
├── context/
│   ├── FavoritesContext.jsx
│   ├── SearchContext.jsx
│   └── ThemeContext.jsx
├── hooks/
│   ├── useFavorites.js
│   ├── useRecipes.js
│   └── useTheme.js
├── pages/
│   ├── Home.jsx
│   ├── Explore.jsx
│   ├── Favorites.jsx
│   └── RecipeDetailPage.jsx
├── services/
│   ├── api.js
│   └── localStorage.js
├── styles/
│   ├── global.scss
│   └── variables.scss
├── utils/
│   ├── formatters.js
│   └── validators.js
├── App.jsx
└── index.js
```

## Future Improvements

- User authentication with profile customization
- Personal recipe creation and editing capabilities
- Social sharing with integrated platforms
- Comprehensive recipe rating and review system
- Meal planning calendar integration

## Getting Started

1. Clone the repository: `git clone https://github.com/username/recipe-explorer.git`
2. Install dependencies: `npm install`
3. Start the development server: `npm start`
4. Access the application at [http://localhost:3000](http://localhost:3000)
