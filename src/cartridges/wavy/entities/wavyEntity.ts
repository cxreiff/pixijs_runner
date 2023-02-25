import { Graphics, Point, Filter } from "../../../pixijs";

import vShader from "../../../assets/shaders/test.vert";
import fShader from "../../../assets/shaders/test.frag";

import { Entity } from "../../../shared/abstract/entity";
import { View } from "../../../shared/static/view";

export class WavyEntity extends Entity<Graphics> {
  public points: Point[] = [];

  private elapsed: number;
  private uniforms: { dimensions: number[] };
  private pointQuota = 0.0;

  constructor() {
    super(new Graphics());
    this.elapsed = 0.0;
    this.uniforms = { dimensions: [View.element.width, View.element.height] };
    this.filters = [new Filter(vShader, fShader, this.uniforms)];
  }

  override update(delta: number) {
    this.elapsed += delta;

    this.uniforms.dimensions = [View.element.width, View.element.height];

    this.pointQuota -= delta;
    if (this.pointQuota < 0.0) {
      const smoothOffset =
        ((Math.sin((250 + this.elapsed) / 50.0) +
          Math.sin((Math.PI * (250 + this.elapsed)) / 100.0)) /
          4.0) *
        600;
      this.points.push(
        new Point(
          View.unitWidth() * 0.5 + smoothOffset,
          View.unitHeight() * -0.3
        )
      );
      this.pointQuota = 6.0;
    }

    this.points.forEach((point, index) => {
      point.y += delta * 10;
      if (point.y > View.unitHeight() * 1.3) {
        this.points.splice(index, 1);
      }
    });

    this.facade.clear();
    this.facade.lineStyle(View.scale(200), 0xaa7777);
    this.facade.moveTo(View.unitWidth() * 0.5, View.unitHeight() * 1.3);
    this.points.forEach((point) =>
      this.facade.lineTo(View.scale(point.x), View.scale(point.y))
    );
  }
}
