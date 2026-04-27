import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
{/* Importing the main App component and BrowserRouter for routing */}
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Wrapping the App component with BrowserRouter to enable routing in the application */}
    <BrowserRouter>
      <App className="bg-gray-800" />
    </BrowserRouter>
  </StrictMode>,
)
