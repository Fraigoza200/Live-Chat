const socket = io()
const chatForm = document.getElementById('chat-form')
const chatMessage = document.querySelector('.chat-messages')

const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})

socket.emit('joinRoom', { username, room})

socket.on('message', message => {
    console.log(message)

    outPutMessage(message)

    chatMessage.scrollTop = chatMessage.scrollHeight
})

chatForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const msg = e.target.elements.msg.value

    socket.emit('chatMessage', msg)

    e.target.elements.msg.value = ''
    e.target.elements.msg.focus()
})

outPutMessage = message => {
    const div = document.createElement('div')
    div.classList.add('message')
    div.innerHTML = `<p class ='meta'>${message.username}<span>${message.time}</span></p>
    <p class='text'>
    ${message.text}
    </p>
    `
    document.querySelector('.chat-messages').appendChild(div)
}