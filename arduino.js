const five = require("johnny-five");
var board = new five.Board();

var servoTrigger;
var servoMovement;
var movementPosition;

function log(aString){
  console.log(aString);
};

function initServoTrigger(){
  servoTrigger = new five.Servo({
    pin: 8,
    range: [0, 30]
  });
  servoTrigger.min();
};

function initServoMovement(){
  movementPosition = 90;
  servoMovement = new five.Servo({
    pin: 10,
    range: [0, 180]
  });
  servoMovement.to(movementPosition);
};

board.on("ready", function() {
  log("Arduino Connected!")
  initServoTrigger();
  initServoMovement();
});

exports.move1 = function(){
  log("Move 1 " + movementPosition);
  servoMovement.to(movementPosition);
  if(movementPosition < 180) movementPosition+= 10;
};

exports.move = function(){
  log("Move " + movementPosition);
  servoMovement.to(movementPosition);
  if(movementPosition > 0) movementPosition-= 10;
};

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    };
  };
};

exports.shoot = function(){
  log("Shoot!!");
  servoTrigger.max();
  sleep(1000);
  servoTrigger.min();
};
