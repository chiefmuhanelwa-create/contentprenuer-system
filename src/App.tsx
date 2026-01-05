import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: '50px', fontFamily: 'system-ui' }}>
      <h1>🚀 NOCHILL ContentOS - Basic Test</h1>
      <p>If you can see this, React is working!</p>
      <p>Tailwind CSS test below:</p>

      <div className="bg-blue-500 text-white p-4 rounded-lg mt-4">
        This box should be blue if Tailwind CSS is working
      </div>

      <button
        onClick={() => setCount(count + 1)}
        className="mt-4 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
      >
        Counter: {count} (Click me!)
      </button>

      <div className="mt-8 p-4 bg-yellow-100 border-l-4 border-yellow-500">
        <h3 className="font-bold">Debugging Info:</h3>
        <p>✅ React is rendering</p>
        <p>✅ useState hook is working</p>
        <p className="text-sm text-gray-600 mt-2">
          If this works, we'll restore the full app with components
        </p>
      </div>
    </div>
  );
}

export default App;
