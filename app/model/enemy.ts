namespace ndd {
    export enum PlayerState { IDLE, WALKING }

    export class Enemy extends Phaser.Sprite {
        game: Phaser.Game;
        playerState: PlayerState;
        RIGHT_ARROW: Phaser.Key;
        LEFT_ARROW: Phaser.Key;
        ESCAPE: Phaser.Key;
        walkingSpeed: number;
        public static MAX_SPEED: number = 100;
        health: number;

        constructor(game: Phaser.Game, x: number, y: number) {
            this.game = game;
            this.walkingSpeed = 0;
            this.health = 100;
            // Wire up input handlers
            this.RIGHT_ARROW = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
            this.RIGHT_ARROW.onDown.add(Enemy.prototype.MoveRight, this);
            this.LEFT_ARROW = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
            this.LEFT_ARROW.onDown.add(Enemy.prototype.MoveLessRight, this);
            this.ESCAPE = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
            this.ESCAPE.onDown.add(Enemy.prototype.GameOver, this);
            super(game, x, y, "enemy-walk", 0);
            this.anchor.set(0.0, 1.0);
            this.StartIdle();
        }

        update() {
            if (this.playerState === PlayerState.WALKING) {
                this.x += (this.walkingSpeed / Enemy.MAX_SPEED) * this.game.time.elapsedMS;
                // This logic depends on scene being added first.
                // let stageWidth = this.game.stage.getChildAt(0).getBounds().width;
                // if (this.x > stageWidth * .75)
                //   this.x = stageWidth * .25;
            }
            super.update();
        }

        // Worse function name ever!
        MoveLessRight() {
            if (this.playerState !== PlayerState.IDLE) {
                this.walkingSpeed--;
                if (this.walkingSpeed > 0)
                    this.animations.currentAnim.speed = this.walkingSpeed;
                else
                    this.StartIdle();
            }
        }

        MoveRight() {
            if (this.playerState === PlayerState.IDLE) {
                this.StartWalking();
            }
            else {
                if (this.walkingSpeed < Enemy.MAX_SPEED)
                    this.walkingSpeed++;
                this.animations.currentAnim.speed = this.walkingSpeed;
            }
        }

        StartWalking() {
            this.playerState = PlayerState.WALKING;
            this.walkingSpeed = 5;
            this.loadTexture("enemy-walking", 0);
            this.animations.add("walk");
            this.animations.play("walk", this.walkingSpeed, true);
        }

        StartIdle() {
            this.loadTexture("enemy-idle", 0);
            this.playerState = PlayerState.IDLE;
            this.animations.add("Idle");
            this.animations.play("Idle", 15, true);
        }

        onAttack(damage) {
            this.health -= 1;
            if (this.health === 0) {
              this.kill();
            }
        }

        GameOver() {
            this.game.state.start("GameOverState");
        }
    }
}
