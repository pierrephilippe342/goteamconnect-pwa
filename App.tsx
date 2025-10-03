```tsx
export default function App() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="w-20 h-20 bg-blue-600 rounded-full mx-auto flex items-center justify-center">
            <span className="text-white text-2xl">📱</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            GoteamConnect
          </h1>
          <p className="text-gray-600">
            PWA déployée avec succès !
          </p>
        </div>

        {/* Status Cards */}
        <div className="space-y-3">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-800 font-medium">
              ✅ Déployement Vercel réussi
            </p>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800 font-medium">
              ✅ PWA prête pour installation
            </p>
          </div>
          
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <p className="text-purple-800 font-medium">
              ✅ Compatible iPhone & Android
            </p>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-2">
            📲 Installation Mobile
          </h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p><strong>iPhone:</strong> Safari → Partager → Sur l'écran d'accueil</p>
            <p><strong>Android:</strong> Chrome → Banner "Installer" automatique</p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-sm text-gray-500">
          Prochaine étape : Ajouter les composants complets
        </div>
      </div>
    </div>
  );
}
```
