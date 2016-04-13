namespace ndd {
    export class Snow extends Phaser.Sprite {
        game: Phaser.Game;
        playerState: PlayerState;
        back_emitter: Phaser.Particles.Arcade.Emitter;
        mid_emitter: Phaser.Particles.Arcade.Emitter;
        front_emitter: Phaser.Particles.Arcade.Emitter;

        constructor(game: Phaser.Game, x: number, y: number) {
            this.game = game;
            this.init();
            super(this.game, x, y);
        }

        init() {
            this.back_emitter = this.game.add.emitter(this.game.world.centerX, -32, 600);
            this.back_emitter.makeParticles("snowflakes", [0, 1, 2, 3, 4, 5]);
            this.back_emitter.maxParticleScale = 0.6;
            this.back_emitter.minParticleScale = 0.2;
            this.back_emitter.setYSpeed(20, 100);
            this.back_emitter.gravity = 0;
            this.back_emitter.width = this.game.world.width * 1.5;
            this.back_emitter.minRotation = 0;
            this.back_emitter.maxRotation = 40;

            this.mid_emitter = this.game.add.emitter(this.game.world.centerX, -32, 250);
            this.mid_emitter.makeParticles("snowflakes", [0, 1, 2, 3, 4, 5]);
            this.mid_emitter.maxParticleScale = 1.2;
            this.mid_emitter.minParticleScale = 0.8;
            this.mid_emitter.setYSpeed(50, 150);
            this.mid_emitter.gravity = 0;
            this.mid_emitter.width = this.game.world.width * 1.5;
            this.mid_emitter.minRotation = 0;
            this.mid_emitter.maxRotation = 40;

            this.front_emitter = this.game.add.emitter(this.game.world.centerX, -32, 50);
            this.front_emitter.makeParticles("snowflakes_large", [0, 1, 2, 3, 4, 5]);
            this.front_emitter.maxParticleScale = 1;
            this.front_emitter.minParticleScale = 0.5;
            this.front_emitter.setYSpeed(100, 200);
            this.front_emitter.gravity = 0;
            this.front_emitter.width = this.game.world.width * 1.5;
            this.front_emitter.minRotation = 0;
            this.front_emitter.maxRotation = 40;
        }

        start() {
            this.back_emitter.start(false, 14000, 20);
            this.mid_emitter.start(false, 12000, 40);
            this.front_emitter.start(false, 6000, 1000);
        }

        stop() {
            this.back_emitter.on = false;
            this.mid_emitter.on = false;
            this.front_emitter.on = false;
        }
    }
}
