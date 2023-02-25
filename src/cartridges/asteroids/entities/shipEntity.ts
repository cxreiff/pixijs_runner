import { Bodies, Body, Collision } from "matter-js";

import { DisplayObject, Sprite } from "../../../pixijs";

import { MatterEntity } from "../../../shared/abstract/matterEntity";
import { Keyboard } from "../../../shared/static/keyboard";
import { Manager } from "../../../shared/static/manager";
import { Sound } from "../../../shared/static/sound";
import { View } from "../../../shared/static/view";

import { AsteroidEntity } from "../entities/asteroidEntity";
import { LaserEntity } from "../entities/laserEntity";
import { AsteroidScene } from "../scenes/asteroidScene";

export class ShipEntity extends MatterEntity<Sprite> {
  public static readonly CONTROLS = {
    FIRE: "Space",
    TURN_LEFT: "ArrowLeft",
    TURN_RIGHT: "ArrowRight",
    FORWARD: "ArrowUp",
    BACKWARD: "ArrowDown",
  };

  private static readonly VERTICES = [
    { x: -25, y: 40 },
    { x: 25, y: 40 },
    { x: 30, y: 30 },
    { x: 3, y: -15 },
    { x: -3, y: -15 },
    { x: -30, y: 30 },
  ];

  public static readonly FULL_HEALTH = 5;
  private static readonly SPEED = 6;
  private static readonly TURNING_SPEED = 0.1;
  private static readonly INVULNERABLE_DURATION = 100;

  public health = ShipEntity.FULL_HEALTH;
  private invulnerable = 0;

  constructor() {
    super(
      new Sprite(Manager.sprite("asteroids", "ship.png")),
      Bodies.fromVertices(
        View.unitWidth() * 0.5,
        View.unitHeight() * 0.6,
        [ShipEntity.VERTICES],
        {
          friction: 0.9,
          frictionAir: 0.9,
          inertia: 0.1,
          collisionFilter: {
            category: AsteroidScene.COLLISION_CATEGORIES.SHIP,
            mask: AsteroidScene.COLLISION_CATEGORIES.ASTEROID,
          },
        }
      )
    );

    this.facade.width = View.scale(64);
    this.facade.height = View.scale(64);
    this.facade.anchor.x = 0.5;
    this.facade.anchor.y = 0.5;

    Keyboard.listenFor(...Object.values(ShipEntity.CONTROLS));

    super.resize();
  }

  override update(delta: number) {
    if (this.invulnerable > 0) {
      this.invulnerable -= delta;
      this.facade.alpha = 0.5;
    } else {
      this.facade.alpha = 1.0;
    }

    if (Keyboard.wasPressed(ShipEntity.CONTROLS.FIRE)) {
      this.spawnProjectile();
    }

    if (Keyboard.isPressed(ShipEntity.CONTROLS.TURN_LEFT)) {
      Body.setAngle(
        this.body,
        this.body.angle - ShipEntity.TURNING_SPEED * delta
      );
    }

    if (Keyboard.isPressed(ShipEntity.CONTROLS.TURN_RIGHT)) {
      Body.setAngle(
        this.body,
        this.body.angle + ShipEntity.TURNING_SPEED * delta
      );
    }

    if (Keyboard.isPressed(ShipEntity.CONTROLS.FORWARD)) {
      Body.setPosition(this.body, {
        x:
          this.body.position.x +
          ShipEntity.SPEED * Math.sin(this.facade.rotation) * delta,
        y:
          this.body.position.y -
          ShipEntity.SPEED * Math.cos(this.facade.rotation) * delta,
      });
    }

    if (Keyboard.isPressed(ShipEntity.CONTROLS.BACKWARD)) {
      Body.setPosition(this.body, {
        x:
          this.body.position.x -
          ShipEntity.SPEED * Math.sin(this.facade.rotation) * delta,
        y:
          this.body.position.y +
          ShipEntity.SPEED * Math.cos(this.facade.rotation) * delta,
      });
    }

    this.boundPositionToView(0.017 * View.unitWidth());
    this.resize();
  }

  override collide(entity: MatterEntity<DisplayObject>, collision: Collision) {
    if (entity instanceof AsteroidEntity && this.invulnerable <= 0) {
      this.invulnerable = ShipEntity.INVULNERABLE_DURATION;
      this.health -= 1;
      if (this.health === 0) {
        Sound.play("blup");
        Manager.reloadStart("YOU DIED");
        return true;
      }
    }
  }

  spawnProjectile() {
    Sound.play("blip");
    Manager.currentScene.addEntity(
      new LaserEntity(
        this.body.position.x,
        this.body.position.y,
        this.body.angle
      )
    );
  }

  override resize() {
    this.facade.width = View.scale(64);
    this.facade.height = View.scale(64);
    super.resize();
  }
}
