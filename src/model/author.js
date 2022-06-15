const mongoose = require('mongoose');

const authorSchema = mongoose.Schema({
    authorFirstName:{
        type: String,
        required: true
    },
    authorLastName:{
        type: String,
        required:true
    },
    gender:{
        type: String,
        enum:["Male","Female"],
        required: true
    },
    email:{
        type: String,
        lowercase: true,
        unique: true,
        required :[true , "Email Required"],
       
    }

});

const Author = mongoose.model("Author",authorSchema);
module.exports=Author;
