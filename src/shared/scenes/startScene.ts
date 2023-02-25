import { Scene } from "../abstract/scene";
import { StartEntity } from "../entities/startEntity";
import { TitleEntity } from "../entities/titleEntity";
import { View } from "../static/view";

export class StartScene extends Scene {
  constructor(title: string, onStart: () => void) {
    super();

    this.addEntity(
      new StartEntity(onStart, View.unitWidth() * 0.5, View.unitHeight() * 0.5)
    );
    this.addEntity(
      new TitleEntity(title, View.unitWidth() * 0.5, View.unitHeight() * 0.2)
    );
  }
}
