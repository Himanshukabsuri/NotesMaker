import express from 'express'
import User from '../models/user.js'
import Note from '../models/note.js'

const router = express.Router()

// Add note
router.post('/add-note', async (req, res) => {
    try {
        const { title, body, email } = req.body

        // Check if user exists
        const existingUser = await User.findOne({ email })
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" })
        }

        // Create new note
        const note = new Note({
            title,
            body,
            User: existingUser._id  // Fixed: Changed 'user' to 'User' to match schema
        })
        await note.save()

        // Add the note to user's list of notes
        existingUser.Note.push(note._id)
        await existingUser.save()

        // Return response 
        res.status(200).json({ message: "Note added successfully", note })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error creating note", error: error.message })
    }
})

// Update note
router.put('/update-note/:id', async (req, res) => {
    try {
        const { title, body, email } = req.body
        const existingUser = await User.findOne({ email })
        
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" })
        }

        const note = await Note.findByIdAndUpdate(
            req.params.id,
            { title, body },
            { new: true }  // Return updated document
        )

        if (!note) {
            return res.status(404).json({ message: "Note not found" })
        }

        res.status(200).json({ message: "Note updated successfully", note })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error updating note", error: error.message })
    }
})

// Delete note
router.delete('/delete-note/:id', async (req, res) => {
    try {
        const { email } = req.body
        
        const existingUser = await User.findOneAndUpdate(
            { email },
            { $pull: { Note: req.params.id } },
            { new: true }
        )

        if (!existingUser) {
            return res.status(404).json({ message: "User not found" })
        }

        const note = await Note.findByIdAndDelete(req.params.id)
        
        if (!note) {
            return res.status(404).json({ message: "Note not found" })
        }

        res.status(200).json({ message: "Note deleted successfully" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error deleting note", error: error.message })
    }
})

// Get all notes for a user
router.get('/get-note/:userId', async (req, res) => {
    try {
        // Fixed: Use userId from params
        const notes = await Note.find({ User: req.params.userId })
            .sort({ createdAt: -1 })

        if (notes.length !== 0) {
            res.status(200).json({ note: notes })
        } else {
            res.status(200).json({ message: "No notes found", note: [] })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error fetching notes", error: error.message })
    }
})

export default router