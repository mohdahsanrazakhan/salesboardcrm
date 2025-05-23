import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

function ResponsiveWrapper() {
  const [isSupported, setIsSupported] = useState(window.innerWidth > 720)

  useEffect(() => {
    const handleResize = () => setIsSupported(window.innerWidth > 720)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (!isSupported) {
    return (
      <div style={{
        display: 'flex',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.2rem',
        textAlign: 'center',
        padding: '2rem'
      }}>
        This CRM currently does not support small screens.<br />
        Please use a device with width above 720px (tablet, laptop, desktop).
      </div>
    )
  }

  return (
    <StrictMode>
      <App />
    </StrictMode>
  )
}

createRoot(document.getElementById('root')).render(
  <ResponsiveWrapper />
)
