const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const bodyParser = require('body-parser')
const app = express()
let postRouter = require('./Router/postrouter')
const userRouter = require('./Router/userrouter')
mongoose.connect(process.env.mongourl).then((rec) => {
    console.log(`Data base connected successfully`)
}).catch(err => console.log(err))

app.use(bodyParser.json())
app.use('/', userRouter)
app.use('/', postRouter)
app.get('/', (req, res) => {
    res.send(`Hello from server!!!`)
})

app.listen(process.env.port, () => {
    console.log('Server is running')
})
