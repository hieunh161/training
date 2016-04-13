namespace ndd {
    export class LoadingState extends Phaser.State {
        screenBackground: Phaser.Sprite;
        game: Phaser.Game;
        enemy: Enemy;
        rain: Rain;
        snow: Snow;
        KEY_ONE: Phaser.Key;
        KEY_TWO: Phaser.Key;
        KEY_THREE: Phaser.Key;
        constructor() {
            super();
        }
        create() {
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.screenBackground = this.add.sprite(0, 0, "load");
            this.screenBackground.scale.setTo(this.game.width / this.screenBackground.width, this.game.height / this.screenBackground.height);
            this.enemy = new Enemy(this.game, 0, this.game.height - 50);
            this.game.add.existing(this.enemy);
            // this.rain = new Rain(this.game, 0, 0);
            this.snow = new Snow(this.game, 0, 0);
            this.game.physics.enable(this.enemy, Phaser.Physics.ARCADE);
            // event handlers
            this.KEY_ONE = this.game.input.keyboard.addKey(Phaser.Keyboard.ONE);
            this.KEY_TWO = this.game.input.keyboard.addKey(Phaser.Keyboard.TWO);
            this.KEY_THREE = this.game.input.keyboard.addKey(Phaser.Keyboard.THREE);
            this.KEY_ONE.onDown.add(this.removeSnow, this);
        }

        killEnemy() {
            this.enemy.kill();
        }
        removeSnow() {
            this.snow.kill();
        }
    }
}
