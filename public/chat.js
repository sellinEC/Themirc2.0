const socket = io();
const chat = document.querySelector('#chat-window')
const output = document.querySelector('#output')
const cookie = document.cookie;
const userName = cookie; //SKcikas med kaka från namn-input i index
selfname = document.querySelector("#name")
const message = document.querySelector('#message')
const btn = document.querySelector('#send')
const form = document.querySelector('#form')
const feedback = document.querySelector('#feedback')
const users = document.getElementById('users')

selfname.innerHTML= `<p>Logged in as: ${userName}` //"inloggad som"

//Login-emit - skickar namn och socket id
socket.emit('logon', {
  id: socket.id,
  name: userName
  
})

form.addEventListener('submit', e => {
  e.preventDefault();

  if(message.value.trim() !== '') {
    socket.emit('message', {
      id: socket.id,
      message: message.value,
      name: userName
    })
  }
  message.value = '';
  message.focus();

})

socket.on('message', data => {
  console.log(data);
  let pos
  if(data.id === socket.id) {
    pos = 'right'
  }else{
    pos = ''
  }
  output.innerHTML += `
  <div class="chat-box ${pos}">
  <p class="chat-name">${data.name}</p>
  <p class="chat-msg">${data.message}</p>
</div>`
chat.scrollTop = chat.scrollHeight;
})

socket.on('user', data => {
  // console.log(data);
  if(data.id === socket.id){
    output.innerHTML += `<p>Welcome to the chat, ${data.name}</p>`
    

  }else{
    output.innerHTML += `<p>${data.name} has joined the chat..</p>`
  }
  //Populerar "Channel" med users från array i App.js
  users.innerHTML = `
  <div class="channel d-flex">
  <p class="lobby">Lobby</p>
  <p id="counter">(3)</p>
</div>

  `
  data.users.forEach(user => {
    users.innerHTML += `
    <div class="user" id=${user.id}>
    <p>${user.name}</p>
    </div>
    `
  });

 

})

//Ska göra logoff och uppdatera users med up-to-date array
socket.on('logoff', data => {
  console.log(typeof data +"logoff");
  output.innerHTML += `<p>${data.name} has left the chat</p>`
  
  //samma som "login"
  users.innerHTML = `
  <div class="channel d-flex">
  <p class="lobby">Lobby</p>
  <p id="counter">(3)</p>
</div>

  `
  data.users.forEach(user => {
    users.innerHTML += `
    <div class="user" id=${user.id}>
    <p>${user.name}</p>
    </div>
    `
  });

})

socket.on('counter', data => {
  console.log(data);
})



// function getCook() 
//   {
//   // Get name followed by anything except a semicolon
//   var cookiestring=RegExp(cookiename+"=[^;]+").exec(document.cookie);
//   // Return everything after the equal sign, or an empty string if the cookie name not found
//   return decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./,"") : "");
//   }