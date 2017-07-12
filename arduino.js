const five = require("johnny-five");
var board = new five.Board();

var servoTrigger;
var servoMovement;
var servoReload;
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

function initServoReload(){
  servoReload = new five.Servo.Continuous(9);
}

board.on("ready", function() {
  log("Arduino Connected!")
  initServoTrigger();
  initServoMovement();
  initServoReload();
});

exports.reload = function(){
  servoReload.cw();
  sleep(1500);
  servoReload.stop();
}

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
