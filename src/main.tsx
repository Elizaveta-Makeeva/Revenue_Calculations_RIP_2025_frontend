import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from "react-redux";
import {registerSW} from "virtual:pwa-register";
import store from "./store"
import App from './App'
import './index.css'

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Failed to find the root element')

const root = ReactDOM.createRoot(rootElement)

// Добавляем загрузку но сохраняем StrictMode
const renderApp = () => {
  root.render(
    <React.StrictMode>
      <Provider store={store}> 
        <App />
      </Provider>
    </React.StrictMode>
  )
}

// Ждем полной загрузки перед рендером
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderApp)
} else {
  // Если DOM уже загружен, рендерим сразу
  renderApp()
}


if ("serviceWorker" in navigator) {
  registerSW()
}