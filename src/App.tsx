import { useState, useEffect } from 'react';
import { useBusinessStore } from './store/useBusinessStore';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import SprintTracker from './components/SprintTracker';
import RevenueDashboard from './components/RevenueDashboard';
import ProductRoadmap from './components/ProductRoadmap';
import ContentCalendar from './components/ContentCalendar';
import StudentPipeline from './components/StudentPipeline';
import DecisionFramework from './components/DecisionFramework';
import FaithIntegration from './components/FaithIntegration';
import RiskMitigation from './components/RiskMitigation';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const { darkMode } = useBusinessStore();

  // Apply dark mode class to html element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Render the current view
  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'sprint':
        return <SprintTracker />;
      case 'revenue':
        return <RevenueDashboard />;
      case 'products':
        return <ProductRoadmap />;
      case 'content':
        return <ContentCalendar />;
      case 'students':
        return <StudentPipeline />;
      case 'decisions':
        return <DecisionFramework />;
      case 'faith':
        return <FaithIntegration />;
      case 'risks':
        return <RiskMitigation />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation currentView={currentView} onNavigate={setCurrentView} />

      {/* Main Content - with margin for sidebar */}
      <main className="lg:ml-64 min-h-screen">
        {renderView()}
      </main>
    </div>
  );
}

export default App;
