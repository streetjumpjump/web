(function() {
    'use strict';

    var app = angular.module('frogger');

    app.controller('game', ['infoService', function(infoService) {
        var vm = this;

        vm.info = infoService;

        // begin Quintus code -_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_

        var Q = Quintus()
            .include("Scenes, Input, 2D, Touch, UI")
            .setup({ maximize: true })
            .controls().touch()

        Q.Sprite.extend("Player", {
            init: function(p) {
                this._super(p, {
                    x: 410,
                    y: 90,
                    w: 25,
                    h: 25,
                    asset: '{{ info.player }}'
                });
                this.add('2d, platformerControls');

                this.on("hit.sprite", function(collision) {
                    if (collision.obj.isA("VictoryZone")) {
                        Q.stageScene("endGame", 1, { label: "You Won!" });
                        this.destroy();
                    }
                });
            }
        });

        Q.load('{{ info.player }}', function() {
            var player = new Q.Player();

            Q.gameLoop(function(dt) {
                Q.clear();
                player.update(dt);
                player.render(Q.ctx);
            });
        });

        Q.Sprite.extend("VictoryZone", {
            init: function(p) {
                this._super(p,
                    {
                        asset: '{{ info.victoryZone }}',
                        w: 250,
                        h: 25
                    });
            }
        });

        Q.load('{{ info.victoryZone }}', function() {
            var victoryZone = new Q.VictoryZone();

            Q.gameLoop(function(dt) {
                Q.clear();
                victoryZone.update(dt);
                victoryZone.render(Q.ctx);
            });
        });

        Q.Sprite.extend("Enemy", {
            init: function(p) {
                this._super(p, {
                    asset: '{{ info.enemy }}',
                    vx: 100,
                    vy: 50,
                    w: 25,
                    h: 25
                });
                //this.add('2d, aiBounce');

                this.on("bump.left,bump.right,bump.bottom, bump.top", function(collision) {
                    if (collision.obj.isA("Player")) {
                        Q.stageScene("endGame", 1, { label: "You Died" });
                        collision.obj.destroy();
                    }
                });

                //this.on("bump.top",function(collision) {
                //    if(collision.obj.isA("Player")) {
                //        this.destroy();
                //        collision.obj.p.vy = -300;
                //    }
                //});
            }
        });

        Q.load('{{ info.enemy }}', function() {
            var enemy = new Q.Enemy();

            Q.gameLoop(function(dt) {
                Q.clear();
                enemy.update(dt);
                enemy.render(Q.ctx);
            });
        });

        Q.scene("level1", function(stage) {
            stage.insert(new Q.Player());
        });

        Q.stageScene("level1");

        //Q.scene("level1", function(stage) {
        //    stage.collisionLayer(new Q.TileLayer({ dataAsset: 'http://www.html5quintus.com/level.json', sheet: 'tiles' }));
        //    var player = stage.insert(new Q.Player());

        //    stage.add("viewport").follow(player);

        //    stage.insert(new Q.Enemy({ x: 700, y: 0 }));
        //    stage.insert(new Q.Enemy({ x: 800, y: 0 }));

        //    stage.insert(new Q.Tower({ x: 180, y: 50 }));
        //});

        //Q.scene('endGame', function(stage) {
        //    var box = stage.insert(new Q.UI.Container({
        //        x: Q.width / 2, y: Q.height / 2, fill: "rgba(0,0,0,0.5)"
        //    }));

        //    var button = box.insert(new Q.UI.Button({
        //        x: 0, y: 0, fill: "#CCCCCC",
        //        label: "Play Again"
        //    }))
        //    var label = box.insert(new Q.UI.Text({
        //        x: 10, y: -10 - button.p.h,
        //        label: stage.options.label
        //    }));
        //    button.on("click", function() {
        //        Q.clearStages();
        //        Q.stageScene('level1');
        //    });
        //    box.fit(20);
        //});

        //Q.load("http://www.html5quintus.com/sprites.png, http://www.html5quintus.com/sprites.json, http://www.html5quintus.com/level.json, http://www.html5quintus.com/tiles.png", function() {
        //    Q.sheet("tiles", "http://www.html5quintus.com/tiles.png", { tilew: 32, tileh: 32 });
        //    Q.compileSheets("http://www.html5quintus.com/sprites.png", "http://www.html5quintus.com/sprites.json");
        //    Q.stageScene("level1");
        //});
    }]);
})();

