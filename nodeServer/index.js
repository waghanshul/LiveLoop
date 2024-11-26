const io = require('socket.io')(8080);

const users = {};

// Constants for event names
const EVENTS = {
    CONNECTION: 'connection',
    NEW_USER_JOINED: 'new-user-joined',
    SEND: 'send',
    RECEIVE: 'receive',
    USER_JOINED: 'user-joined',
    DISCONNECT: 'disconnect'
};

io.on(EVENTS.CONNECTION, (socket) => {
    console.log(`A user connected with ID: ${socket.id}`);

    // Handle a new user joining
    socket.on(EVENTS.NEW_USER_JOINED, (name) => {
        if (name) {
            console.log(`New user joined: ${name}`);
            users[socket.id] = name;
            socket.broadcast.emit(EVENTS.USER_JOINED, name);
        }
    });

    // Handle message sending
    socket.on(EVENTS.SEND, (message) => {
        const senderName = users[socket.id];
        if (message && senderName) {
            socket.broadcast.emit(EVENTS.RECEIVE, { message, name: senderName });
        }
    });

    // Handle user disconnection
    socket.on(EVENTS.DISCONNECT, () => {
        const disconnectedUser = users[socket.id];
        if (disconnectedUser) {
            console.log(`User disconnected: ${disconnectedUser}`);
            delete users[socket.id];
        }
    });
});
