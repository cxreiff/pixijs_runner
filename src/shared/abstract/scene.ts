import { Container, DisplayObject } from "../../pixijs";

import { Entity } from "../abstract/entity";

/**
 * Abstract class representing a scene containing child entities and scene-specific logic.
 */
export abstract class Scene extends Container {
  public entities: Entity<DisplayObject>[] = [];

  public update(delta: number) {
    this.entities.forEach((entity) => entity.update(delta));
    this.entities.forEach((entity) => entity.resize());
  }

  public override destroy() {
    this.entities = [];
    super.destroy();
  }

  public addEntity(entity: Entity<DisplayObject>) {
    this.entities.push(entity);
    this.addChild(entity);
    return entity;
  }

  public removeEntity(entity: Entity<DisplayObject>) {
    const index = this.entities.indexOf(entity);
    if (index >= 0) {
      this.entities.splice(index, 1);
      this.removeChild(entity);
    }
    return entity;
  }
}
