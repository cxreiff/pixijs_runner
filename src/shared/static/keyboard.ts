export class Keyboard {
  private static readonly listenedKeys: Map<string, boolean> = new Map();
  private static readonly pressedKeys: Map<string, boolean> = new Map();
  private static readonly unreadPresses: Map<string, boolean> = new Map();

  private constructor() {}

  public static initialize(view: HTMLCanvasElement) {
    view.setAttribute("tabindex", "1");
    view.addEventListener("keydown", Keyboard.onKeyDown);
    view.addEventListener("keyup", Keyboard.onKeyUp);
  }

  private static onKeyDown = (e: KeyboardEvent): void => {
    if (Keyboard.listenedKeys.get(e.code)) {
      if (!e.repeat) {
        Keyboard.pressedKeys.set(e.code, true);
        Keyboard.unreadPresses.set(e.code, true);
      }
      e.preventDefault();
    }
  };

  private static onKeyUp = (e: KeyboardEvent): void => {
    if (Keyboard.listenedKeys.get(e.code)) {
      Keyboard.pressedKeys.set(e.code, false);
      Keyboard.unreadPresses.set(e.code, false);
      e.preventDefault();
    }
  };

  public static virtualKeyDown = (code: string): void => {
    this.onKeyDown(new KeyboardEvent("keydown", { code }));
  };

  public static virtualKeyUp = (code: string): void => {
    this.onKeyUp(new KeyboardEvent("keyup", { code }));
  };

  public static listenFor(...codes: string[]) {
    codes.forEach((code) => Keyboard.listenedKeys.set(code, true));
  }

  public static clearListenedKeys(): void {
    Keyboard.listenedKeys.clear();
  }

  public static isPressed(code: string): boolean {
    return Keyboard.pressedKeys.get(code) || false;
  }

  public static wasPressed(code: string): boolean {
    if (Keyboard.unreadPresses.get(code)) {
      Keyboard.unreadPresses.set(code, false);
      return true;
    }
    return false;
  }
}
