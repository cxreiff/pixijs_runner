import { Scene } from "../../../shared/abstract/scene";

import { WavyEntity } from "../entities/wavyEntity";
import { GliderEntity } from "../entities/gliderEntity";

export class WavyScene extends Scene {
  private wavyEntity: WavyEntity;
  private gliderEntity: GliderEntity;

  constructor() {
    super();

    this.wavyEntity = new WavyEntity();
    this.gliderEntity = new GliderEntity(this.wavyEntity);

    this.addEntity(this.wavyEntity);
    this.addEntity(this.gliderEntity);
  }
}
