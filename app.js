const express = require('express');
const app = express();
const socket = require('socket.io');
const ejsMate = require('ejs-mate');
const path = require('path');

app.engine('ejs', ejsMate);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')));

const port = process.env.PORT || 5000;

const server = app.listen(port, function (){
    console.log('listening on port 5000')
})

app.get('/', (req, res) => {
    res.render('index')
})

const io = socket(server);

io.on('connection', function (socket) {
    console.log('You do it!')

    socket.on('chat', (data) => {
        io.sockets.emit('chat', data)
    })

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data)
    })

})
