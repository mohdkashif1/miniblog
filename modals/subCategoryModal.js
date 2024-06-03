const mongoose=require('mongoose')

const subCategorySchema=mongoose.Schema({
    title:{
        type:String,
        required:true,
    },  
    category:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Category',
      },

   
},{timestamps:true})

const SubCategory=mongoose.model('SubCategory',subCategorySchema)
module.exports=SubCategory