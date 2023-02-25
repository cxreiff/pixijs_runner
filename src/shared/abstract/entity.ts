import { Container, DisplayObject, Point } from "../../pixijs";

import { View } from "../static/view";

/**
 * Abstract class representing a visible entity with update logic.
 * Subscribes itself to passed-in ticker, and handles view scaling.
 */
export abstract class Entity<T extends DisplayObject> extends Container {
  public facade: T;
  public relativePosition: Point;
  public velocity: Point;

  constructor(facade: T) {
    super();
    this.facade = facade;
    this.relativePosition = new Point(0, 0);
    this.velocity = new Point(0, 0);

    this.addChild(facade);
  }

  public abstract update(delta: number): void;

  public resize() {
    this.facade.position.x = View.scale(this.relativePosition.x);
    this.facade.position.y = View.scale(this.relativePosition.y);
  }

  protected boundPositionToView(buffer = 0.0): boolean {
    const top = this.boundPositionToTop(buffer);
    const right = this.boundPositionToRight(buffer);
    const bottom = this.boundPositionToBottom(buffer);
    const left = this.boundPositionToLeft(buffer);
    return top || right || bottom || left;
  }

  protected boundPositionToTop(buffer = 0.0): boolean {
    if (this.relativePosition.y < 0.0 + buffer) {
      this.relativePosition.y = 0.0 + buffer;
      return true;
    }
    return false;
  }
  protected boundPositionToRight(buffer = 0.0): boolean {
    if (this.relativePosition.x > 1.0 - buffer) {
      this.relativePosition.x = 1.0 - buffer;
      return true;
    }
    return false;
  }
  protected boundPositionToBottom(buffer = 0.0): boolean {
    if (this.relativePosition.y > View.ratio() - buffer) {
      this.relativePosition.y = View.ratio() - buffer;
      return true;
    }
    return false;
  }
  protected boundPositionToLeft(buffer = 0.0): boolean {
    if (this.relativePosition.x < 0.0 + buffer) {
      this.relativePosition.x = 0.0 + buffer;
      return true;
    }
    return false;
  }

  protected updateForVelocity() {
    this.relativePosition.x += this.velocity.x;
    this.relativePosition.y += this.velocity.y;
  }
}
