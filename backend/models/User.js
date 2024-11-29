const mongoose = require('mongoose')

const goalSchema = new mongoose.Schema({
    //Name of exercise in string format
    ExerciseName: {type:String, required: true},
    //date of goal which is of goal format
    assigned_date: {type:Date, default:Date.now},
    //weight if used in the exercise
    weight:{type: Number, required: false},
    //repetitions if used in the exercise
    repetitions:{type: Number, required: false},
    //time it takes to complete exercise
    time:{type: Number, required: false}
})

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true 
    },
    email:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    //this is an array of created user goals
    goalArray:[goalSchema]
});

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;

