const express = require('express')
const connectDb = require('./config/connectDb')
require('colors')

require('dotenv').config()

const PORT = process.env.PORT || 5000

const app = express()

connectDb()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get('/',(req,res) => {
  res.json({
    message:"Server running"
  })
})

app.use('/posts',require('./routes/post'))

app.listen(PORT,error => {
  if ( error) console.log(`There is an error`.bgRed.bold,error)
  console.log(`Server is running on http://localhost:${PORT}`.blue.bold)
})