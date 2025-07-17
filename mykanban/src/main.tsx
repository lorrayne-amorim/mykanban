import './index.css'
import { Toaster } from "react-hot-toast";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster position="top-right" />
    <App />
  </StrictMode>,
)
