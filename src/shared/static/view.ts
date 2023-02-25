export class View {
  public static element: HTMLCanvasElement;
  public static aspectRatio: number;

  private static units = 1000;

  private constructor() {}

  public static initialize(view: HTMLCanvasElement, aspectRatio: number) {
    View.element = view;
    View.aspectRatio = aspectRatio;
  }

  public static scale = (units: number) =>
    (units / View.units) * (View.element.width / window.devicePixelRatio);

  public static ratio = () => View.element.height / View.element.width;

  public static unitWidth = () => View.units;

  public static unitHeight = () => View.units * View.ratio();
}
