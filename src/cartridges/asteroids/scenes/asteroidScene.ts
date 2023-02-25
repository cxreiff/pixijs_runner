import { Query, Bounds } from "matter-js";

import { DisplayObject } from "../../../pixijs";

import { MatterScene } from "../../../shared/abstract/matterScene";
import { Entity } from "../../../shared/abstract/entity";
import { View } from "../../../shared/static/view";

import { AsteroidEntity } from "../entities/asteroidEntity";
import { HealthEntity } from "../entities/healthEntity";
import { ShipEntity } from "../entities/shipEntity";
import { ScoreEntity } from "../entities/scoreEntity";

export class AsteroidScene extends MatterScene {
  public static readonly ASTEROID_INTERVAL = 80;
  public static readonly ASTEROID_LIMIT = 12;
  public static readonly ASTEROID_MIN_SIZE = 0.03;
  public static readonly ASTEROID_MAX_SIZE = 0.07;
  public static readonly ASTEROID_VARIATION = 0.03;
  public static readonly COLLISION_CATEGORIES = {
    DEFAULT: 0x0001,
    ASTEROID: 0x0002,
    SHIP: 0x0004,
    LASER: 0x008,
    EMPTY: 0x016,
  };
  public static readonly Z_LAYERS = {
    GUI: 2,
    OBJECTS: 1,
    BACKGROUND: 0,
  };
  public static readonly TEXT_OPTIONS = {
    fontFamily: "monospace",
    fill: 0x3d3333,
    fontSize: 32,
    align: "left",
    dropShadow: true,
    dropShadowDistance: 0,
    dropShadowBlur: 3,
    dropShadowColor: 0xeedddd,
  };

  private asteroidCountdown = AsteroidScene.ASTEROID_INTERVAL;
  private asteroidList: AsteroidEntity[] = [];

  public scoreEntity = new ScoreEntity(View.unitWidth() - 20, 20, "right");
  public shipEntity = new ShipEntity();
  public healthEntity = new HealthEntity(20, 20);

  constructor() {
    super();

    this.sortableChildren = true;

    this.scoreEntity.zIndex = AsteroidScene.Z_LAYERS.GUI;
    this.healthEntity.zIndex = AsteroidScene.Z_LAYERS.GUI;

    this.addEntity(this.shipEntity);
    this.addEntity(this.scoreEntity);
    this.addEntity(this.healthEntity);
  }

  override update(delta: number) {
    super.update(delta);

    if (this.asteroidList.length < AsteroidScene.ASTEROID_LIMIT) {
      if (this.asteroidCountdown >= 0) {
        this.asteroidCountdown -= delta;
      } else if (this.asteroidCountdown < 0) {
        let x: number, y: number;
        const radius =
          AsteroidScene.ASTEROID_MAX_SIZE * View.unitWidth() -
          ~~(
            Math.random() *
            AsteroidScene.ASTEROID_VARIATION *
            View.unitWidth()
          );
        do {
          x = radius + Math.random() * (View.unitWidth() - 2 * radius);
          y = radius + Math.random() * (View.unitHeight() - 2 * radius);
        } while (
          Query.region(
            this.detector.bodies,
            Bounds.create([
              { x: x - radius * 2, y: y - radius * 2 },
              { x: x + radius * 2, y: y - radius * 2 },
              { x: x + radius * 2, y: y + radius * 2 },
              { x: x - radius * 2, y: y + radius * 2 },
            ])
          ).length > 0
        );
        this.spawnAsteroid(
          x,
          y,
          AsteroidScene.ASTEROID_MAX_SIZE * View.unitWidth() -
            ~~(
              Math.random() *
              AsteroidScene.ASTEROID_VARIATION *
              View.unitWidth()
            )
        );
      }
    }
  }

  public spawnAsteroid(x: number, y: number, size: number) {
    this.asteroidCountdown =
      AsteroidScene.ASTEROID_INTERVAL + this.asteroidList.length * 10;
    return this.addEntity(new AsteroidEntity(x, y, size));
  }

  override addEntity(entity: Entity<DisplayObject>) {
    if (entity instanceof AsteroidEntity) {
      this.asteroidList.push(entity);
    }
    return super.addEntity(entity);
  }

  override removeEntity(entity: Entity<DisplayObject>) {
    if (entity instanceof AsteroidEntity) {
      this.asteroidList = this.asteroidList.filter(
        (asteroid) => asteroid.body.id !== entity.body.id
      );
    }
    return super.removeEntity(entity);
  }
}
