import { Container, Texture, Sprite } from "../../pixijs";

import { Entity } from "../abstract/entity";
import { Manager } from "../static/manager";
import { View } from "../static/view";
import { Sound } from "../static/sound";

export class OptionsEntity extends Entity<Container> {
  private static readonly OPTION_BUTTON_SIZE = 42;
  private static readonly OPTION_BUTTON_HOVER_SIZE = 48;

  // private fullscreenTexture: Texture
  // private infullscreenTexture: Texture
  private mutedTexture: Texture;
  private unmutedTexture: Texture;

  // private fullscreenButton: Sprite
  private soundButton: Sprite;

  constructor(x: number, y: number) {
    super(new Container());

    // this.fullscreenTexture = Manager.sprite('shared', 'fullscreen.png')
    // this.infullscreenTexture = Manager.sprite('shared', 'infullscreen.png')
    this.mutedTexture = Manager.sprite("shared", "muted.png");
    this.unmutedTexture = Manager.sprite("shared", "unmuted.png");

    // this.fullscreenButton = new Sprite(View.isFullscreen() ? this.infullscreenTexture : this.fullscreenTexture);
    this.soundButton = new Sprite(
      Sound.muted ? this.mutedTexture : this.unmutedTexture
    );

    for (const optionSprite of [/*this.fullscreenButton,*/ this.soundButton]) {
      optionSprite.anchor.x = 0.5;
      optionSprite.anchor.y = 1.0;
      optionSprite.interactive = true;
      optionSprite.cursor = "pointer";
      optionSprite.width = View.scale(OptionsEntity.OPTION_BUTTON_SIZE);
      optionSprite.height = View.scale(OptionsEntity.OPTION_BUTTON_SIZE);
      optionSprite.on("mouseover", () => {
        optionSprite.width = View.scale(OptionsEntity.OPTION_BUTTON_HOVER_SIZE);
        optionSprite.height = View.scale(
          OptionsEntity.OPTION_BUTTON_HOVER_SIZE
        );
      });
      optionSprite.on("mouseout", () => {
        optionSprite.width = View.scale(OptionsEntity.OPTION_BUTTON_SIZE);
        optionSprite.height = View.scale(OptionsEntity.OPTION_BUTTON_SIZE);
      });
    }

    // this.fullscreenButton.on('pointerdown', () => {
    //     this.fullscreenButton.texture = View.isFullscreen() ? this.fullscreenTexture : this.infullscreenTexture
    //     View.toggleFullscreen()
    // })

    // this.soundButton.position.x = View.scale(70)
    this.soundButton.on("pointerdown", () => {
      Sound.muted = !Sound.muted;
      this.soundButton.texture = Sound.muted
        ? this.mutedTexture
        : this.unmutedTexture;
    });

    // this.facade.addChild(this.fullscreenButton)
    this.facade.addChild(this.soundButton);

    this.relativePosition.x = x;
    this.relativePosition.y = y;
    this.resize();
  }

  override update(delta: number) {}
}
