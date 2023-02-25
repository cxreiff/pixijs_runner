import { Engine, Composite, Body } from "matter-js";

import { DisplayObject } from "../../pixijs";

/**
 * Types for Detector currently missing in @types/matter-js
 * https://github.com/DefinitelyTyped/DefinitelyTyped/discussions/59663
 * TODO: Remove ignores when correct types are added in DefinitelyTyped
 */
/* eslint-disable no-duplicate-imports */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Detector } from "matter-js";

import { Entity } from "../abstract/entity";
import { MatterEntity } from "../abstract/matterEntity";
import { Scene } from "../abstract/scene";

export abstract class MatterScene extends Scene {
  public engine = Engine.create({
    gravity: { x: 0, y: 0, scale: 0 },
  });

  protected detector = Detector.create();

  private bodies = new Map<number, MatterEntity<DisplayObject>>();

  override update(delta: number) {
    Engine.update(this.engine, delta);
    for (const collision of Detector.collisions(this.detector)) {
      const entityA = this.bodies.get(collision.bodyA.id);
      const entityB = this.bodies.get(collision.bodyB.id);
      if (entityA && entityB) {
        if (
          entityA.collide(entityB, collision) ||
          entityB.collide(entityA, collision)
        ) {
          break;
        }
      }
    }
    super.update(delta);
  }

  override addEntity(entity: Entity<DisplayObject>) {
    if (MatterEntity.isInstance(entity)) {
      this.bodies.set(entity.body.id, entity);
      Detector.setBodies(this.detector, [...this.detector.bodies, entity.body]);
      Composite.add(this.engine.world, entity.body);
    }
    super.addEntity(entity);
    return entity;
  }

  override removeEntity(entity: Entity<DisplayObject>) {
    if (entity instanceof MatterEntity) {
      this.bodies.delete(entity.body.id);
      Detector.setBodies(
        this.detector,
        this.detector.bodies.filter((body: Body) => body.id !== entity.body.id)
      );
      Composite.remove(this.engine.world, entity.body);
    }
    super.removeEntity(entity);
    return entity;
  }
}
