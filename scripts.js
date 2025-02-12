const socket = io();
const messageInput = document.getElementById('message');
const messagesList = document.getElementById('messages');
const chatBox = document.querySelector('.chat-box');

function sendMessage() {
    const message = messageInput.value.trim();
    if (message) {
        socket.emit('chat message', message);
        addMessage(message, 'user'); 
        messageInput.value = ''; 
    }
}
function addMessage(message, sender) {
    const item = document.createElement('li');
    item.textContent = message;
    item.classList.add(sender === 'user' ? 'user' : 'other');
    messagesList.appendChild(item);
    chatBox.scrollTop = chatBox.scrollHeight;
}
socket.on('chat message', (msg) => {
    addMessage(msg, 'other');
});
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});
