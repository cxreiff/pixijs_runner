import { Sprite } from "../../pixijs";

import { Entity } from "../abstract/entity";
import { Manager } from "../static/manager";
import { Keyboard } from "../static/keyboard";
import { View } from "../static/view";

export class StartEntity extends Entity<Sprite> {
  private static readonly CONTROLS = {
    START: "Space",
  };

  private static readonly START_BUTTON_SIZE = 84;
  private static readonly START_BUTTON_HOVER_SIZE = 96;

  private onStart: () => void;

  constructor(onStart: () => void, x: number, y: number) {
    super(new Sprite(Manager.sprite("shared", "start.png")));

    this.onStart = onStart;

    this.facade.anchor.x = 0.5;
    this.facade.anchor.y = 0.5;
    this.facade.width = View.scale(StartEntity.START_BUTTON_SIZE);
    this.facade.height = View.scale(StartEntity.START_BUTTON_SIZE);
    this.relativePosition.x = x;
    this.relativePosition.y = y;
    this.resize();

    this.facade.interactive = true;
    this.facade.cursor = "pointer";
    this.facade.on("pointerdown", this.onStart);
    this.facade.on("mouseover", () => {
      this.facade.width = View.scale(StartEntity.START_BUTTON_HOVER_SIZE);
      this.facade.height = View.scale(StartEntity.START_BUTTON_HOVER_SIZE);
    });
    this.facade.on("mouseout", () => {
      this.facade.width = View.scale(StartEntity.START_BUTTON_SIZE);
      this.facade.height = View.scale(StartEntity.START_BUTTON_SIZE);
    });

    Keyboard.listenFor(...Object.values(StartEntity.CONTROLS));
  }

  override update(delta: number) {
    if (Keyboard.wasPressed(StartEntity.CONTROLS.START)) {
      this.onStart();
    }
  }
}
