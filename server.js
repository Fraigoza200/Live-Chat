const express = require('express')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')
const formatMessage = require('./utils/messages')
const { userJoin, getCurrentUser } = require('./utils/users')



const app = express()
const server = http.createServer(app)
const io = socketio(server)


app.use(express.static(path.join(__dirname,'public')))

const botName = 'ChatCord Bot'

io.on('connection', socket => {

    socket.on('joinRoom', ({username, room}) => {
        const user = userJoin(socket.id,username,room)

        socket.join(user.room)

        socket.emit('message', formatMessage(botName,'Welcome to ChatCord'))
    
        // BroadCast all clients that are connecting except the person who is connecting
        socket.broadcast.to(user.room).emit('message',formatMessage(botName, `${user.username} has joined the chat`))


    }) 
    
    // chatMessage 
    socket.on('chatMessage', msg => {
        const user = getCurrentUser(socket.id)
        console.log(user)
        io.to(user.room).emit('message', formatMessage(user.username, msg))
    })

    // Client Disconnects
    socket.on('disconnect', () => {
        io.emit('message', formatMessage(botName,'A user has left the chat'))
    })

})

server.listen(process.env.PORT || 8080, () => {
    console.log(`Server Listening`)
})