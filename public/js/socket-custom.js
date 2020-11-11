const socket = io();
        
// *************************
// on: Listen information.
// emit: Send information.
// *************************
socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('disconnect', () => {
    console.log('Connection has been lost')
});

socket.on('sendMessageServer', (data) => {
    console.log(data);
});

socket.emit('sendMessageClient', {
    user: 'mgarciareimers',
    message: 'Hello World!',
}, (response) => {
    // Callback.
    console.log(response);
});