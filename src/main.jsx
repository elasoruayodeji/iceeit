import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

// HashRouter (not BrowserRouter) is used because the site will be hosted
// on GitHub Pages, which doesn't support client-side routing on page refresh
// without extra config. HashRouter (urls like /#/shop) works with zero setup.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
)
