namespace ndd {
    export class Rain extends Phaser.Sprite {
        game: Phaser.Game;
        playerState: PlayerState;
        emitter: Phaser.Particles.Arcade.Emitter;

        constructor(game: Phaser.Game, x: number, y: number) {
            this.game = game;
            this.init();
            super(this.game, x, y);
        }

        init() {
            this.emitter = this.game.add.emitter(this.game.world.centerX, 0, 400);
            this.emitter.width = this.game.world.width;
            // emitter.angle = 30; // uncomment to set an angle for the rain.
            this.emitter.makeParticles("rain");
            this.emitter.minParticleScale = 0.1;
            this.emitter.maxParticleScale = 0.5;
            this.emitter.setYSpeed(300, 500);
            this.emitter.setXSpeed(-5, 5);
            this.emitter.minRotation = 0;
            this.emitter.maxRotation = 0;
        }
        start() {
            this.emitter.start(false, 1600, 5, 0);
        }

        stop() {
            this.emitter.on = false;
        }
    }
}
