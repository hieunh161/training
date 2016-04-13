import {Component, OnInit} from "angular2/core";

@Component({
  selector: "my-app",
  template: ""
})
export class GameLoad implements OnInit {
  game: Phaser.Game;
  constructor() {
    this.game = new Phaser.Game(1280, 720, Phaser.AUTO, "content",
      { preload: this.preload, create: this.create, update: this.update });
  }
  preload() {
    this.game.load.image("load", "assets/background/load.jpg");
    // sprite
    this.game.load.atlasXML("enemy-walking", "assets/graphic/Hero_Walking.png", "assets/graphic/Hero_Walking.xml");
    this.game.load.atlasXML("enemy-idle", "assets/graphic/Hero_Idle.png", "assets/graphic/Hero_Idle.xml");
    // weather
    this.game.load.spritesheet("rain", "assets/weather/rain.png", 17, 17);
    this.game.load.spritesheet("snowflakes", "assets/weather/snowflake.png", 17, 17);
    this.game.load.spritesheet("snowflakes_large", "assets/weather/snowflakes_large.png", 64, 64);
    // font
    this.game.load.bitmapFont("desyrel", "assets/font/desyrel.png", "assets/font/desyrel.xml");
    // bullet
    this.game.load.image("tank", "assets/ball/tank1.png");
    this.game.load.image("bullet", "assets/ball/bullet.png");
    this.game.load.spritesheet("kaboom", "assets/ball/explosion.png", 64, 64, 23);
  }
  create() {
    this.game.state.add("LoadingState", ndd.LoadingState, true);
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  }
  update() { }
  ngOnInit() {
    window.onload = () => { };
  }
}
