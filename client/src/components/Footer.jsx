// Stay organized and take control of your day with Todo List. Easily add, edit, and manage your daily tasks in one place. Whether it's work, study, or personal goals — keep everything on track and accomplish more with less stress.

import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-4 mt-10">
      <div className="text-center text-gray-600 text-sm">
        <p>
          © {new Date().getFullYear()} <span className="font-semibold text-blue-600">Note Maker</span>. All rights reserved.
        </p>
        <p className="text-xs mt-1">
          Stay organized, stay productive ✨
        </p>
      </div>
    </footer>
  )
}

export default Footer
