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
        info: Phaser.BitmapText;
        bullets: Phaser.Group;
        singleBullets: Phaser.Group;
        doubleBullets: Phaser.Group;
        bulletType: number;
        constructor() {
            super();
        }
        create() {
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.screenBackground = this.add.sprite(0, 0, "load");
            this.screenBackground.scale.setTo(this.game.width / this.screenBackground.width, this.game.height / this.screenBackground.height);
            this.enemy = new Enemy(this.game, 0, this.game.height - 50);
            this.game.add.existing(this.enemy);
            this.rain = new Rain(this.game, 0, 0);
            this.game.physics.enable(this.enemy, Phaser.Physics.ARCADE);
            this.info = this.game.add.bitmapText(30, 20, "desyrel", "Health : " + this.enemy.health, 32);
            // bullet
            this.bullets = this.game.add.group();
            this.bullets.enableBody = true;
            this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
            this.bullets.createMultiple(30, "bullet", 0, false);
            this.bullets.setAll("anchor.x", 0);
            this.bullets.setAll("anchor.y", 0);
            this.bullets.setAll("outOfBoundsKill", true);
            this.bullets.setAll("checkWorldBounds", true);

            this.singleBullets = this.game.add.group();
            this.singleBullets.enableBody = true;
            this.singleBullets.physicsBodyType = Phaser.Physics.ARCADE;
            this.singleBullets.createMultiple(30, "single_bullet", 0, false);
            this.singleBullets.setAll("anchor.x", 0);
            this.singleBullets.setAll("anchor.y", 0);
            this.singleBullets.setAll("outOfBoundsKill", true);
            this.singleBullets.setAll("checkWorldBounds", true);

            this.doubleBullets = this.game.add.group();
            this.doubleBullets.enableBody = true;
            this.doubleBullets.physicsBodyType = Phaser.Physics.ARCADE;
            this.doubleBullets.createMultiple(30, "double_bullet", 0, false);
            this.doubleBullets.setAll("anchor.x", 0);
            this.doubleBullets.setAll("anchor.y", 0);
            this.doubleBullets.setAll("outOfBoundsKill", true);
            this.doubleBullets.setAll("checkWorldBounds", true);
            this.bulletType = 1;
            this.game.input.onDown.add(this.shoot, this);
            // event handlers
            this.KEY_ONE = this.game.input.keyboard.addKey(Phaser.Keyboard.ONE);
            this.KEY_TWO = this.game.input.keyboard.addKey(Phaser.Keyboard.TWO);
            this.KEY_THREE = this.game.input.keyboard.addKey(Phaser.Keyboard.THREE);
            this.KEY_ONE.onDown.add(this.setNormalBullet, this);
            this.KEY_TWO.onDown.add(this.setSingleBullet, this);
            this.KEY_THREE.onDown.add(this.setDoubleBullet, this);
        }
        setNormalBullet() {
            this.bulletType = 1;
        }

        setSingleBullet() {
            this.bulletType = 2;
        }
        setDoubleBullet() {
            this.bulletType = 3;
        }
        shoot() {
            let bullet;
            if (this.bulletType === 1) {
                bullet = this.bullets.getFirstExists(false);
            } else if (this.bulletType === 2) {
                bullet = this.singleBullets.getFirstExists(false);
            } else if (this.bulletType === 3) {
                bullet = this.doubleBullets.getFirstExists(false);
            }
            console.log(this.bulletType);
            bullet.reset(980, 260);
            bullet.rotation = this.game.physics.arcade.moveToPointer(bullet, 1000, this.game.input.activePointer, 500);

        }
        updateText() {
            this.info.setText("Health : " + this.enemy.health);
        }
        killEnemy() {
            this.enemy.kill();
        }
        attackBulletOnEnemy(enemy, bullet) {
            // remove bullet
            enemy.onAttack(1);
            this.updateText();
            bullet.kill();
        }
        attackSingleBulletOnEnemy(enemy, bullet) {
            // remove bullet
            enemy.onAttack(2);
            this.updateText();
            bullet.kill();
        }
        attackDoubleBulletOnEnemy(enemy, bullet) {
            // remove bullet
            enemy.onAttack(3);
            this.updateText();
            bullet.kill();
        }
        stopRain() {
            this.rain.stop();
        }
        startRain() {
            this.rain.start();
        }
        removeSnow() {
            this.snow.kill();
        }
        update() {
            this.game.physics.arcade.overlap(this.bullets, this.enemy, this.attackBulletOnEnemy, null, this);
            this.game.physics.arcade.overlap(this.singleBullets, this.enemy, this.attackSingleBulletOnEnemy, null, this);
            this.game.physics.arcade.overlap(this.doubleBullets, this.enemy, this.attackDoubleBulletOnEnemy, null, this);
        }
    }
}
