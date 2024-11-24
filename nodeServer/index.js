const io = require('socket.io')(8080, {
    cors: {
        origin: "*", // Allow CORS for all origins (change for production)
        methods: ["GET", "POST"]
    }
});

const users = {}; // Store connected users by socket ID

io.on('connection', (socket) => {
    console.log(`A user connected: ${socket.id}`);

    // Handle when a new user joins
    socket.on('user:join', (name) => {
        if (!name) {
            console.warn(`Invalid user name from socket ID: ${socket.id}`);
            return;
        }
        console.log(`New user joined: ${name}`);
        users[socket.id] = name;

        // Notify other users
        socket.broadcast.emit('user:joined', name);
    });

    // Handle message sending
    socket.on('message:send', (message) => {
        if (!users[socket.id]) {
            console.warn(`Message received from unregistered user: ${socket.id}`);
            return;
        }
        const userName = users[socket.id];
        console.log(`Message from ${userName}: ${message}`);
        
        // Broadcast the message to all other users
        socket.broadcast.emit('message:receive', { message, name: userName });
    });

    // Handle user disconnection
    socket.on('disconnect', () => {
        const userName = users[socket.id];
        if (userName) {
            console.log(`User disconnected: ${userName}`);
            // Notify other users about the disconnection
            socket.broadcast.emit('user:left', userName);
            delete users[socket.id]; // Remove the user
        } else {
            console.warn(`Unknown socket disconnected: ${socket.id}`);
        }
    });
});
