import express from 'express';
import {getWorkout, createWorkout, updateWorkout} from "../controllers/workout.controllers.js";

//this file just acts to modularize the connections away from the commands being called. 
const router = express.Router();

router.get("/", getWorkout);
//gets all workouts in database

router.post("/", createWorkout);
//creates a workout in database

//put method for updating all fields patch for only one field
router.put("/:id", updateWorkout);
//updates info in specific workout

//exports for other files to use
export default router;

//routes with methods and endpoints