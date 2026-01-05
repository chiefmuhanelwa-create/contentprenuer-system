import { useState, useEffect } from 'react';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Clear any corrupted localStorage data
    try {
      localStorage.removeItem('nochill-business-os');
      console.log('Cleared localStorage');
    } catch (e) {
      console.error('Error clearing localStorage:', e);
    }
    setReady(true);
  }, []);

  if (!ready) {
    return (
      <div style={{ padding: '50px', fontFamily: 'system-ui' }}>
        <h1>🚀 Loading NOCHILL ContentOS...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">
            🚀 NOCHILL ContentOS
          </h1>
          <p className="text-sm text-gray-600">The AI Operating System for Contentpreneurs</p>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex gap-2 flex-wrap">
            {['Dashboard', 'AI Studio', 'SEEDS Funnel', 'Revenue', 'Sprint', 'Products'].map((item) => (
              <button
                key={item}
                onClick={() => setCurrentView(item.toLowerCase().replace(' ', '-'))}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentView === item.toLowerCase().replace(' ', '-')
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          {currentView === 'dashboard' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">📊 Dashboard</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-yellow-800">💰 Revenue</h3>
                  <p className="text-3xl font-bold text-yellow-900">R0</p>
                  <p className="text-sm text-yellow-700">This month</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-blue-800">📊 Contacts</h3>
                  <p className="text-3xl font-bold text-blue-900">0</p>
                  <p className="text-sm text-blue-700">In SEEDS funnel</p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-green-800">✅ Tasks</h3>
                  <p className="text-3xl font-bold text-green-900">0</p>
                  <p className="text-sm text-green-700">Completed</p>
                </div>
              </div>
              <div className="bg-orange-50 border-l-4 border-orange-500 p-4">
                <h3 className="font-bold text-orange-900 mb-2">🎯 Quick Start</h3>
                <ul className="space-y-2 text-orange-800">
                  <li>✨ Click <strong>AI Studio</strong> to generate scripts with Claude AI</li>
                  <li>📈 Click <strong>SEEDS Funnel</strong> to track your contacts</li>
                  <li>💰 Click <strong>Revenue</strong> to log your earnings</li>
                  <li>📋 Click <strong>Sprint</strong> to plan your 90-day goals</li>
                </ul>
              </div>
            </div>
          )}

          {currentView === 'ai-studio' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">✨ AI Content Studio</h2>
              <p className="text-gray-600 mb-6">Generate high-performing scripts with Claude AI</p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What problem are you addressing? *
                  </label>
                  <textarea
                    placeholder="e.g., Creators getting views but making R0 in revenue"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SEEDS Stage
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {['Signal', 'Engagement', 'Education', 'Decision', 'Success'].map((stage) => (
                      <button
                        key={stage}
                        className="px-4 py-2 bg-gray-100 hover:bg-orange-500 hover:text-white rounded-lg font-medium transition-colors"
                      >
                        {stage}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration: 60 seconds
                  </label>
                  <input
                    type="range"
                    min="30"
                    max="90"
                    step="15"
                    defaultValue="60"
                    className="w-full"
                  />
                </div>

                <button className="w-full bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
                  ✨ Generate Script with AI
                </button>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                  <p className="text-sm text-yellow-800">
                    <strong>⚠️ Note:</strong> To use AI generation, add your Anthropic API key to the <code className="bg-yellow-100 px-1 rounded">.env</code> file.
                  </p>
                </div>
              </div>
            </div>
          )}

          {currentView === 'seeds-funnel' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">📈 SEEDS Funnel</h2>
              <p className="text-gray-600 mb-6">Track contacts through: Signal → Engagement → Education → Decision → Success</p>
              <div className="text-center py-12 text-gray-500">
                <p className="text-lg">Contact funnel tracker coming soon...</p>
              </div>
            </div>
          )}

          {currentView === 'revenue' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">💰 Revenue Dashboard</h2>
              <p className="text-gray-600 mb-6">Track revenue across PAIDS: Products, Ads, Information, Deals, Services</p>
              <div className="text-center py-12 text-gray-500">
                <p className="text-lg">Revenue tracking coming soon...</p>
              </div>
            </div>
          )}

          {currentView === 'sprint' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">📋 90-Day Sprint</h2>
              <p className="text-gray-600 mb-6">12-week sprint planning with pre-populated tasks</p>
              <div className="text-center py-12 text-gray-500">
                <p className="text-lg">Sprint tracker coming soon...</p>
              </div>
            </div>
          )}

          {currentView === 'products' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">📦 Product Roadmap</h2>
              <p className="text-gray-600 mb-6">Kanban-style product management</p>
              <div className="text-center py-12 text-gray-500">
                <p className="text-lg">Product roadmap coming soon...</p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-600 italic">
        <p>"You understand? Because you understand." 💪</p>
      </footer>
    </div>
  );
}

export default App;
