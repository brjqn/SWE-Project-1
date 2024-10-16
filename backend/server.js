import express from 'express';
import dotenv from "dotenv";
import path from 'path';
import {connectDB} from "./config/db.js";
import workoutRoutes from "./routes/workout.routes.js";

//this file does the heavy lifting for the connections of Node to MongoDB

dotenv.config();

const app = express();

app.use(express.json()); //allows us to accept json data in req.body 

const PORT = process.env.PORT || 5000; //runs on local machine for now

const __dirname = path.resolve();

app.use("/api/workouts",workoutRoutes);

 app.listen(PORT, ()=> {
    connectDB();
    console.log("Server started at http://localhost:" + PORT);
});

//route for api 
//config for .env create content bc call dotenv