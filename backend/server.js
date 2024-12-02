const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const UserModel = require('./models/User')
const ExercisesModel = require('./models/workout.models')


const app = express()
app.use(express.json())
app.use(cors())
mongoose.connect("mongodb+srv://gitfit_user:GitFit123@workout-routines.r8hts.mongodb.net/users")
    .then(() => console.log("Database Exercise connected successfully"))
    .catch(err => console.error("Database connection error:", err))

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
         // Check if the email already exists in the database
         //needs collection users
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
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

app.post('/exercise-list/add-exercise/', async (req,res) =>{
    //this is the post to populate the exercise data in the collection users
    //it adds to the schema and posts to mongodb
    const {Exercise, Equiptment, Exercise_Type, Major_Muscle, Minor_Muscle, Example, Notes, Modifications, User_Made} = req.body;

    try{
        const existingExercise = await ExercisesModel.findOne({Exercise});
        if (existingExercise) {
            return res.status(400).json({ message: "Exercise already exists" });
        }
        const newExercise = new ExercisesModel({ Exercise, Equiptment, Exercise_Type, Major_Muscle, Minor_Muscle, Example, Notes, Modifications, User_Made:true});
        await newExercise.save();
        return res.status(201).json({ message: "Exercise successfully created" });

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
    const {email, ExerciseName, assigned_date, weight, repetitions, time} = req.body;
    try{
        const addGoal = await UserModel.findOneAndUpdate(
            {email},
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
        );
        if(!addGoal){
            return res.status(404).json({message:"User not found"});
        }
        return res.status(200).json({message: "Goal added successfully", user:addGoal});
    }
    catch(error){
        console.error("Error adding goal:", error);
        return res.status(500).json({message:"Server error"});
    }
})

app.listen(5001, () => {
    console.log("server is running")
})