import openSocket from 'socket.io-client';
var socket = openSocket('http://localhost:8000');

function sendNewGameRequest(name) {
  socket.emit("newGame", name);
}

function sendJoinGameRequest(name, lobbyId){
  socket.emit("joinGame", name, lobbyId);
}

function sendLeaveLobbyRequest(name, lobbyId){
  socket.emit("leaveLobby", name, lobbyId);
}

function joinGame(eventType, eventData, playerName) {
    socket.emit(eventType, eventData, playerName);
}

function startGame(lobbyId) {
    socket.emit('startGame');
}

//Just a temp var for testing purpose, will re-design the frontend organization
var lobbyId;

function recievedMessages(){
  socket.on('news',function(msg){
    console.log(msg);
  });
  socket.on('jgConf',function(msg){
    lobbyId = msg.lobby;
    console.log(msg.lobby);
  });
}

export { sendNewGameRequest, sendLeaveLobbyRequest, sendJoinGameRequest, recievedMessages, socket};
