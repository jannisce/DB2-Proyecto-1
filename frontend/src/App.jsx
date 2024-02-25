import React from 'react'

//router
import { BrowserRouter, Routes, Route } from 'react-router-dom'

//pages
import AboutPage from './pages/AboutPage'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import AdoptPage from './pages/AdoptPage'
import DashboardPage from './pages/DashboardPage'
import PetDetailsPage from './pages/PetDetailsPage'
import RegisterPage from './pages/RegisterPage'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />

        <Route path='/about' element={<AboutPage />} />

        <Route path='/adopt' element={<AdoptPage />} />
        <Route path='/adopt/:_id' element={<PetDetailsPage />} />

        <Route path='/register' element={<RegisterPage />} />

        <Route path='/dashboard' element={<DashboardPage />} />

        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
