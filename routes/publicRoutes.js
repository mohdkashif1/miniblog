const express=require('express')
const { getPosts, getCategories, getCategoryById, getSubCategories, getAllSubCategories, getLetestPosts, getPostById, commentOnPost, getComments, getAllPosts } = require('../controllers/publicControllers')


const publicRouter=express.Router()

publicRouter.route('/get-posts').post(getPosts)
publicRouter.route('/get-categories').get(getCategories)
publicRouter.route('/category/:id').get(getCategoryById)
publicRouter.route('/get-subcategories').post(getSubCategories)
publicRouter.route('/get-sub-categories').get(getAllSubCategories)
publicRouter.route('/subcategory/:id').get(getCategories)

publicRouter.route('/get-letest-posts').get(getLetestPosts)
publicRouter.route('/get-all-posts').get(getAllPosts)
publicRouter.route('/post/:id').get(getPostById)

publicRouter.route('/comment').post(commentOnPost)
publicRouter.route('/get-comments').post(getComments)

module.exports={publicRouter}