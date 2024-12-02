import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import smoothscroll from 'smoothscroll-polyfill';
import './index.css'
import App from './App.jsx'

smoothscroll.polyfill();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
