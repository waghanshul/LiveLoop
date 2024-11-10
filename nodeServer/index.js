//node server which will handle socket io connection

const { Socket } = require('socket.io');

const io = require('socket.io')(8000)

const users = {};

io.on('connection', socket =>{
    socket.on('new-user-joined', name =>{
        users[socket.id] = name;
        socket/BroadcastChannel.emit('user-joined', name);
    });
    socket.on('send', message =>{
        socket.broadcast.emit('recieve', {message: message, name: user[socket.id]})
    });
})