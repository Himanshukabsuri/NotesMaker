import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className="px-6 sm:px-12 md:px-20 lg:px-32 py-12 bg-gray-50">
      <h1 className="text-3xl sm:text-4xl font-semibold text-center text-gray-800 mb-10">
        About Us
      </h1>

      <div className="flex flex-col md:flex-row items-center gap-10">
        <div className="md:w-1/2 flex justify-center">
          <img
            src={assets.todo}
            alt="Todo Illustration"
            className="w-80 md:w-[400px] rounded-2xl shadow-md"
          />
        </div>

        <div className="md:w-1/2 text-gray-600 leading-relaxed text-justify">
          <p className="mb-4">
            Stay organized and take control of your day with <span className="font-semibold text-gray-800">List Maker</span>.
            Easily add, edit, and manage your daily tasks in one place. Whether it’s work, study,
            or personal goals — keep everything on track and accomplish more with less stress.
          </p>
          <p>
           A note maker is a tool or application that helps users write, organize, and store their notes digitally. It allows users to capture important ideas, reminders, and information quickly and access them anytime. With features like editing, categorizing, and syncing across devices, a note maker makes studying, planning, and daily organization much easier and more efficient.
          </p>
        </div>
      </div>
    </div>
  )
}

export default About
