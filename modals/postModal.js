const mongoose=require('mongoose')

const postSchema=mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    
    subTitle: {
        type:String,
        required:true,
      },
      content:{
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
      writer:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Admin',
      },
      category:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Category',
      },
      subCategory:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'SubCategory',
      }

   
},{timestamps:true})

const Post=mongoose.model('Post',postSchema)
module.exports=Post