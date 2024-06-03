const Category = require("../modals/categoryModal")
const Comment = require("../modals/commentsModal")
const Post = require("../modals/postModal")
const SubCategory = require("../modals/subCategoryModal")
const mongoose=require('mongoose')
const ReplyComment = require("../modals/replyCommentModal")
const getPosts=async(req,res)=>{
    
    try{
        const posts=await Post.find()
        res.send(posts)
    }catch(err){
        res.send({
            error:err.message
        })
    }
}



const getPostById=async(req,res)=>{
   const {id}=req.params
    
    try{
        const posts=await Post.findById(id).populate('writer')
        res.send(posts)
    }catch(err){
        res.send({
            error:err.message
        })
    }
}

const getCategories=async(req,res)=>{
    const categories=await Category.aggregate([
        {
            $lookup: {
              from: "subcategories",
              localField: "_id",
              foreignField: "category",
              as: "subCategories"
            },
            
        },
       
          
     ])
    if(categories){
        res.send(categories)
    }else{
        res.send({
            error:"Something went wrong!"
        })
    }

}

const getCategoryById=async(req,res)=>{
    const {id}=req.params
    const categories=await Category.findById(id)
    if(categories){
        res.send(categories)
    }else{
        res.send({
            error:"Something went wrong!"
        })
    }

}

const getSubCategories=async(req,res)=>{
    const {id}=req.body
    const subCategories=await SubCategory.find({category:id})
    if(subCategories){
        res.send(subCategories)
    }else{
        res.send({
            error:"Something went wrong!"
        })
    }

}

const getAllSubCategories=async(req,res)=>{
  
    const subCategories=await SubCategory.find()
    if(subCategories){
        res.send(subCategories)
    }else{
        res.send({
            error:"Something went wrong!"
        })
    }

}

const getSubCategoryById=async(req,res)=>{
    const {id}=req.params
    const categories=await SubCategory.findById(id)
    if(categories){
        res.send(categories)
    }else{
        res.send({
            error:"Something went wrong!"
        })
    }

}



const getLetestPosts=async(req,res)=>{
    const post =await Post.find().sort({createdAt: -1}).limit(3)

    if(post){
        res.send(post)
    }else{
        res.send({
            error:"Something went Wrong!"
        })
    }
}

const getAllPosts=async(req,res)=>{
    const post =await Post.find()

    if(post){
        res.send(post)
    }else{
        res.send({
            error:"Something went Wrong!"
        })
    }
}

const getPopularPosts=async(req,res)=>{
    const post =await Post.aggregate([
        {$unwind: "$likes"},
        {$group: {_id: "$user_id", likesCount: {$sum: 1}}},
        {$sort: {likesCount: -1}},
        {$limit: 10},
        {$project: {_id: 1}}
      ])

    if(post){
        res.send(post)
    }else{
        res.send({
            error:"Something went Wrong!"
        })
    }
}


const commentOnPost=async(req,res)=>{
    const {writer,post,content,responseTo,attachedName}=req.body
    try{
        if(responseTo){
            const comment=await ReplyComment.create({
                responseTo:responseTo,
                attachedName:attachedName,
                writerName:writer.name,
                writerEmail:writer.email,
                post:post,
                content:content
            })
    
            res.send(comment)
        }else{
            const comment=await Comment.create({
                writerName:writer.name,
                writerEmail:writer.email,
                post:post,
                content:content
            })
    
            res.send(comment)
        }
       
    }catch(err){
        res.send({
            error:err.message
        })
    }
}


const getComments=async(req,res)=>{
    const {post}=req.body
    console.log(post)
    try{
        const comments=await Comment.aggregate([
   
            {
                $lookup: {
                  from: "replycomments",
                  localField: "_id",
                  foreignField: "responseTo",
                  as: "replies"
                },
                
            },
            {
                $match: {
                     
                    post:mongoose.Types.ObjectId(post)
                    
                
                }
            }
        ])
        res.send(comments)
    }catch(err){
res.send({
    error:err.message
})
    }


    
}

module.exports={getPosts,getPostById,
    getCategories,getSubCategories,
    getCategoryById,getSubCategoryById,
    getAllSubCategories,getLetestPosts,
    commentOnPost,getComments,getAllPosts}