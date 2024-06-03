const mongoose=require('mongoose')

const categorySchema=mongoose.Schema({
    title:{
        type:String,
        required:true,
    },  
      image:{
        type:String,
        required:true,
      },
      image_public_id:{
        type:String,
        required:true,
      },

   
},{timestamps:true})

const Category=mongoose.model('Category',categorySchema)
module.exports=Category