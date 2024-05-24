const mongoose =require('mongoose');

const TodoSchema=new mongoose.Schema({
    title:{type:String,required:true},
    completed:{type:Boolean,default:false},
    userId:{type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
},{timestamps:true})

const Todo=mongoose.model('Todo',TodoSchema);

module.exports=Todo;