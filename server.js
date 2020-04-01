const express = require('express')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')



const app = express()
const server = http.createServer(app)
const io = socketio(server)


app.use(express.static(path.join(__dirname,'public')))

io.on('connection', socket => {
    console.log('new web socket connection')
})

server.listen(8080 || process.env.PORT, () => {
    console.log(`Server Listening`)
})