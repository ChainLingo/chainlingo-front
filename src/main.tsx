import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.tsx'

fetch('https://chain-lingo-back.onrender.com/', { method: 'GET' });

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
