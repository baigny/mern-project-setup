import jwt from "jsonwebtoken";
import User from "../models/user.js";

const generateToken = (user) => 
    jwt.sign({ id: user._id, isAdmin: user.isAdmin }, 
               process.env.JWT_SECRET, { expiresIn: "1h" });

export const register = async(req, res) =>{
    const{  username, email, password } = req.body;

    const  existing = await User.findOne({email})
    if (existing){
        return res.status(400).json({ message:"Email already registered"});
    }

    const user = await User.create({ username, email, password });
    const token = generateToken(user);
    res.status(201).json({
        message: "User registered successfully",
        token,
        user:{id: user._id, username:username, email:email}
    })
}

export const login = async(req, res) =>{
    const { email, password } = req.body;

    const user = await User.findOne({ email });
     if (!user){
        return res.status(401).json({ message: "Invalid credentials" });
     }

     const isMatch = await user.comparePassword(password);
     if (!isMatch){
        return res.status(401).json({ message: "Invalid credentials" });
     }

     res.status(200).json({ 
        message: "Login successful",
        token: generateToken(user),
        user: { id: user._id, username: user.username, email: user.email }
     });
}

export const me = async(req, res) =>{
    res.status(200).json({ user: req.user });
}