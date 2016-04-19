namespace ndd {
    export class Resource {
        public static BULLET_TEXTURE = ["single_bullet", "double_bullet", "bullet"];
    }
    export interface BaseBullet {
        getLevel(): number;
        getDamage(): number;
        costMoney(): number;
        isMaxLevel(): boolean;
        getTexture(): string;
    }
    export class Bullet implements BaseBullet {
        getLevel(): number {
            return 0;
        }
        getDamage(): number {
            return 1;
        }
        costMoney(): number {
            return 1;
        }
        isMaxLevel(): boolean {
            return false;
        }
        getTexture(): string {
            return Resource.BULLET_TEXTURE[this.getLevel()];
        }
    }
    export abstract class BulletDecorator implements BaseBullet {
        decoratedBullet: BaseBullet;
        constructor(decoratedBullet: BaseBullet) {
            this.decoratedBullet = decoratedBullet;
        }
        getLevel(): number {
            return this.decoratedBullet.getLevel();
        }
        getDamage(): number {
            return this.decoratedBullet.getDamage();
        }
        costMoney(): number {
            return this.decoratedBullet.costMoney();
        }
        isMaxLevel(): boolean {
            return this.decoratedBullet.isMaxLevel();
        }
        getTexture(): string {
            return this.decoratedBullet.getTexture();
        }
    }
    export class UpgradeBullet extends BulletDecorator {
        constructor(decoratedBullet: BaseBullet) {
            super(decoratedBullet);
        }
        getLevel(): number {
            if (this.isMaxLevel()) {
                return this.decoratedBullet.getLevel();
            }
            return this.decoratedBullet.getLevel() + 1;
        }
        getDamage(): number {
            if (this.isMaxLevel()) {
                return this.decoratedBullet.getDamage();
            }
            return this.decoratedBullet.getDamage() + 1;
        }
        costMoney(): number {
            if (this.isMaxLevel()) {
                return this.decoratedBullet.costMoney();
            }
            return this.decoratedBullet.costMoney() + 1;
        }
        isMaxLevel(): boolean {
            return this.decoratedBullet.getLevel() >= 2;
        }
        getTexture(): string {
            return Resource.BULLET_TEXTURE[this.getLevel()];
        }
    }
}
