(function() {
    'use strict';

    var app = angular.module('frogger', []);
    
    app.controller('frogger', ['infoService', function(infoService) {
        var vm = this;

        vm.pageTitle = 'The Frogger Page';

        vm.info = infoService;

        vm.showTitle = true;
        vm.showImage = false;
        vm.showGame = false;
    }]);
})();

