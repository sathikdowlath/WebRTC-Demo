// server.js
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', socket => {
  socket.on('join', room => {
    console.log(`server.js-connection to room: ${room}`);
    socket.join(room);
    console.log(`server.js-join: ${room}`);
    socket.to(room).emit('ready');
  });

  socket.on('offer', (room, offer) => {
    socket.to(room).emit('offer', offer);
    console.log(`server.js-offer: ${room} - ${offer}`);
  });

  socket.on('answer', (room, answer) => {
    socket.to(room).emit('answer', answer);
    console.log(`server.js-answer: ${room} - ${answer}`);
  });

  socket.on('ice-candidate', (room, candidate) => {
    socket.to(room).emit('ice-candidate', candidate);
    console.log(`server.js-ice-candidate: ${room} - ${candidate}`);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`server.js-Server running on port ${PORT}`));
