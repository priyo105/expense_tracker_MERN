    
const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    },
    passwordHash:{
        type:String,
        required:true
    },
    isSocialMediaAuth:{
        type:Boolean,
        required:true
    }
})

exports.User=mongoose.model('users',userSchema);
