const mongoose=require('mongoose')

const likesSchema=mongoose.Schema({
   
      user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      },
      post:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Post',
      },

     

   
},{timestamps:true})

const Like=mongoose.model('Like',likesSchema)
module.exports=Like