(function() {
    'use strict';

    var app = angular.module('frogger', []);
    
    app.controller('frogger', ['infoService', '$location', function(infoService, $location) {
        var vm = this;

        vm.pageTitle = 'The Frogger Page';

        vm.info = infoService;

        vm.showTitle = true;
        vm.showImage = false;
        vm.showGame = false;

        vm.showPic = function() {
            window.location.href = "takePictures.html";
        };

        vm.showGame = function() {
            window.location.href = "play.html";
        };
    }]);
})();

