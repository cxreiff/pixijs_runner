import { Graphics } from "../../../pixijs";

import { Entity } from "../../../shared/abstract/entity";
import { View } from "../../../shared/static/view";

import { WavyEntity } from "../entities/wavyEntity";

export class GliderEntity extends Entity<Graphics> {
  private wavy: WavyEntity;

  constructor(wavy: WavyEntity) {
    super(new Graphics());
    this.wavy = wavy;
    this.relativePosition.x = View.unitWidth() * 0.5;
    this.relativePosition.y = View.unitHeight() * 0.7;
  }

  override update(delta: number) {
    const linePosAtPlayer = this.wavy.points.slice(-10)[0].x;
    if (this.relativePosition.x < linePosAtPlayer - 40) {
      this.relativePosition.x +=
        (linePosAtPlayer - 40 - this.relativePosition.x) / 10;
    } else if (this.relativePosition.x > linePosAtPlayer + 40) {
      this.relativePosition.x +=
        (linePosAtPlayer + 40 - this.relativePosition.x) / 10;
    }

    this.facade.clear();
    this.facade.lineStyle(0);
    this.facade.beginFill(0x3d3333, 1);
    this.facade.moveTo(View.scale(-70 / 2), 0);
    this.facade.lineTo(View.scale(70 / 2), 0);
    this.facade.lineTo(0, View.scale(-70));
    this.facade.endFill();
  }
}
