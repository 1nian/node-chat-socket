const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');


const PORT = 3001;
const app = express();
const serve = http.createServer(app);
const io = socketio(serve);

const message = require('./utils/messages.js')

app.use(express.static(path.join(__dirname,'public')))

io.on('connection', socket => {
  socket.on('join', info => {
    socket.broadcast.emit('connection messgae', message(info.username,'用户加入'));
  })

  socket.on('chatMessage', msg => {
    io.emit('chatMessage', message('username',msg))
  })

  socket.on('disconnect', () => {
    io.emit('disconnect messgae', message('Admin','用户离开'))
  })
})

serve.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
})