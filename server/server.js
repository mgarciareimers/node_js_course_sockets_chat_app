require('./config/config');

const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);

// Enable public folder.
app.use(express.static(path.resolve(__dirname, '../public')));

// io => backend communication.
module.exports.io = socketIO(server);

require('./sockets/socket');

server.listen(process.env.PORT, () => console.log('Listening port:', process.env.PORT));