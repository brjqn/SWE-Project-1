const mongoose = require('mongoose')

// Added required statements paralleled to workout.models.js
const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    
    email:{
        type: String,
        required: true
    },

    password:{
        type: String,
        required: true
    },
})

const UserModel = mongoose.model("users", UserSchema)
module.exports = UserModel