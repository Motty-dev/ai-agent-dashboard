import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/globals.css';
import App from './App';

console.log('React app starting...');

const rootElement = document.getElementById('root');
console.log('Root element found:', rootElement);

const root = ReactDOM.createRoot(rootElement);
console.log('React root created successfully');

root.render(<App />);
console.log('App component rendered');
