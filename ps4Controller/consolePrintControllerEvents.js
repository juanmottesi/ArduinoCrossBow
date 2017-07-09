var printcontrollerEvents = function(controller, controllerConfiguration) {
    'use strict';
    controller.on('left:move', function(data) {
      if(data.x === 0 || data.x === 255) console.log(data);
    });

    controller.on('connected', function() {
        console.log('connected');
    });

    controller.on('error', function(data) {
        console.log(data);
    });

    var pressed = function(data) {
        console.log(data + ": press");
    };

    controller.on('l2:press', function(data){
      console.log(data + ": press");
    });

    controller.on('r2:press', function(data){
      console.log(data + ": press");
    });

    controller.on('square:press', function(data){
      console.log(data + ": press");
    });

    controller.on('triangle:press', function(data){
      console.log(data + ": press");
    });

    controller.on('square:press', function(data){
      console.log(data + ": press");
    });

    controller.on('circle:press', function(data){
      console.log(data + ": press");
    });

    controller.on('x:press', function(data){
      console.log(data + ": press");
    });

};

module.exports = printcontrollerEvents;
