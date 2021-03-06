﻿(function() {
    'use strict';

    var app = angular.module('frogger');

    app.factory('infoService', [function() {
        var infoService = {
            title: 'Sample title',
            player: 'RunningFrog.png',
            happyPlayer: 'HappyFrog.png',
            sadPlayer: 'SadFrog.png',
            enemy: 'Truck.png',
            safeZone: 'safeZone.png',
            road: 'road.png',
            divider: 'divider.png',
            victoryZone: 'victoryZone.png',
            defaultPath: 'game/images/'


        };


        return infoService;
    }]);
})();