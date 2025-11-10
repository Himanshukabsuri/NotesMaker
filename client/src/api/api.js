// src/api/api.js
import axios from 'axios'

const API_BASE_URL = 'http://localhost:2000/api'

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// User API calls
export const registerUser = async (userData) => {
  const response = await api.post('/users/register', userData)
  return response.data
}

export const loginUser = async (credentials) => {
  const response = await api.post('/users/login', credentials)
  return response.data
}

// Note API calls
export const addNote = async (noteData) => {
  const response = await api.post('/note/add-note', noteData)
  return response.data
}

export const updateNote = async (id, noteData) => {
  const response = await api.put(`/note/update-note/${id}`, noteData)
  return response.data
}

export const deleteNote = async (id, email) => {
  const response = await api.delete(`/note/delete-note/${id}`, { data: { email } })
  return response.data
}

export const getNotes = async (userId) => {
  const response = await api.get(`/note/get-note/${userId}`)
  return response.data
}

export default api