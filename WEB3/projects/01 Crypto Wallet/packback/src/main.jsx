import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router"
import { Buffer } from 'buffer'
import process from 'process'

window.Buffer = Buffer
window.process = process


console.log('process exists:', typeof process)
console.log('Buffer exists:', typeof Buffer)

createRoot(document.getElementById('root')).render(
        <StrictMode>
                <BrowserRouter>
                        <App />
                </BrowserRouter>
        </StrictMode>,
)
