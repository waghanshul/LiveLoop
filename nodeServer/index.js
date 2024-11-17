//node server which will handle socket io connection

const { Socket } = require('socket.io');

const io = require('socket.io')(8080)

const users = {};

io.on('connection', socket =>{
    socket.on('new-user-joined', name =>{
        console.log("New user", name)
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });
    socket.on('send', message =>{
        socket.broadcast.emit('recieve', {message: message, name: users[socket.id]})
    });
})