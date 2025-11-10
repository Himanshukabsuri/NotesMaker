import express from 'express'
import User from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const router = express.Router()


router.post('/register',async(req,res)=>{
    try {
        const {email,password,username} = req.body

        // check if user is already exists

        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).json({message:"User is already exists"})
        }

        // hash password
        const hashPassword = await bcrypt.hash(password,10)

        // create new user

        const user = new User({username,email,password:hashPassword})
        await user.save();

        res.status(201).json({message:"User registered successfully"});
    } catch (error) {
        res.status(500).json({message:"Registered failed",error:error.message})
    }
})

router.post('/login',async(req,res)=>{
    try {

        const JWT_SECRET = process.env.JWT_SECRET
        const {email,password} = req.body

        // check if user exists
        const user = await User.findOne({email});

        if (!user) {
            return res.status(400).json({message:"user not found"})
        }

        // compare password

        const isPasswordMatch = await bcrypt.compare(password,user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({message:"Invalid password"});
        }
        

        // generate jwt token

        const token = jwt.sign({id:user._id},JWT_SECRET,{expiresIn:"1d"});
        res.json({
            message:"Login Successfully",
            token,
            user:{id:user._id,username:user.username,email:user.email},
        })
    } catch (error) {
        res.status(500).json({message:"Login Failed",error:error.message})
    }
})

export default router