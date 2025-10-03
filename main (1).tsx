import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

console.log('🚀 Main.tsx chargé - Version diagnostic complète');
console.log('🔍 React version:', React.version);
console.log('🔍 Environment:', import.meta.env.MODE);
console.log('🔍 Base URL:', import.meta.env.BASE_URL);

// Vérification du DOM
const rootElement = document.getElementById('root');
console.log('🔍 Root element trouvé:', !!rootElement);

if (!rootElement) {
  console.error('❌ ERREUR: Element #root non trouvé dans le DOM!');
  document.body.innerHTML = `
    <div style="padding: 20px; font-family: Arial; background: #fee; color: #900;">
      <h1>❌ ERREUR: Element #root manquant</h1>
      <p>L'element #root n'existe pas dans index.html</p>
    </div>
  `;
} else {
  try {
    console.log('🔍 Création du root React...');
    const root = ReactDOM.createRoot(rootElement);
    
    console.log('🔍 Rendu de l\'application...');
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    
    console.log('✅ Application rendue avec succès!');
  } catch (error) {
    console.error('❌ ERREUR lors du rendu:', error);
    document.body.innerHTML = `
      <div style="padding: 20px; font-family: Arial; background: #fee; color: #900;">
        <h1>❌ ERREUR de rendu React</h1>
        <pre>${error}</pre>
      </div>
    `;
  }
}