import { Manager } from "../static/manager";

export class Sound {
  public static muted = true;

  private constructor() {}

  public static play(sound: string) {
    if (!Sound.muted) {
      void Manager.sound(sound)?.play();
    }
  }
}
