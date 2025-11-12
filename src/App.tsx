import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import HomePage from './HomePage'
import PeriodsPage from './PeriodsPage'
import PeriodDetail from './PeriodDetail'
import './App.css'

function App() {
  return (
    <BrowserRouter basename="/RIP_2025_frontend">
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/periods" element={<PeriodsPage />} />
        <Route path="/period/:id" element={<PeriodDetail />} />
        {/* Добавляем резервный маршрут для обработки старых ссылок */}
        <Route path="/RIP_2025_frontend/period/:id" element={<PeriodDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App