import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Home from './pages/Home'
import About from './pages/About'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Note from './pages/Note'

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/note' element={<Note />} />
      </Routes>
    </AuthProvider>
  )
}

export default App