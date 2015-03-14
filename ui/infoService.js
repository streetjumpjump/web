(function() {
    'use strict';

    var app = angular.module('frogger');

    app.factory('infoService', [function() {
        var infoService = {
            title: 'Sample title',
            player: 'player.png',
            enemy: 'enemy.png',
            safeZone: 'safeZone.png',
            road: 'road.png',
            divider: 'divider.png',
            victoryZone: 'victoryZone.png',
            path: 'images/'
        };


        return infoService;
    }]);

})();