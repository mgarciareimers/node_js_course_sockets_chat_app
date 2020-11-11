const { io } = require('../server');

io.on('connection', (client) => {
    console.log('User has been connected!');
    // *************************
    // on: Listen information.
    // emit: Send information.
    // *************************
    client.emit('sendMessageServer', { user: 'Admin', message: 'Welcome'})

    client.on('disconnect', () => {
        console.log('User disconnected!');
    })

    client.on('sendMessageClient', (data, callback) => {
        console.log(data);

        client.broadcast.emit('sendMessageServer', { user: data.user, message: data.message })

        if (callback == null) {
            return
        }

        //callback({ response: data.user !== undefined && data.user !== null ? 'All went fine!' : 'Something went wrong' });
    });
});