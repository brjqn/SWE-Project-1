const mongoose = require('mongoose')

//this file is designed to represent the needed data fields for defining a workout 'object'
//uses json



const ExercisesSchema = new mongoose.Schema({
    //schema are all of the available fields
    Exercise:{
        type: String,
        required: true
    },
    Equiptment:{
        type: String,
        required: true
    },
    Exercise_Type:{
        type: String,
        required: true
    },
    Major_Muscle:{
        type: String,
        required: true
    },
    Minor_Muscle:{
        type: String,
        required: false
    },
    Example:{
        type: String,
        required: false
    },
    Notes:{
        type: String,
        required: false
    },
    Modifications:{
        type: String,
        required: false
    },
    User_Made:{
        type:Boolean,
        required:true
    },


}, {collection: "exercises"})

const ExercisesModel = mongoose.model('Exercises', ExercisesSchema);
//should create model and schema 
module.exports = ExercisesModel