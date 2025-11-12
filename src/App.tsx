// App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import HomePage from './HomePage'
import PeriodsPage from './PeriodsPage'
import PeriodDetail from './PeriodDetail'
import { dest_root } from '../target_config' // добавьте этот импорт
import './App.css'

function App() {
  return (
    <BrowserRouter basename={dest_root}> {/* добавьте basename */}
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/periods" element={<PeriodsPage />} />
        <Route path="/period/:id" element={<PeriodDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App