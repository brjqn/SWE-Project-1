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

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
        if (user.password === password) {
            res.json("Success")
        }
        else {
            res.json("Password is Incorrect")
        }
    }
    else {
        res.json("Email has not been registered")
    }
});

app.listen(5001, () => {
    console.log("server is running")
})