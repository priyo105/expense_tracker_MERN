    
const mongoose=require('mongoose')

const categorySchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },  

    description:{
        type:String
    },

    isIncomeSource:{
        type:Boolean
    },

    colorCode:{
        type:String
    },
    icon:{
        type:String
    },
    status:{
        type:String,
        required:true
    },
    creationDate:{
        type:Date,
        default:Date.now
    }
  
})


exports.Category=mongoose.model('category',categorySchema);
