const mongoose=require('mongoose')

const commentSchema=mongoose.Schema({
   
      writerName:{
        type:String,
        required:true
      },
      writerEmail:{
        type:String,
        required:true
      },
      
      post:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Post',
      },

    content:{
        type:String,
        required:true
    }

     

   
},{timestamps:true})

const Comment=mongoose.model('Comment',commentSchema)
module.exports=Comment