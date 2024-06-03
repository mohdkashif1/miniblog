const Admin = require("../modals/adminModal")
const cloudinary = require('cloudinary').v2
let streamifier = require('streamifier');
const {generateToken}=require('../utils/generateToken')
const Post=require('../modals/postModal')
const Category=require('../modals/categoryModal')
const SubCategory=require('../modals/subCategoryModal')
cloudinary.config({ 
    cloud_name: 'mohdkashif', 
    api_key: '371355849148532',
    api_secret: 'TFb4rdOUXwY3akvM9uNxNF0-Fk0'
});


const remove = (id)=>{
    let image_id=id
    
    cloudinary.uploader.destroy(image_id,(err,result)=>{
        if(err) return 
       console.log('Ok')
    });
    }

const adminLogin=async(req,res)=>{
    const {userDetails}=req.body
    const {email,password}=userDetails
   
    
        const admin=await Admin.findOne({email})

        if(admin && (await admin.matchPassword(password))){
            res.send({
                admin:admin.name,
                email:admin.email,
                token:generateToken(admin._id)

            })
        }else{
            res.send({
                error:"not found!"
            })
        }
    
}



const createPost=async(req,res)=>{
    const {content,title,subTitle,id,category,subCategory}=req.body
        
try{
    if(req.files){
        const file=req.files.file.data
        let myFile = req.files.file.name.split(".")
        let imgName=myFile[0]
        if(id){

            const oldPost=await Post.findById(id)

            await remove(oldPost.image_public_id)

            let cld_upload_stream = cloudinary.uploader.upload_stream(
                {
                  folder: "my-blog",
                  public_id: imgName,
                  quality:30
                },
               async  function(error, result) {
                   if(error) return res.send({error:'error'})
        
                   oldPost.title=title,
                   oldPost.subTitle=subTitle
                    oldPost.category=category,
                    oldPost.subCategory=subCategory  
                   oldPost.image=result.url,
                   oldPost.writer=oldPost.writer,
                   oldPost.content=content
                   oldPost.image_public_id=result.public_id
                   await oldPost.save()
                   
                   res.send(oldPost)
                   
                   
        
                 
                }
            );
         
          streamifier.createReadStream(file).pipe(cld_upload_stream);

        }else{
            let cld_upload_stream = cloudinary.uploader.upload_stream(
                {
                  folder: "my-blog",
                  public_id: imgName,
                  quality:30
                },
               async  function(error, result) {
                   if(error) return res.send({error:'error'})
        
                   const post=await Post.create({
                       title:title,
                       subTitle:subTitle,
                       category:category,
                       subCategory:subCategory,
                       content:content,
                       writer:req.admin._id,
                       image:result.url,
                       image_public_id:result.public_id
                   })
                   
                   res.send(post)
        
                 
                }
            );
         
          streamifier.createReadStream(file).pipe(cld_upload_stream);
        }
   

    }else{
        const edit=await Post.findById(id)
        edit.title=title,
        edit.category=category,
        edit.subCategory=subCategory,
        edit.subTitle=subTitle,
        edit.content=content,
        edit.writer=edit.writer,
        edit.image=edit.image,
        edit.image_public_id=edit.image_public_id
                   await edit.save()
                return   res.send(edit)
    }


}catch(err){
    res.send({error:err.message})
}


    
}


const createAdmin=async(req,res)=>{
    const {name,email,password}=req.body
    const userExists = await Admin.findOne({email})
if(userExists){
    res.status(400)
    throw new Error('Already exists')
}
const user = await Admin.create({
    name,
    email,
    password
})
if(user){
    res.status(201).json({
       message:"success"
    
    })
}
else{
    res.status(400)
    throw new Error('Invalid user data')
  }
  
}


const deletePostById=async(req,res)=>{
    const {id}=req.body
    try{
        await Post.findByIdAndRemove(id)
        res.send({
            message:'Post Deleted!'
        })
    }catch(err){
        res.send({
            error:err.message
        })
    }
    

    
}

const createCategory=async(req,res)=>{
    const {title,id}=req.body
  console.log(req.files)
    
try{
    if(req.files){
        console.log(title)
        const file=req.files.file.data
        let myFile = req.files.file.name.split(".")
        let imgName=myFile[0]
        if(id){

            const oldPost=await Category.findById(id)

              await remove(oldPost.image_public_id)

            let cld_upload_stream = cloudinary.uploader.upload_stream(
                {
                  folder: "category",
                  public_id: imgName,
                  quality:30
                },
               async  function(error, result) {
                   if(error) return res.send({error:'error'})
        
                  
                   oldPost.title=title,
                      
                   oldPost.image=result.url,
                   oldPost.image_public_id=result.public_id
                   await oldPost.save()
                   
                   res.send(oldPost)
        
                 
                })
                 
          streamifier.createReadStream(file).pipe(cld_upload_stream);
          
        }else{
           
            let cld_upload_stream = cloudinary.uploader.upload_stream(
                {
                  folder: "category",
                  public_id: imgName,
                  quality:30
                },
               async  function(error, result) {
                   if(error) return res.send({error:'error'})
        
                   const post=await Category.create({
                       title:title,
                      
                       image:result.url,
                       image_public_id:result.public_id
                   })
                   
                   res.send(post)
        
                 
                })
                 
          streamifier.createReadStream(file).pipe(cld_upload_stream);
          
        }
    }else{
console.log('imin')

        const oldPost=await Category.findById(id)
 
        oldPost.title=title,
                
        oldPost.image=oldPost.image,
        oldPost.image_public_id=oldPost.image_public_id
        await oldPost.save()
        
        res.send(oldPost)
    

    }
      }catch(err){
        res.send({
            error:err.message

        })
    }


}


const CreateSubCategory=async(req,res)=>{
 const {title,category,id}=req.body
 try{
     if(id){
         const alreadyExist=await SubCategory.findById(id)
         alreadyExist.title=title
         alreadyExist.category=category
         await alreadyExist.save()
         res.send({
             message:'Update Success!'
         })
     }else{
         await SubCategory.create({
             title,
             category
         })

         res.send({
             message:'Created SubCategory!'
         })
     }

 }catch(err){
     res.send({
         error:err.message
     })
 }
}


const deleteSubCategoryById=async(req,res)=>{
    const {id}=req.body
    try{
        await SubCategory.findByIdAndRemove(id)
        res.send({
            message:'SubCategory Deleted!'
        })
    }catch(err){
        res.send({
            error:err.message
        })
    }
    

    
}


const deleteCategoryById=async(req,res)=>{
    const {id}=req.body
    try{
        await Category.findByIdAndRemove(id)
        res.send({
            message:'Category Deleted!'
        })
    }catch(err){
        res.send({
            error:err.message
        })
    }
    

    
}


module.exports={createPost,createAdmin,adminLogin,deletePostById,createCategory,CreateSubCategory,deleteSubCategoryById,deleteCategoryById}