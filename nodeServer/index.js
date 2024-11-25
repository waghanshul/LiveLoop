const io = require('socket.io')(8080);
const users = {};

io.on('connection', socket => {
    console.log(`User connected: ${socket.id}`);

    socket.on('new-user-joined', name => {
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    socket.on('send', message => {
        socket.broadcast.emit('receive', { message, name: users[socket.id] });
    });

    socket.on('disconnect', () => {
        delete users[socket.id];
    });
});
