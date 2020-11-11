const { io } = require('../server');
const { Users } = require('../classes/users');

const { createMessage } = require('../utils/utils');

const users = new Users();

io.on('connection', (client) => {
    // Client connected to chat.
    client.on('enterChat', (user, callback) => {
        if (user.name === undefined || user.name === null || user.name.length <= 0) {
            return callback({ ok: false, message: 'The name is required' });
        } else if (user.room === undefined || user.room === null || user.room.length <= 0) {
            return callback({ ok: false, message: 'The room is required' });
        }

        client.join(user.room);

        users.addPerson(client.id, user.name, user.room);
        const message = createMessage(0, 'Admin', `${ user.name } entered the room`);

        client.broadcast.to(user.room).emit('listPeople', users.getPeopleByRoom(user.room));
        client.broadcast.to(user.room).emit('publicMessage', message);

        callback(users.getPeopleByRoom(user.room));
    });

    // Client disconnected of chat.
    client.on('disconnect', () => {
        const deletedUser = users.removePersonById(client.id);
        const message = createMessage(0, 'Admin', `${ deletedUser.name } left the room`);
        
        client.broadcast.to(deletedUser.room).emit('publicMessage', message);
        client.broadcast.to(deletedUser.room).emit('listPeople', users.getPeopleByRoom(deletedUser.room));
    });

    // Client sent message to all users.
    client.on('publicMessage', (data, callback) => {
        const person = users.getPersonById(client.id);
        const message = createMessage(person.id, person.name, data.message);

        client.broadcast.to(person.room).emit('publicMessage', message);

        callback(message);
    });
    
    // Client sent message to a user.
    client.on('privateMessage', (data) => {
        if (data.to === undefined || data.to === null) {
            const message = createMessage(0, 'Admin', `You need to select a user`);
            return client.emit('publicMessage', message);
        }

        client.broadcast.to(data.to).emit('privateMessage', createMessage(client.id, users.getPersonById(client.id).name, data.message));
    });


});