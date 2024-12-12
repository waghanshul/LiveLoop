const io = require('socket.io')(8080);

const users = {};

io.on('connection', socket => {
    // Log when a new user connects
    console.log("A user connected with ID:", socket.id);

    // Listen for 'new-user-joined' event
    socket.on('new-user-joined', name => {
        console.log("New user joined: " + name);  
        users[socket.id] = name;  
        socket.broadcast.emit('user-joined', name); 
    });

    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] });
    });

    socket.on('disconnect', () => {
        console.log("User disconnected:", users[socket.id]);  // Log when a user disconnects
        delete user[socket.id];  // Clean up the user from the list
    });
});
