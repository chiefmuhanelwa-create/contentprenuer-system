import { useState, useEffect } from 'react';
import { generateScript, type ScriptGenerationInput, type ScriptGenerationOutput } from './lib/ai';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [ready, setReady] = useState(false);

  // AI Studio state
  const [problem, setProblem] = useState('');
  const [seedsStage, setSeedsStage] = useState<ScriptGenerationInput['seedsStage']>('education');
  const [duration, setDuration] = useState(60);
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState<ScriptGenerationOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

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

  const handleGenerate = async () => {
    if (!problem.trim()) {
      setError('Please enter a problem to address');
      return;
    }

    // Check if API key is configured
    const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
    console.log('API Key check:', apiKey ? 'Key found (length: ' + apiKey.length + ')' : 'No key found');
    console.log('Environment:', import.meta.env);

    if (!apiKey || apiKey === '') {
      setError('Please add your Anthropic API key to the .env file as VITE_ANTHROPIC_API_KEY');
      return;
    }

    setGenerating(true);
    setError(null);

    try {
      const result = await generateScript({
        problem: problem.trim(),
        seedsStage,
        duration,
        userId: 'default-user',
      });

      setGenerated(result);
      setError(null);
    } catch (err: any) {
      console.error('Generation failed:', err);
      setError(err.message || 'Failed to generate script. Please check your API key and try again.');
      setGenerated(null);
    } finally {
      setGenerating(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

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
                    value={problem}
                    onChange={(e) => setProblem(e.target.value)}
                    placeholder="e.g., Creators getting views but making R0 in revenue"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    rows={3}
                    disabled={generating}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SEEDS Stage
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {(['signal', 'engagement', 'education', 'decision', 'success'] as const).map((stage) => (
                      <button
                        key={stage}
                        onClick={() => setSeedsStage(stage)}
                        disabled={generating}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
                          seedsStage === stage
                            ? 'bg-orange-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-orange-500 hover:text-white'
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        {stage}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration: {duration} seconds
                  </label>
                  <input
                    type="range"
                    min="30"
                    max="90"
                    step="15"
                    value={duration}
                    onChange={(e) => setDuration(parseInt(e.target.value))}
                    disabled={generating}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>30s</span>
                    <span>60s</span>
                    <span>90s</span>
                  </div>
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={generating || !problem.trim()}
                  className="w-full bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {generating ? '⏳ Generating...' : '✨ Generate Script with AI'}
                </button>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-sm text-red-800">
                      <strong>❌ Error:</strong> {error}
                    </p>
                  </div>
                )}

                {!import.meta.env.VITE_ANTHROPIC_API_KEY && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-sm text-yellow-800">
                      <strong>⚠️ Note:</strong> To use AI generation, add your Anthropic API key to the <code className="bg-yellow-100 px-1 rounded">.env</code> file as <code className="bg-yellow-100 px-1 rounded">VITE_ANTHROPIC_API_KEY</code> and restart the dev server.
                    </p>
                  </div>
                )}

                {generated && (
                  <div className="mt-6 space-y-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-bold text-green-900">✅ Script Generated!</h3>
                        <button
                          onClick={() => copyToClipboard(generated.script)}
                          className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                        >
                          Copy Script
                        </button>
                      </div>
                      <div className="bg-white rounded p-4 mt-2 max-h-96 overflow-y-auto">
                        <pre className="whitespace-pre-wrap text-sm text-gray-800">{generated.script}</pre>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-bold text-blue-900 mb-2">📊 SEEDS Score</h4>
                        <div className="text-3xl font-bold text-blue-900">{generated.seedsScore.overall}%</div>
                        <div className="text-xs text-blue-700 mt-2 space-y-1">
                          <div>Signal: {generated.seedsScore.signal}%</div>
                          <div>Engagement: {generated.seedsScore.engagement}%</div>
                          <div>Education: {generated.seedsScore.education}%</div>
                          <div>Decision: {generated.seedsScore.decision}%</div>
                          <div>Success: {generated.seedsScore.success}%</div>
                        </div>
                      </div>

                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                        <h4 className="font-bold text-purple-900 mb-2">💰 Revenue Prediction</h4>
                        <div className="text-3xl font-bold text-purple-900">R{generated.predictions.estimatedRevenue.toLocaleString()}</div>
                        <div className="text-xs text-purple-700 mt-2 space-y-1">
                          <div>Hook Rate: {generated.predictions.hookRate}%</div>
                          <div>Completion: {generated.predictions.completionRate}%</div>
                          <div>CTR: {generated.predictions.ctr}%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
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
