const {Schema , model} = require('mongoose');

const blogSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true,
    },
    coverimageURL:{
        type:String,
        required:false,
    },
    createdby:{
        type:Schema.Types.ObjectId,
        ref:"user"
    }
})