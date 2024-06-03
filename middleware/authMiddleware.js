const jwt =require ('jsonwebtoken');
const Admin = require('../modals/adminModal');



const isAuth = async(req,res,next)=>{
    let token
    console.log('hii')
    if(req.headers.authorization && 
       req.headers.authorization.startsWith('Bearer')){
      try{
          token=req.headers.authorization.split(' ')[1]
          const decoded=jwt.verify(token, process.env.JWT_SECRET)

req.admin = await Admin.findById(decoded.id).select('-password')
next()

      }catch(error){
  console.log(error)
    res.status(401).json({message:'Not authorised token failed'})
 
      }
    }
    if(!token){
        res.status(401).json({message:'Not authorised no token'})
        
    }
   

   
}


module.exports={isAuth}

