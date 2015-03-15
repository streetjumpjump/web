(function() {
    'use strict';

    var app = angular.module('frogger');

    app.factory('infoService', [function() {
        var infoService = {
            title: 'Sample title',
            player: 'RunningFrog.png',
            happyPlayer: 'HappyFrog.png',
            enemy: 'Truck.png',
            safeZone: 'safeZone.png',
            road: 'road.png',
            divider: 'divider.png',
            victoryZone: 'victoryZone.png',
            defaultPath: 'images/'

        };


        return infoService;
    }]);
})();