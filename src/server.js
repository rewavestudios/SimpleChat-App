var express = require('express')
var bodyParser = require('body-parser')
const { Socket } = require('dgram')
var app = express()
var http = require('http').server(app)
var io = require('socket.io')(http)

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

var messages = [
    {name: 'Tim', messages: 'Hi'},
    {name: 'Jane', messages: 'Hello'}
]

app.get('/messages', (req, res) => {
    res.send(messages)
})

app.post('/messages', (req, res) => {
    messages.push(req.body)
    res.sendStatus(200)
})

io.on('connection', (Socket) => {
    console.log('a user connected')
})

var server = http.listen(3000, () => {
    console.log('server is listening on port', server.address().port)
})
