(function() {
    'use strict';

    var app = angular.module('frogger');

    app.factory('infoService', [function() {
        var infoService = {
            title: 'Sample title',
            player: 'web/assets/player.png',
            enemy: 'web/assets/enemy.png',
            safeZone: 'web/assets/safeZone.png',
            road: 'web/assets/road.png',
            divider: 'web/assets/divider.png',
            victoryZone: 'web/assets/victoryZone.png'
        };


        return infoService;
    }]);

})();