import { useState } from 'react'
import HomePage from './pages/HomePage'
import RepoPage from './pages/RepoPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:username/:repoName" element={<RepoPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
