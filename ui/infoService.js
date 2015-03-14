(function() {
    'use strict';

    var app = angular.module('frogger');

    app.factory('infoService', [function() {
        var infoService = {
            title: '',
            player: '',
            enemy: '',
            safeZone: '',
            road: '',
            divider: '',
            victoryZone: ''
        };


        return infoService;
    }]);

})();