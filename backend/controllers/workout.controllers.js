import express from 'express';
import mongoose from 'mongoose';
import Workout from "../models/workout.models.js"

//This file defines the "functions" for querying the database, can update, delete, and add workout routines

export const getWorkout = async (req,res) => {
    try{
        const workouts = await Workout.find({}); //fetch all in database

        //fetches all in the database
        res.status(200).json({success: true, data: workouts});
    }catch (error){
        console.log("Cannot fetch workouts", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
}

export const createWorkout = async(req,res) => {
    const workout = req.body; //user will send this data

    if(!workout.Exercise || !workout.Equiptment || !workout.Exercise_Type || !workout.Major_Muscle){
        return res.status(400).json({ success:false, message:"Please provide all fields"});
        //above check to see if user put in all fields for json
    }
    const newWorkout = new Workout(workout);

    try{
        await newWorkout.save();
        //saves the workout in database
        res.status(201).json({succcess: true, data: newWorkout});
    } catch(error){
        console.error("Error in creating the workout:", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
}

//updates workout
export const updateWorkout = async (req, res) => {
    const {id} = req.params;

    const workout = req.body;
    
    //must have collection id for this

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message:"Workout not found"});
    }

    try{
        const updatedWorkout = await Workout.findByIdAndUpdate(id, workout, {new:true}); 
        res.status(200).json({success: true, data: updatedWorkout});
    }catch(error){
        res.satus(500).json({success:false, message: "Server Error"});
    }
}

//controller funciton uses mongoose to communicate with database