﻿(function() {
    'use strict';

    var app = angular.module('frogger');

    app.controller('Game', ['infoService', function(infoService) {
        var vm = this;

        vm.startGame = function() {
            var levelCounter = 1;

            function getRandomNumber(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }

            var Q = Quintus({
                development: true
            }).include("Scenes, Sprites, 2D, UI, Input, Touch")
                    .setup("quintus")
                    .controls(true)
                    .touch();

            Q.gravityX = 0;
            Q.gravityY = 0;
            Q.input.disableTouchControls();

            Q.Sprite.extend("Player", {
                init: function(p) {
                    this._super({
                        asset: localStorage.playerImage ? 'player' : infoService.defaultPath + infoService.player,
                        w: 100,
                        h: 100,
                        x: 400 + 50,
                        y: 700 + 50,
                        stepDistance: 100, // should be tile size
                        stepDelay: 0.2  // seconds to delay before next step
                    });

                    this.add("2d, stepControls");

                },
                step: function(dt) {
                    if (this.p.y > 750) {
                        this.p.y = 750;
                    } else if (this.p.y < 200) {

                        if (this.p.asset !== infoService.defaultPath + infoService.happyPlayer) {
                            Q.stageScene("nextLevel", 2, { label: "Next Level" });
                            this.p.asset = infoService.defaultPath + infoService.happyPlayer;
                        }
                    }

                    if (this.p.x < 50) {
                        this.p.x = 50;
                    } else if (this.p.x > 950) {
                        this.p.x = 950;
                    }
                }
            });

            Q.Sprite.extend("VictoryZone", {
                init: function(p) {
                    this._super({
                        asset: infoService.defaultPath + infoService.victoryZone,
                        w: 1000,
                        h: 200,
                        x: 500,
                        y: 100
                    });
                }
            });

            Q.MovingSprite.extend("Enemy", {
                init: function() {
                    this._super({
                        asset: localStorage.enemyImage ? 'enemy' : infoService.defaultPath + infoService.enemy,
                        w: 100,
                        h: 89
                    });

                    this.add('2d');

                    this.on("bump.left,bump.right,bump.bottom, bump.top", function(collision) {
                        if (collision.obj.isA("Player")) {
                            Q.stageScene("endGame", 2, { label: "You Died" });
                            collision.obj.destroy();
                        }
                    });
                },

                step: function(dt) {
                    if (this.p.x < -50) {
                        this.p.x = 1050;
                    } else if (this.p.x > 1050) {
                        this.p.x = -50;
                    }
                }
            });

            Q.Sprite.extend("Road", {
                init: function() {
                    this._super({
                        asset: infoService.defaultPath + infoService.road,
                        w: 1000,
                        h: 600,
                        x: 500,
                        y: 500
                    });
                }
            });

            Q.UI.Text.extend("Hud", {
                init: function(p) {
                    this._super({
                        label: "Level: " + (levelCounter++).toString(),
                        color: "white",
                        x: 70,
                        y: 780
                    });
                }
            });

            function start() {
                Q.scene("level1", function(stage) {
                    stage.insert(new Q.Player());
                    generateEnemies(stage);
                });

                Q.scene("roads", function(stage) {
                    stage.insert(new Q.VictoryZone());
                    stage.insert(new Q.Road());
                });

                Q.scene('hud', function(stage) {
                    stage.insert(new Q.Hud());
                })

                Q.scene('endGame', function(stage) {
                    var box = stage.insert(new Q.UI.Container({
                        x: Q.width / 2, y: Q.height / 2, fill: "rgba(0,0,0,0.5)"
                    }));

                    var button = box.insert(new Q.UI.Button({
                        x: 0, y: 0, fill: "#369",
                        label: "Play Again!"
                    }));
                    var label = box.insert(new Q.UI.Text({
                        x: 40, y: -40 - button.p.h,
                        label: stage.options.label, color: "#fff"
                    }));


                    button.on("click", function() {
                        Q.clearStages();
                        Q.stageScene("roads", 0);
                        Q.stageScene('level1', 1);
                        levelCounter = 1;
                        Q.stageScene('hud', 2, { label: levelCounter });
                    });

                    box.fit(20);

                });

                Q.scene('nextLevel', function(stage) {
                    var box = stage.insert(new Q.UI.Container({
                        x: Q.width / 2, y: Q.height / 2, fill: "rgba(0,0,0,0.5)"
                    }));

                    var button = box.insert(new Q.UI.Button({
                        x: 0, y: 0, fill: "#369",
                        label: "Next Level"
                    }));
                    var label = box.insert(new Q.UI.Text({
                        x: 40, y: -40 - button.p.h,
                        label: stage.options.label, color: "#fff"
                    }));

                    button.on("click", function() {
                        Q.clearStages();
                        Q.stageScene("roads", 0);
                        Q.stageScene('level1', 1);
                        Q.stageScene('hud', 2, { label: levelCounter });
                    });

                    box.fit(20);

                });

                Q.load([infoService.defaultPath + infoService.happyPlayer, infoService.defaultPath + infoService.victoryZone, infoService.defaultPath + infoService.enemy, infoService.defaultPath + infoService.road, localStorage.playerImage ? 'player' : infoService.defaultPath + infoService.player, localStorage.enemyImage ? 'enemy' : infoService.defaultPath + infoService.enemy], function() {
                    resetBoard();
                });

            }

            function generateEnemies(stage) {
                var enemies = [];
                var minSpeed = 150 + (levelCounter * 60);
                var maxSpeed = minSpeed + 100;

                for (var i = 0; i < 5; i++) {
                    enemies.push(stage.insert(new Q.Enemy()));
                }

                enemies.forEach(function(enemy, index) {
                    var speed = getRandomNumber(minSpeed, maxSpeed);
                    enemy.p.x = getRandomNumber(0, 1000);
                    enemy.p.y = 248 + (index * 100);
                    enemy.p.vx = getRandomNumber(0, 1) ? (-1 * speed) : speed;

                    if (enemy.p.vx > 0 && !localStorage.enemyImage) {
                        enemy.p.angle = 180;
                    }
                });
            }

            function resetPics() {
                if (localStorage.enemyImage) {
                    localStorage.removeItem("enemyImage");
                }
                if (localStorage.playerImage) {
                    localStorage.removeItem("playerImage");
                }

                resetBoard();
            }

            function resetBoard() {
                levelCounter = 1;
                Q.clearStages();
                Q.stageScene("roads", 0);
                Q.stageScene('level1', 1);
                Q.stageScene('hud', 2, { label: levelCounter });
            }

            document.getElementById("ResetPics").addEventListener("click", function() {
                resetPics();
            });

            start();
        }

        }]);

        


})();