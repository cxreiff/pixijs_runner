import { Collision } from "matter-js";

import { Sprite, DisplayObject } from "../../../pixijs";

import { MatterEntity } from "../../../shared/abstract/matterEntity";

export class BallEntity extends MatterEntity<Sprite> {
  public collide(
    entity: MatterEntity<DisplayObject>,
    collision: Collision
  ): boolean | void {}

  public update(delta: number) {}
}
