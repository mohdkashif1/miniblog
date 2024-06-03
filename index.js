
const express = require('express')
const mongoose= require('mongoose')
const dotenv = require('dotenv')
const cors=require('cors');
const bodyParser=require('body-parser');
const connectDB = require('./config/db');
const morgan =require('morgan');
const fileUpload = require('express-fileupload');
const { publicRouter } = require('./routes/publicRoutes');
const { adminRouter } = require('./routes/adminRoutes');





const app=express()

dotenv.config()

connectDB()

app.use(cors())
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}


app.use(express.json({ limit: "50mb", extended: true, parameterLimit: 50000 }))
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(fileUpload())

app.get('/',(req,res)=>res.send('i am kashif'))
app.use('/',publicRouter)
app.use('/admin',adminRouter)


const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running on port ${PORT}`
  )
)