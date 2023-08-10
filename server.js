const express = require('express')
const mongoose = require('mongoose')
const PORT = 8080
const bodyParser = require('body-parser')
const app = express()
const userRouter = require('./Router/userrouter')
mongoose.connect(`mongodb://localhost:27017/registeredUsers`).then(() => {
    console.log(`Data base connected successfully`)
}).catch(err => console.log(err))

app.use(bodyParser.json())
app.get('/', (req, res) => {
    res.send(`Hello from server!!!`)
})
app.use('/', userRouter)
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
