namespace ndd {
    export class Rain extends Phaser.Sprite {
        game: Phaser.Game;
        playerState: PlayerState;

        constructor(game: Phaser.Game, x: number, y: number) {
            this.game = game;
            this.init();
            super(this.game, x, y);
        }

        init() {
            let emitter = this.game.add.emitter(this.game.world.centerX, 0, 400);
            emitter.width = this.game.world.width;
            // emitter.angle = 30; // uncomment to set an angle for the rain.
            emitter.makeParticles("rain");
            emitter.minParticleScale = 0.1;
            emitter.maxParticleScale = 0.5;
            emitter.setYSpeed(300, 500);
            emitter.setXSpeed(-5, 5);
            emitter.minRotation = 0;
            emitter.maxRotation = 0;
            emitter.start(false, 1600, 5, 0);
        }
    }
}
