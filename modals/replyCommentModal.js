const mongoose=require('mongoose')

const replySchema=mongoose.Schema({
   
      attachedName:{
         type:String,
        required:true
      },
      responseTo:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Comment',
      },
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

const ReplyComment=mongoose.model('ReplyComment',replySchema)
module.exports=ReplyComment