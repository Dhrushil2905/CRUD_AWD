const express = require('express')
const app = express()
app.use(express.json())
app.use(express.static(__dirname))
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/MCA_DB')
const db = mongoose.connection
//const db = mongoose.connections
db.on('connected', () => {
    console.log('MongoDb Connected')
})
const userSchema = new mongoose.Schema({
    userID: String,
    userName: String,
    userRole: String,
    age: Number
})

const user = mongoose.model('user', userSchema, "user")

app.get('/api/getUserData', (req, res) => {
    user.find().then((data) => {
        res.json(data)
    })
})
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/userinsert.html')
})

app.post('/api/addUser', (req, res) => {
    user.create({
        userID: req.body.userID,
        userName: req.body.userName,
        userRole: req.body.userRole,
        age: req.body.age
    }).then((newData) => {
        res.json(newData)
    })
})

app.delete('/api/delete/:id', (req, res) => {
    let id = req.params.id
    user.deleteOne({ userID: id }).then((data) => {
        res.json(data)
    })
})

app.put('/api/update/:id', (req, res) => {
    let id = req.params.id
    let updateItemData = req.body
    user.updateOne({ userID: id }, updateItemData).then((data) => {
        res.json(data)
    })
})

app.listen(5000, () => {
    console.log('Server Started on port 5000')
    

})


