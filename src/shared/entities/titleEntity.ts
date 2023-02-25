import { Text } from "../../pixijs";

import { Entity } from "../abstract/entity";
import { Constants } from "../static/constants";

export class TitleEntity extends Entity<Text> {
  constructor(text: string, x: number, y: number) {
    super(
      new Text(text, {
        ...Constants.TEXT_OPTIONS,
        fontSize: 48,
        align: "center",
      })
    );
    this.facade.anchor.x = 0.5;
    this.relativePosition.x = x;
    this.relativePosition.y = y;
    this.resize();
  }

  override update(delta: number) {}
}
