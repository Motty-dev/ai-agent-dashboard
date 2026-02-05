import React from 'react';

function App() {
  return (
    <div style={{
      fontFamily: 'system-ui',
      maxWidth: '800px',
      margin: '2rem auto',
      padding: '2rem',
      textAlign: 'center'
    }}>
      <header style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '3rem',
        borderRadius: '20px',
        marginBottom: '2rem'
      }}>
        <h1>🚀 ai-agent-dashboard</h1>
        <p>React application deployed by OpenClaw Super Coder!</p>
      </header>
      
      <div>
        <h2>⚡ Features Included</h2>
        <div style={{ display: 'grid', gap: '1rem', marginTop: '2rem' }}>
          <div style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h3>🔧 Modern React Setup</h3>
            <p>Latest React 18 with hooks and modern JavaScript</p>
          </div>
          <div style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h3>🚀 Auto Deployment</h3>
            <p>GitHub Actions CI/CD pipeline included</p>
          </div>
          <div style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h3>📱 Responsive Design</h3>
            <p>Mobile-first responsive layout</p>
          </div>
        </div>
      </div>
      
      <footer style={{ marginTop: '3rem', opacity: 0.7 }}>
        <p>🤖 Built and deployed by OpenClaw Super Coder</p>
      </footer>
    </div>
  );
}

export default App;
