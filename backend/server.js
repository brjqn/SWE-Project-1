require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require('./models/User');
const ExercisesModel = require('./models/workout.models');
const validator = require('validator');

let corsOptions = {
    origin: (origin, callback) => {
        origin?.startsWith('http://localhost:5173') ? callback(null, true) : callback(new Error('Not allowed by CORS'));
    }
};
  

let app = express();
app.use(express.json());
app.use(cors(corsOptions));
app.disable('x-powered-by');
const databaseURI = process.env.MONGO_URI;
mongoose.connect(databaseURI)
    .then(() => console.log("Database Exercise connected successfully"))
    .catch(err => console.error("Database connection error:", err));

app.post('/register', async (req, res) => {
    //Block?
    const { name, email, password } = req.body;
    if (!email || !validator.isEmail(email)) {
        return res.json("Invalid email format" );
    }
    const sanitizedEmail = validator.normalizeEmail(email);
    let query = { email: sanitizedEmail };

    try {
         // Check if the email already exists in the database
         //needs collection users
        const existingUser = await UserModel.findOne(query).exec();
        if (existingUser) {
            return res.json("Email already exists" );
        }

        // If email doesn't exist, create the new user
        const newUser = new UserModel({ name, email, password, goalArray: [] });
        await newUser.save();
        return res.status(201).json({ message: "User registered successfully" });

    } 
    
    catch (error) {
        console.error("Error during user registration:", error);
        return res.status(500).json({ message: "Server error" });
    }
});

app.post('/login', async (req, res) => {
    if(!req.body.email || !req.body.password){
        return res.json("Email has not been registered");
    }
    if (!req.body.email || !validator.isEmail(req.body.email)) {
        return res.json("Invalid email format" );
    }
    const sanitizedEmail = validator.normalizeEmail(req.body.email);
    let query = { email: sanitizedEmail };

    try{
      const user = await UserModel.findOne(query).exec();
        if (user) {
            if (user.password === req.body.password) {
                res.json("Success");
            }
            else {
                res.json("Password is Incorrect");
            }
        }
        else {
            res.json("Email has not been registered");
        }  
    }
    catch(err){
        console.error("Database query error", err);
        return res.status(500).json({error:"Internal server error"});
    }
    
});

app.post('/exercise-list/add-exercise/', async (req,res) =>{
    //this is the post to populate the exercise data in the collection users
    //it adds to the schema and posts to mongodb
    const {Exercise, Equipment, Exercise_Type, Major_Muscle, Minor_Muscle, Example, Notes, Modifications} = req.body;
    let query = {
        Exercise:req.body.Exercise.toString().trim(),
    };
    try{
        const existingExercise = await ExercisesModel.findOne(query).exec();
        if (existingExercise) {
            return res.json("Exercise already exists" );
        }
        const newExercise = new ExercisesModel({ Exercise, Equipment, Exercise_Type, Major_Muscle, Minor_Muscle, Example, Notes, Modifications, User_Made:true});
        await newExercise.save();
        return res.json("Exercise successfully created");

    }
    catch(error){
        console.error("Error in creating new exercise", error);
        return res.status(500).json({ message: "Server error" });
    }
});

app.get('/exercise-list', async (req, res) => {
    //this is to get all data for the drop down list selection in exercise list
    try {
        const allData = await ExercisesModel.find({});
        res.status(200).json(allData);
    }
    catch (error){
        console.error("Error fetching data:", error);
        res.status(500).json({message: "Server error"});
    }
});

app.get('/track-workout', async (req, res) => {
    //this is to get all data for the drop down list selecetion in track workout
    try {
        const allData = await ExercisesModel.find({});
        res.status(200).json(allData);
    }
    catch (error){
        console.error("Error fetching data:", error);
        res.status(500).json({message: "Server error"});
    }
});

app.post('/track-workout', async (req, res)=>{
    //this is to create a goal underneath of the users schema
    const {ExerciseName, assigned_date, weight, repetitions, time} = req.body;
    try{
        if (!req.body.email || !validator.isEmail(req.body.email)) {
            return res.json("Invalid email format" );
        }
        const sanitizedEmail = validator.normalizeEmail(req.body.email);
        let query = { email: sanitizedEmail };
    
        const addGoal = await UserModel.findOneAndUpdate(
            query,
            {
                $push:{
                    goalArray:{
                        ExerciseName,
                        assigned_date: new Date(assigned_date),
                        weight,
                        repetitions,
                        time
                    }
                }
            },
            {new: true}
        ).exec();
        if(!addGoal){
            return res.status(404).json({message:"User not found"});
        }
        return res.status(200).json({message: "Goal added successfully", user:addGoal});
    }
    catch(error){
        console.error("Error adding goal:", error);
        return res.status(500).json({message:"Server error"});
    }
});

app.listen(5001, () => {
    console.log("server is running");
})