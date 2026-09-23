import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import OchranaUdajov from './pages/OchranaUdajov.jsx'
import Podmienky from './pages/Podmienky.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/ochrana-osobnych-udajov" element={<OchranaUdajov />} />
        <Route path="/obchodne-podmienky" element={<Podmienky />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
