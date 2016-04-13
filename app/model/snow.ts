namespace ndd {
    export class Snow extends Phaser.Sprite {
        game: Phaser.Game;
        playerState: PlayerState;

        constructor(game: Phaser.Game, x: number, y: number) {
            this.game = game;
            this.init();
            super(this.game, x, y);
        }

        init() {
            let back_emitter = this.game.add.emitter(this.game.world.centerX, -32, 600);
            back_emitter.makeParticles("snowflakes", [0, 1, 2, 3, 4, 5]);
            back_emitter.maxParticleScale = 0.6;
            back_emitter.minParticleScale = 0.2;
            back_emitter.setYSpeed(20, 100);
            back_emitter.gravity = 0;
            back_emitter.width = this.game.world.width * 1.5;
            back_emitter.minRotation = 0;
            back_emitter.maxRotation = 40;

            let mid_emitter = this.game.add.emitter(this.game.world.centerX, -32, 250);
            mid_emitter.makeParticles("snowflakes", [0, 1, 2, 3, 4, 5]);
            mid_emitter.maxParticleScale = 1.2;
            mid_emitter.minParticleScale = 0.8;
            mid_emitter.setYSpeed(50, 150);
            mid_emitter.gravity = 0;
            mid_emitter.width = this.game.world.width * 1.5;
            mid_emitter.minRotation = 0;
            mid_emitter.maxRotation = 40;

            let front_emitter = this.game.add.emitter(this.game.world.centerX, -32, 50);
            front_emitter.makeParticles("snowflakes_large", [0, 1, 2, 3, 4, 5]);
            front_emitter.maxParticleScale = 1;
            front_emitter.minParticleScale = 0.5;
            front_emitter.setYSpeed(100, 200);
            front_emitter.gravity = 0;
            front_emitter.width = this.game.world.width * 1.5;
            front_emitter.minRotation = 0;
            front_emitter.maxRotation = 40;
            // changeWindDirection();
            back_emitter.start(false, 14000, 20);
            mid_emitter.start(false, 12000, 40);
            front_emitter.start(false, 6000, 1000);
        }
    }
}
