import { Loader } from "../../pixijs";

import { Scene } from "../abstract/scene";
import { LoaderEntity } from "../entities/loaderEntity";
import { Manager } from "../static/manager";

import { Asset } from "../../cartridges";

export class LoaderScene extends Scene {
  private loaderEntity = new LoaderEntity();

  constructor(assets: Asset[], onComplete: () => void) {
    super();

    this.addEntity(this.loaderEntity);

    Manager.app?.loader.add(assets);

    Manager.app?.loader.onProgress.add(this.onProgress, this);
    Manager.app?.loader.onComplete.once(
      () => setTimeout(onComplete, 200),
      this
    );

    Manager.app?.loader.load();
  }

  private onProgress = (loader: Loader) => {
    this.loaderEntity.progress = loader.progress / 100;
  };
}
