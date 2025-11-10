import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import HomePage from './HomePage'
import PeriodsPage from './PeriodsPage'
import PeriodDetail from './PeriodDetail'
import './App.css'

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/periods" element={<PeriodsPage />} />
        <Route path="/period/:id" element={<PeriodDetail />} />
      </Routes>
    </Router>
  )
}

export default App