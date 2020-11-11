const socket = io();

const params = new URLSearchParams(window.location.search);

if (!params.has('name') || params.get('name') === undefined || params.get('name') === null || params.get('name').length <= 0) {
    window.location = 'index.html';
    throw new Error('User name is required!');
} else if (!params.has('room') || params.get('room') === undefined || params.get('room') === null || params.get('room').length <= 0) {
    window.location = 'index.html';
    throw new Error('Room is required!');
}

const user = {
    name: params.get('name'),
    room: params.get('room'),
}
        
// Connect to chat.
socket.on('connect', () => {
    console.log('Connected to server');

    socket.emit('enterChat', user, (response) => {
        renderUsers(user.room, response);
    });
});

// Disconnect of chat.
socket.on('disconnect', () => {
    console.log('Connection has been lost')
});

// Send a message to all users.
//socket.emit('publicMessage', { name: 'Rose', message: 'Hi there!'});

// Send a message to a user.
//socket.emit('privateMessage', { name: 'Rose', message: 'Hi there!', to: 'NRZu4P3R9yn33MtzAAAJ'});

// Get a message.
socket.on('publicMessage', (data) => {
    renderMessages(data, false);
});

// Get a private message.
socket.on('privateMessage', (data) => {
    console.log('Private message:', data);
});

// Get people list.
socket.on('listPeople', (peopleList) => {
    renderUsers(user.room, peopleList);
});