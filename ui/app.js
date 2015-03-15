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

        vm.next = function() {
            if (vm.showTitle) {
                vm.showTitle = false;
                vm.showImage = true;
            }else if (vm.showImage) {
                vm.showImage = false;
                vm.showGame = true;
            }
        }
    }]);
})();

