(function() { 'use strict';

  angular.module('webcam')
  .factory('mySocket', 
    function (socketFactory) {        
        console.log("mySocket");
        return socketFactory();
    })
  .controller('webcamController', 
    webcamController);
  webcamController.$inject = ['$scope', '$log', 'mySocket'];
  function webcamController($scope, $log, mySocket) {
    /* jshint validthis: true */
    var vm = this;
    vm.config = {
      delay: 0,
      shots: 1,
      flashFallbackUrl: 'vendors/webcamjs/webcam.swf',
      shutterUrl: 'shutter.mp3',
      flashNotDetectedText: 'Seu browser não atende os requisitos mínimos para utilização da camera. ' +
      'Instale o ADOBE Flash player ou utilize os browsers (Google Chrome, Firefox ou Edge)'
    };

    vm.showButtons = false;
    vm.captureButtonEnable = false;
    vm.progress = 0;
    vm.canSelectTarget = false;
    vm.messageTarget = 'Seleccione un objetivo';
    vm.visibleArduinoFunctions = true;

    vm.targetSelected = function(){
      vm.canSelectTarget = !vm.canSelectTarget;
      vm.toggleMessage();
    }

    vm.toggleMessage = function(){
      if (vm.messageTarget === 'Seleccione un objetivo'){
        vm.messageTarget = 'Oculte objetivo';
        return;
      }
      vm.messageTarget = 'Seleccione un objetivo';
    }

    vm.onCaptureComplete = function(src) {
      $log.log('webcamController.onCaptureComplete : ', src);
      vm.progress = 100;
      var el = document.getElementById('result');
      var img = document.createElement('img');
      img.src = src[vm.config.shots-1];
      img.width = 240;
      img.height = 180;
      el.appendChild(img);
    };
    
    vm.onError = function(err) {
      $log.error('webcamController.onError : ', err);
      vm.showButtons = false;
    };
    
    vm.onLoad = function() {
      $log.info('webcamController.onLoad');
      vm.showButtons = true;
    };
    
    vm.onLive = function() {
      $log.info('webcamController.onLive');
      vm.captureButtonEnable = true;
    };

    vm.canApplyFunctions = function(){
      vm.visibleArduinoFunctions = true;
    };

    vm.disableFunctions = function(){
      vm.visibleArduinoFunctions = false;
    };



    vm.shoot = function (aux) {
      console.log("Shoot");
      vm.capture();
      //mySocket.emit('shoot', aux);
    };

    vm.move = function () {
      console.log("move");
      //mySocket.emit('move');
    };

    vm.move1 = function () {
      console.log("move1");
      //mySocket.emit('move1');
    };


    vm.onCaptureProgress = function(src, progress) {
      vm.progress = progress;
      var result = {
        src: src,
        progress: progress
      }
      var el = document.getElementById('result');
      var img = document.createElement('img');
      img.src = src;
      img.width = 240;
      img.height = 180;
      el.appendChild(img);
      $log.info('webcamController.onCaptureProgress : ', result);
    };

    vm.capture = function() {
      $scope.$broadcast('ngWebcam_capture'); 
    };

    vm.on = function() {
      $scope.$broadcast('ngWebcam_on');
      vm.canApplyFunctions();
    };

    vm.off = function() {
      $scope.$broadcast('ngWebcam_off');
      vm.captureButtonEnable = false;
      vm.disableFunctions();
    };
  }
})();