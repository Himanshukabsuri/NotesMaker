import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDb from './database/db.js'
import userRoutes from './routes/userRoutes.js'
import noteRoutes from './routes/noteRoutes.js'


const app = express()
app.use(express.json())
app.use(cors())
dotenv.config();

connectDb()


const PORT = process.env.PORT || 2000
app.use('/api/users',userRoutes)
app.use('/api/note',noteRoutes)

app.get('/',(req,res)=>{
    res.send("server is live")
})

app.listen(PORT,()=>{
    console.log(`Server Started : http://localhost:${PORT}`);
    
})