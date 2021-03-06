const socket = io.connect('https://publicchat-room.herokuapp.com')

const output = document.getElementById('output')
const handle = document.getElementById('handle')
const message = document.getElementById('message')
const send = document.getElementById('send')
const feedback = document.getElementById('feedback')

send.addEventListener('click', () => {
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
})

message.addEventListener('keypress', () => {
    socket.emit('typing', handle.value)
})

socket.on('chat', (data) => {
    feedback.innerHTML = ""
    output.innerHTML += `<p><strong>${data.handle}: </strong>${data.message}</p>`
})

socket.on('typing', (data) => {
    feedback.innerHTML = `<p><em>${data} is typing a message....</em></p>`
})