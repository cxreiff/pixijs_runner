import { Text } from "../../../pixijs";

import { Entity } from "../../../shared/abstract/entity";
import { Manager } from "../../../shared/static/manager";
import { Constants } from "../../../shared/static/constants";

import { AsteroidScene } from "../scenes/asteroidScene";
import { ShipEntity } from "../entities/shipEntity";

export class HealthEntity extends Entity<Text> {
  public static readonly FULL_HEART = "\u2665";
  public static readonly EMPTY_HEART = "\u2661";

  constructor(x: number, y: number) {
    super(
      new Text(HealthEntity.FULL_HEART.repeat(ShipEntity.FULL_HEALTH), {
        ...Constants.TEXT_OPTIONS,
        fontSize: 48,
        align: "left",
      })
    );
    this.relativePosition.x = x;
    this.relativePosition.y = y;
    this.resize();
  }

  override update(delta: number) {
    const health = (Manager.currentScene as AsteroidScene).shipEntity.health;
    this.facade.text =
      HealthEntity.FULL_HEART.repeat(health) +
      HealthEntity.EMPTY_HEART.repeat(ShipEntity.FULL_HEALTH - health);
  }
}
