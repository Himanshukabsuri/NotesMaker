import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { addNote, getNotes, deleteNote, updateNote } from '../api/api.js'
import Update from '../pages/Update'
import Navbar from '../components/Navbar'

const Note = () => {
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuth()
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState({ title: '', body: '' })
  const [editTask, setEditTask] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/sign-in')
      return
    }
    fetchNotes()
  }, [isAuthenticated, navigate])

  const fetchNotes = async () => {
    if (!user) return
    
    try {
      setLoading(true)
      const response = await getNotes(user.id)
      if (response.note) {
        setTasks(response.note)
      }
    } catch (err) {
      console.error('Error fetching notes:', err)
      setError('Failed to load notes')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value })
  }

  const handleAdd = async () => {
    if (!newTask.title.trim() || !newTask.body.trim()) {
      setError('Please fill in both title and description')
      return
    }

    try {
      setLoading(true)
      setError('')
      const response = await addNote({
        title: newTask.title,
        body: newTask.body,
        email: user.email
      })
      
      setTasks([response.note, ...tasks])
      setNewTask({ title: '', body: '' })
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add note')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this note?')) return

    try {
      setLoading(true)
      await deleteNote(id, user.email)
      setTasks(tasks.filter((t) => t._id !== id))
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete note')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdate = async (updated) => {
    try {
      setLoading(true)
      await updateNote(editTask._id, {
        title: updated.title,
        body: updated.body,
        email: user.email
      })
      
      setTasks(tasks.map((t) => 
        t._id === editTask._id ? { ...t, title: updated.title, body: updated.body } : t
      ))
      setEditTask(null)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update note')
    } finally {
      setLoading(false)
    }
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-md p-6">
          <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
            My Notes
          </h1>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <input
              type="text"
              name="title"
              value={newTask.title}
              onChange={handleChange}
              placeholder="Note Title"
              className="w-full sm:w-1/3 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <input
              type="text"
              name="body"
              value={newTask.body}
              onChange={handleChange}
              placeholder="Note Description"
              className="w-full sm:flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <button
              onClick={handleAdd}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-5 py-2 transition duration-200 disabled:bg-blue-400"
            >
              {loading ? 'Adding...' : 'Add'}
            </button>
          </div>

          {loading && tasks.length === 0 ? (
            <p className="text-gray-500 text-center">Loading notes...</p>
          ) : tasks.length === 0 ? (
            <p className="text-gray-500 text-center">No notes yet. Add one above!</p>
          ) : (
            <div className="space-y-4">
              {tasks.map((task) => (
                <div
                  key={task._id}
                  className="border border-gray-200 rounded-lg p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-50"
                >
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">{task.title}</h2>
                    <p className="text-gray-600">{task.body}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(task.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2 mt-3 sm:mt-0">
                    <button
                      onClick={() => setEditTask(task)}
                      className="px-4 py-1 bg-green-500 hover:bg-green-600 text-white rounded-lg transition duration-200"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="px-4 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg transition duration-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Update Modal */}
        {editTask && (
          <Update
            task={editTask}
            onUpdate={handleUpdate}
            onClose={() => setEditTask(null)}
          />
        )}
      </div>
    </div>
  )
}

export default Note