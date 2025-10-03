import { useState, useEffect } from 'react';
import { HomePage } from './components/HomePage';
import { TeamSelector } from './components/TeamSelector';
import { ClientManagement } from './components/ClientManagement';
import { PWAHead } from './components/PWAHead';
import { PWAInstaller, usePWA } from './components/PWAInstaller';

interface User {
  id: string;
  email: string;
  user_metadata?: {
    firstName?: string;
    lastName?: string;
    fullName?: string;
  };
}

interface Team {
  id: string;
  name: string;
  ownerId: string;
  members: string[];
  taskNames: string[];
  createdAt: string;
}

type AppState = 'home' | 'team-selector' | 'client-management';

export default function App() {
  const [currentState, setCurrentState] = useState<AppState>('home');
  const [user, setUser] = useState<User | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showPWAInstaller, setShowPWAInstaller] = useState(false);

  // Enregistrer le Service Worker
  usePWA();

  // Gestion du thème
  useEffect(() => {
    // Charger la préférence sauvegardée ou utiliser la préférence système
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }

    // Détecter si l'utilisateur peut installer la PWA et attendre un peu avant de montrer le banner
    const timer = setTimeout(() => {
      setShowPWAInstaller(true);
    }, 3000); // Attendre 3 secondes après le chargement

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Appliquer le thème et sauvegarder la préférence
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLogin = (user: User) => {
    setUser(user);
    setCurrentState('team-selector');
  };

  const handleTeamSelect = (team: Team) => {
    setSelectedTeam(team);
    setCurrentState('client-management');
  };

  const handleLogout = () => {
    setUser(null);
    setSelectedTeam(null);
    setCurrentState('home');
  };

  const handleBackToTeams = () => {
    setSelectedTeam(null);
    setCurrentState('team-selector');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Chargement...</p>
        </div>
      </div>
    );
  }

  if (currentState === 'home') {
    return (
      <>
        <PWAHead />
        <HomePage onLogin={handleLogin} isDarkMode={isDarkMode} onToggleTheme={toggleTheme} />
        {showPWAInstaller && <PWAInstaller onClose={() => setShowPWAInstaller(false)} />}
      </>
    );
  }

  if (currentState === 'team-selector' && user) {
    return (
      <>
        <PWAHead />
        <TeamSelector 
          user={user}
          onTeamSelect={handleTeamSelect}
          onLogout={handleLogout}
        />
        {showPWAInstaller && <PWAInstaller onClose={() => setShowPWAInstaller(false)} />}
      </>
    );
  }

  if (currentState === 'client-management' && user && selectedTeam) {
    return (
      <>
        <PWAHead />
        <ClientManagement
          user={user}
          team={selectedTeam}
          onBack={handleBackToTeams}
          onLogout={handleLogout}
        />
        {showPWAInstaller && <PWAInstaller onClose={() => setShowPWAInstaller(false)} />}
      </>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p>Chargement...</p>
      </div>
    </div>
  );
}