import { useState } from 'react';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <header style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          marginBottom: '20px'
        }}>
          <h1 style={{ margin: 0, color: '#111', fontSize: '28px' }}>
            🚀 NOCHILL ContentOS MVP
          </h1>
          <p style={{ margin: '8px 0 0 0', color: '#666' }}>
            The AI Operating System for Contentpreneurs
          </p>
        </header>

        {/* Navigation */}
        <nav style={{
          backgroundColor: 'white',
          padding: '15px',
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          marginBottom: '20px',
          display: 'flex',
          gap: '10px',
          flexWrap: 'wrap'
        }}>
          {['Dashboard', 'AI Studio', 'SEEDS Funnel', 'Revenue', 'Sprint', 'Products'].map((item) => (
            <button
              key={item}
              onClick={() => setCurrentView(item.toLowerCase().replace(' ', '-'))}
              style={{
                padding: '10px 20px',
                backgroundColor: currentView === item.toLowerCase().replace(' ', '-') ? '#f97316' : '#e5e7eb',
                color: currentView === item.toLowerCase().replace(' ', '-') ? 'white' : '#374151',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              {item}
            </button>
          ))}
        </nav>

        {/* Content */}
        <main style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          minHeight: '400px'
        }}>
          {currentView === 'dashboard' && (
            <div>
              <h2 style={{ color: '#111', marginTop: 0 }}>✨ Welcome to NOCHILL ContentOS</h2>
              <p style={{ color: '#666', fontSize: '16px', lineHeight: '1.6' }}>
                Your all-in-one platform for content creation, revenue tracking, and business growth.
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '20px',
                marginTop: '30px'
              }}>
                <div style={{ padding: '20px', backgroundColor: '#fef3c7', borderRadius: '8px' }}>
                  <h3 style={{ margin: '0 0 10px 0', color: '#92400e' }}>💰 Revenue</h3>
                  <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#92400e', margin: 0 }}>R0</p>
                  <p style={{ fontSize: '14px', color: '#92400e', margin: '5px 0 0 0' }}>This month</p>
                </div>

                <div style={{ padding: '20px', backgroundColor: '#dbeafe', borderRadius: '8px' }}>
                  <h3 style={{ margin: '0 0 10px 0', color: '#1e40af' }}>📊 Contacts</h3>
                  <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e40af', margin: 0 }}>0</p>
                  <p style={{ fontSize: '14px', color: '#1e40af', margin: '5px 0 0 0' }}>In SEEDS funnel</p>
                </div>

                <div style={{ padding: '20px', backgroundColor: '#dcfce7', borderRadius: '8px' }}>
                  <h3 style={{ margin: '0 0 10px 0', color: '#166534' }}>✅ Tasks</h3>
                  <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#166534', margin: 0 }}>0</p>
                  <p style={{ fontSize: '14px', color: '#166534', margin: '5px 0 0 0' }}>Completed this week</p>
                </div>
              </div>

              <div style={{
                marginTop: '30px',
                padding: '20px',
                backgroundColor: '#f3f4f6',
                borderRadius: '8px',
                borderLeft: '4px solid #f97316'
              }}>
                <h3 style={{ margin: '0 0 10px 0', color: '#111' }}>🎯 Quick Start Guide</h3>
                <ol style={{ margin: 0, paddingLeft: '20px', color: '#666' }}>
                  <li style={{ marginBottom: '8px' }}>Click <strong>AI Studio</strong> to generate scripts with AI</li>
                  <li style={{ marginBottom: '8px' }}>Click <strong>SEEDS Funnel</strong> to track contacts</li>
                  <li style={{ marginBottom: '8px' }}>Click <strong>Revenue</strong> to log earnings</li>
                  <li style={{ marginBottom: '8px' }}>Click <strong>Sprint</strong> to manage your 90-day plan</li>
                </ol>
              </div>
            </div>
          )}

          {currentView === 'ai-studio' && (
            <div>
              <h2 style={{ color: '#111', marginTop: 0 }}>✨ AI Content Studio</h2>
              <p style={{ color: '#666', marginBottom: '20px' }}>
                Generate high-performing scripts optimized for the SEEDS framework.
              </p>

              <div style={{
                padding: '20px',
                backgroundColor: '#fef3c7',
                borderRadius: '8px',
                border: '2px solid #fbbf24'
              }}>
                <h3 style={{ margin: '0 0 10px 0', color: '#92400e' }}>⚠️ API Key Required</h3>
                <p style={{ color: '#92400e', margin: '0 0 15px 0' }}>
                  To use AI features, you need to add your Anthropic API key.
                </p>
                <ol style={{ margin: 0, paddingLeft: '20px', color: '#92400e' }}>
                  <li>Go to <a href="https://console.anthropic.com/" target="_blank" rel="noopener" style={{ color: '#f97316' }}>console.anthropic.com</a></li>
                  <li>Sign up (you get $5 free credit)</li>
                  <li>Create an API key</li>
                  <li>Add it to your <code>.env</code> file as <code>ANTHROPIC_API_KEY</code></li>
                  <li>Restart the dev server</li>
                </ol>
              </div>

              <p style={{
                marginTop: '20px',
                fontStyle: 'italic',
                color: '#666',
                textAlign: 'center'
              }}>
                Full AI Studio UI coming after we verify basic setup works!
              </p>
            </div>
          )}

          {currentView === 'seeds-funnel' && (
            <div>
              <h2 style={{ color: '#111', marginTop: 0 }}>📈 SEEDS Funnel</h2>
              <p style={{ color: '#666' }}>
                Track contacts through: Signal → Engagement → Education → Decision → Success
              </p>
              <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
                <p>Funnel tracking coming soon...</p>
                <p style={{ fontSize: '14px' }}>The full UI will load once we verify this basic version works!</p>
              </div>
            </div>
          )}

          {currentView === 'revenue' && (
            <div>
              <h2 style={{ color: '#111', marginTop: 0 }}>💰 Revenue Dashboard</h2>
              <p style={{ color: '#666' }}>
                Track revenue across PAIDS: Products, Ads, Information, Deals, Services
              </p>
              <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
                <p>Revenue tracking coming soon...</p>
              </div>
            </div>
          )}

          {currentView === 'sprint' && (
            <div>
              <h2 style={{ color: '#111', marginTop: 0 }}>📋 90-Day Sprint</h2>
              <p style={{ color: '#666' }}>
                12-week sprint planning with pre-populated tasks
              </p>
              <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
                <p>Sprint tracker coming soon...</p>
              </div>
            </div>
          )}

          {currentView === 'products' && (
            <div>
              <h2 style={{ color: '#111', marginTop: 0 }}>📦 Product Roadmap</h2>
              <p style={{ color: '#666' }}>
                Kanban-style product management
              </p>
              <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
                <p>Product roadmap coming soon...</p>
              </div>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer style={{
          textAlign: 'center',
          marginTop: '30px',
          padding: '20px',
          color: '#666',
          fontStyle: 'italic'
        }}>
          <p>"You understand? Because you understand." 💪</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
