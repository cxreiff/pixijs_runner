import { Text } from "../../../pixijs";

import { Entity } from "../../../shared/abstract/entity";
import { Constants } from "../../../shared/static/constants";

export class ScoreEntity extends Entity<Text> {
  public score: number;

  constructor(
    x: number,
    y: number,
    alignment: "left" | "center" | "right",
    initialScore = 0
  ) {
    super(
      new Text(initialScore.toString(), {
        ...Constants.TEXT_OPTIONS,
        fontSize: 32,
        align: alignment,
      })
    );
    this.facade.anchor.x = { left: 0, center: 0.5, right: 1 }[alignment];
    this.relativePosition.x = x;
    this.relativePosition.y = y;
    this.score = initialScore;
  }

  override update(delta: number) {
    this.facade.text = this.score.toString();
  }

  public setScore(score: number) {
    if (score >= 0) {
      this.score = score;
      this.facade.text = this.score.toString();
    }
  }
}
