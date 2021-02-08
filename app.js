const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const socket = require('socket.io');
const server = http.createServer(app);
const io = socket(server);
const PORT = process.env.PORT || 4000;
let users = []
let counter =0;


app.use(express.static(path.join(__dirname, 'public')))//express





io.on('connection', socket => {
  let id = socket.id
  
  socket.on('logon', data =>{
    data.id = id
    user= {id: id,
    name: data.name}
    users.push(user)
    // counter= users.length;
    console.log(users);
    data.users = users
    io.emit('user', data)
    io.emit('counter', users.length)
    
  })
  
  
  console.log(counter);
  
  //Funkar nästan(?) behöver skciak med uppdaterad array i datan så chat.js kan populera users- löst: emittar objekt med logoff
  socket.on('disconnect', data => { //vet inte vad data här är förnåt
    // counter--
    console.log(socket.id + " Disconnected");
    users.forEach(user => {
      if(user.id === socket.id){
        
        users.splice(users.indexOf(user), 1)
        socket.broadcast.emit('logoff', {id: socket.id, name: user.name, users:users, counter: users.length})
        
      }
    
    });
    
  
    

  })

  // socket.emit('message', 'Welcome to the chat');
  socket.on('message', data => {
    // console.log(data);
    io.sockets.emit('message', data)
  })

})











server.listen(PORT, () => {
  console.log('server running on http://localhost:'+PORT);
})



