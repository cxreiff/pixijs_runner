import { Scene } from "../abstract/scene";
import { OptionsEntity } from "../entities/optionsEntity";
import { View } from "../static/view";

export class OverlayScene extends Scene {
  constructor() {
    super();
    this.addEntity(new OptionsEntity(50, View.unitHeight() - 15));
  }
}
