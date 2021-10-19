const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');

const PORT = 3001;
const app = express();
const serve = http.createServer(app);
const io = socketio(serve);

app.use(express.static(path.join(__dirname,'public')))

io.on('connection', socket => {
  console.log('Weclome');
  socket.emit('messgae', 'Weclome');

  socket.broadcast.emit('messgae', '用户加入');

  socket.on('disconnect', () => {
    io.emit('messgae', '用户离开')
  })

  socket.on('chatMessage', msg => {
    console.log(msg);
    io.emit('messgae', msg)
  })
})

serve.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
})