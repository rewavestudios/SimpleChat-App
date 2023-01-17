var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var http = require('http').server(app)
var io = require('socket.io')(http)
var mongoose = require('mongoose')

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

var dbUrl = 'mongodb+srv://webdevpr:<225883>@cluster0.1agwbe6.mongodb.net/test'
//need to make a configuration file for security

var messages = [
    {name: 'Tim', messages: 'Hi'},
    {name: 'Jane', messages: 'Hello'}
]

app.get('/messages', (req, res) => {
    res.send(messages)
})

app.post('/messages', (req, res) => {
    messages.push(req.body)
    io.emit('message', req.body)
    res.sendStatus(200)
})

io.on('connection', (Socket) => {
    console.log('a user connected')
})


mongoose.connect(dbUrl, {useMongoClient: true}, (err) = {
    console.log('mongo db connection', err)
})

var server = http.listen(3000, () => {
    console.log('server is listening on port', server.address().port)
})
