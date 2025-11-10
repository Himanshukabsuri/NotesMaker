import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-blue-700">
          Note Maker
        </Link>

        <div className="flex items-center gap-6 text-gray-700 font-medium">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/about" className="hover:text-blue-600">About</Link>
          
          {isAuthenticated ? (
            <>
              <Link to="/note" className="hover:text-blue-600">My Notes</Link>
              <span className="text-sm text-gray-600">
                Hi, {user?.username || user?.email}
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/sign-in"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Sign In
              </Link>
              <Link
                to="/sign-up"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar