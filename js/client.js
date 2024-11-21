document.addEventListener('DOMContentLoaded', () => {
    const socket = io('http://localhost:8080');

    const form = document.getElementById('send-container');
    const messageInput = document.getElementById('messageInp');
    const messageContainer = document.querySelector(".container");

    const append = (message, position) => {
        const messageElement = document.createElement('div');
        messageElement.innerText = message;
        messageElement.classList.add('message');
        messageElement.classList.add(position);
        messageContainer.append(messageElement);
    };

    let name = null;

    // Prompt user for name until a valid input is given
    while (!name) {
        name = prompt("Enter your name to join").trim();
    }
    
    socket.emit('new-user-joined', name);

    socket.on('user-joined', name => {
        append(`${name} joined the chat`, 'center');
    });

    socket.on('recieve', data => {
        append(`${data.name}: ${data.message}`, 'left');
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = messageInput.value.trim();
        if (message) { // Only send if there's a valid message
            append(`You: ${message}`, 'right');
            socket.emit('send', message);
            messageInput.value = ''; // Clear the input field after sending
        }
    });
});
