const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');

const socket = io();

const user_data = Qs.parse(location.href.split('?')[1]);
socket.emit('join', user_data);

//加入
socket.on('connection messgae', info => {
  outputMessage(info);
  chatMessages.scrollTop = chatMessages.scrollHeight;
})

//离开
socket.on('disconnect messgae', info=>{
  outputMessage(info);
  chatMessages.scrollTop = chatMessages.scrollHeight;
})

socket.on('chatMessage', info => {
  outputMessage(info);
  chatMessages.scrollTop = chatMessages.scrollHeight;
})

chatForm.addEventListener('submit', e => {
  e.preventDefault();

  const msg = e.target.elements.msg.value;

  socket.emit('chatMessage', msg);

  e.target.elements.msg.value = '';
})

function outputMessage(info){
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `<p class="meta">${info.username} <span>${info.date}</span></p>
  <p class="text">${info.msg}</p>`;
  chatMessages.appendChild(div);

}