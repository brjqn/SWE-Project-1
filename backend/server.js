const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const UserModel = require('./models/User')

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://gitfit_user:GitFit123@workout-routines.r8hts.mongodb.net/users");

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if the email already exists in the database
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // If email doesn't exist, create the new user
        const newUser = new UserModel({ name, email, password });
        await newUser.save();
        return res.status(201).json({ message: "User registered successfully" });

    } 
    
    catch (error) {
        console.error("Error during user registration:", error);
        return res.status(500).json({ message: "Server error" });
    }
});

app.listen(5001, () => {
    console.log("server is running")
})