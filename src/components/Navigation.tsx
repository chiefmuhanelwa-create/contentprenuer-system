import { useState } from 'react';
import { useBusinessStore } from '../store/useBusinessStore';
import {
  LayoutDashboard,
  Wand2,
  TrendingUp,
  ListTodo,
  DollarSign,
  Package,
  Calendar,
  Users,
  Lightbulb,
  Heart,
  Shield,
  Menu,
  X,
  Moon,
  Sun,
} from 'lucide-react';

interface NavigationProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'ai-studio', label: 'AI Studio', icon: Wand2 },
  { id: 'seeds', label: 'SEEDS Funnel', icon: TrendingUp },
  { id: 'sprint', label: '90-Day Sprint', icon: ListTodo },
  { id: 'revenue', label: 'Revenue', icon: DollarSign },
  { id: 'products', label: 'Products', icon: Package },
  { id: 'content', label: 'Content', icon: Calendar },
  { id: 'students', label: 'Students', icon: Users },
  { id: 'decisions', label: 'Decisions', icon: Lightbulb },
  { id: 'faith', label: 'Faith', icon: Heart },
  { id: 'risks', label: 'Risks', icon: Shield },
];

export default function Navigation({ currentView, onNavigate }: NavigationProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { darkMode, toggleDarkMode } = useBusinessStore();

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg"
      >
        {isSidebarOpen ? (
          <X className="w-6 h-6 text-gray-900 dark:text-white" />
        ) : (
          <Menu className="w-6 h-6 text-gray-900 dark:text-white" />
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-transform duration-300 z-40 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } ${isSidebarOpen ? 'w-64' : 'w-20'} lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            {isSidebarOpen ? (
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  NOCHILL
                </h1>
                <p className="text-xs text-gray-600 dark:text-gray-400">Business OS</p>
              </div>
            ) : (
              <div className="text-2xl font-bold text-gray-900 dark:text-white">N</div>
            )}
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    if (window.innerWidth < 1024) {
                      setIsSidebarOpen(false);
                    }
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {isSidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
                </button>
              );
            })}
          </nav>

          {/* Dark Mode Toggle */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={toggleDarkMode}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {darkMode ? (
                <>
                  <Sun className="w-5 h-5 flex-shrink-0" />
                  {isSidebarOpen && <span className="text-sm font-medium">Light Mode</span>}
                </>
              ) : (
                <>
                  <Moon className="w-5 h-5 flex-shrink-0" />
                  {isSidebarOpen && <span className="text-sm font-medium">Dark Mode</span>}
                </>
              )}
            </button>
          </div>

          {/* Collapse Toggle (Desktop) */}
          <div className="hidden lg:block p-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="w-full flex items-center justify-center px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {isSidebarOpen ? (
                <span className="text-sm">Collapse</span>
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  );
}
