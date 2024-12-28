document.addEventListener('DOMContentLoaded', () => {
    const socket = io('http://localhost:8080');
    const form = document.getElementById('send-container');
    const messageInput = document.getElementById('messageInp');
    const messageContainer = document.querySelector(".container");

    const appendMessage = (message, position) => {
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        messageElement.className = `message ${position}`;
        messageContainer.appendChild(messageElement);
    };

    let userName;
    while (!userName) {
        userName = prompt("Enter your name to join")?.trim();
    }

    socket.emit('new-user-joined', );

    socket.on('user-joined', name => appendMessage(`${name} joined the chat`, 'center'));
    socket.on('receive', ({ name, message }) => appendMessage(`${name}: ${message}`, 'left'));

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const message = messageInput.value.trim();
        if (message) {
            appendMessage(`You: ${message}`, 'right');
            socket.emit('send', message);
            messageInput.value = '';
        }
    });
});
