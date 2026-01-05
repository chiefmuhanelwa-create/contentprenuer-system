import { useState } from 'react';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import AIContentStudio from './components/AIContentStudio';
import SEEDSFunnel from './components/SEEDSFunnel';
import RevenueDashboard from './components/RevenueDashboard';
import SprintTracker from './components/SprintTracker';
import ProductRoadmap from './components/ProductRoadmap';
import ContentCalendar from './components/ContentCalendar';

type View = 'dashboard' | 'ai-studio' | 'seeds' | 'revenue' | 'sprint' | 'products' | 'calendar';

function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'ai-studio':
        return <AIContentStudio />;
      case 'seeds':
        return <SEEDSFunnel />;
      case 'revenue':
        return <RevenueDashboard />;
      case 'sprint':
        return <SprintTracker />;
      case 'products':
        return <ProductRoadmap />;
      case 'calendar':
        return <ContentCalendar />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation currentView={currentView} onNavigate={(view) => setCurrentView(view as View)} />
      <main className="container mx-auto px-4 py-6">
        {renderView()}
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-600 dark:text-gray-400 italic">
        <p>"You understand? Because you understand." 💪</p>
      </footer>
    </div>
  );
}

export default App;
