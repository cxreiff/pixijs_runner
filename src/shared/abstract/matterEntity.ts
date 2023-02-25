import { Body, Collision } from "matter-js";

import { DisplayObject } from "../../pixijs";

import { Entity } from "../abstract/entity";
import { View } from "../static/view";

export abstract class MatterEntity<T extends DisplayObject> extends Entity<T> {
  public readonly body: Body;

  constructor(object: T, body: Body) {
    super(object);

    this.body = body;
  }

  /**
   * @param {MatterEntity<DisplayObject>} entity - The other entity collided with.
   * @param {Collision} collision - Contains information about the collision.
   * @returns {boolean | void} If a collision function returns true, we ignore the rest of the collisions.
   */
  public abstract collide(
    entity: MatterEntity<DisplayObject>,
    collision: Collision
  ): boolean | void;

  public static isInstance(
    entity: Entity<DisplayObject>
  ): entity is MatterEntity<DisplayObject> {
    return entity instanceof MatterEntity;
  }

  override boundPositionToTop(buffer = 0.0): boolean {
    if (this.body.position.y < buffer) {
      Body.setPosition(this.body, {
        x: this.body.position.x,
        y: buffer,
      });
      return true;
    }
    return false;
  }

  override boundPositionToRight(buffer = 0.0): boolean {
    if (this.body.position.x > View.unitWidth() - buffer) {
      Body.setPosition(this.body, {
        x: View.unitWidth() - buffer,
        y: this.body.position.y,
      });
      return true;
    }
    return false;
  }

  override boundPositionToBottom(buffer = 0.0): boolean {
    if (this.body.position.y > View.unitHeight() - buffer) {
      Body.setPosition(this.body, {
        x: this.body.position.x,
        y: View.unitHeight() - buffer,
      });
      return true;
    }
    return false;
  }

  override boundPositionToLeft(buffer = 0.0): boolean {
    if (this.body.position.x < buffer) {
      Body.setPosition(this.body, {
        x: buffer,
        y: this.body.position.y,
      });
      return true;
    }
    return false;
  }

  override resize() {
    this.facade.position.x = View.scale(this.body.position.x);
    this.facade.position.y = View.scale(this.body.position.y);
    this.facade.rotation = this.body.angle;
  }
}
