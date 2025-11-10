import React, { useState } from 'react'

const Update = ({ task, onUpdate, onClose }) => {
  const [updatedTask, setUpdatedTask] = useState({
    title: task?.title || '',
    body: task?.body || ''
  })

  const handleChange = (e) => {
    setUpdatedTask({ ...updatedTask, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!updatedTask.title.trim() || !updatedTask.body.trim()) return
    onUpdate(updatedTask)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">Update Task</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Task Title</label>
            <input
              type="text"
              name="title"
              value={updatedTask.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Task Description</label>
            <input
              type="text"
              name="body"
              value={updatedTask.body}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-lg transition duration-200"
            >
              Close
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition duration-200"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Update
