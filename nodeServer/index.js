// const http = require('http');



// const cors = require('cors');

// const server = http.createServer();
// const socketServer = io(server);


// Enable CORS
// socketServer.use(cors());

// const io = require('socket.io')(8000);
// const users = {};
// console.log("hello");

// io.on('connection', socket => {
//     console.log("how ou");
//   socket.on('new-user-joined', userName => {
//     console.log("how r you");
//     users[socket.id] = userName;
//     socket.broadcast.emit('user-joined', userName);
//   });

//   socket.on('send', message => {
//     socket.broadcast.emit('receive', { message: message, userName: users[socket.id] });
//   });
// });



// const ipAddress = '127.0.0.1';
// const port = 8000;

// server.listen(port,  () => {
//   console.log(`Socket server is listening on ${ipAddress}:${port}`);
// });

// const io = require('socket.io')(8000);

// io.on('connection', socket => {
//   socket.on('popup', message => {
//     io.emit('show-popup', message);
//   });
// });
const io = require('socket.io')(8000, {
    cors: {
      origin: 'http://127.0.0.1:5500',
      methods: ['GET', 'POST'],
    },
  });
  
  const users = {};
  console.log("hello");
  
  io.on('connection', socket => {
    console.log("how ou");
  
    socket.on('new-user-joined', userName => {
      console.log("new user",userName);
      users[socket.id] = userName;
      socket.broadcast.emit('user-joined', userName);
    });
  
    socket.on('send', message => {
      socket.broadcast.emit('receive', { message: message, userName:users[socket.id] });
    });

  socket.on('disconnect', message => {
    socket.broadcast.emit('left', users[socket.id]);
    delete users[socket.id];
});
});
  