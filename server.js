const port = 3000;
const express = require('express');
const arduino = require('./arduino');
const dualShock = require('dualshock-controller');

var app = express();
var httpServer = require("http").createServer(app);
var io = require('socket.io')(httpServer);

var dualShock4 = dualShock({
    config: "dualShock4",
    logging: true
});

function log(aString){
  console.log(aString);
};

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
        res.sendFile(__dirname + '/public/index.html');
});

httpServer.listen(port);

log('Server available at http://localhost:' + port);

io.on('connection', function(socket) {
  log('SocketID = ' + socket.id);
  socket.on('shoot', arduino.shoot);
  socket.on('move', arduino.move);
  socket.on('move1', arduino.move1);

  dualShock4.on('r2:press', shoot);
  dualShock4.on('dpadRight:press', move);
  dualShock4.on('dpadLeft:press', move1);
});

log('Waiting for connection');
