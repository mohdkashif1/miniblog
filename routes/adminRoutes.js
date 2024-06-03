const express=require('express')
const { createPost, createAdmin, adminLogin, deletePostById, createCategory, CreateSubCategory, deleteCategoryById, deleteSubCategoryById } = require('../controllers/adminControllers')
const { getPosts, getPostById } = require('../controllers/publicControllers')

const { isAuth } = require('../middleware/authMiddleware')
const adminRouter=express.Router()

adminRouter.route('/login').post(adminLogin)
adminRouter.route('/create-post').post(isAuth,createPost)
adminRouter.route('/get-posts').get(isAuth,getPosts)
adminRouter.route('/get-post/:id').get(isAuth,getPostById)
adminRouter.route('/create-admin').post(createAdmin)
adminRouter.route('/delete-post').post(isAuth,deletePostById)
adminRouter.route('/delete-category').post(isAuth,deleteCategoryById)
adminRouter.route('/create-category').post(isAuth,createCategory)
adminRouter.route('/create-subcategory').post(isAuth,CreateSubCategory)
adminRouter.route('/delete-subcategory').post(isAuth,deleteSubCategoryById)

module.exports={adminRouter}