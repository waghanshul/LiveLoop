document.addEventListener('DOMContentLoaded', () => {
    const socket = io('http://localhost:8080');
    const form = document.getElementById('send-container');
    const messageInput = document.getElementById('messageInp');
    const messageContainer = document.querySelector(".container");

    const appendMessage = (message, position) => {
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        messageElement.classList.add('message', position);
        messageContainer.appendChild(messageElement);
    };

    const userName = prompt("Enter your name to join")?.trim();
    if (userName) socket.emit('new-user-joined', userName);

    socket.on('user-joined', name => appendMessage(`${name} joined the chat`, 'center'));
    socket.on('receive', ({ name, message }) => appendMessage(`${name}: ${message}`, 'left'));

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = messageInput.value.trim();
        if (message) {
            appendMessage(`You: ${message}`, 'right');
            socket.emit('send', message);
            messageInput.value = '';
        }
    });
});
