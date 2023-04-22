export class Color {
  static Red    = new Color(255, 0, 0)
  static Green  = new Color(0, 255, 0)
  static Blue   = new Color(0, 0, 255)
  static Yellow = new Color(255, 255, 0)
  static Pink   = new Color(255, 20, 147)
  static Orange = new Color(255, 99, 71)
  static Cyan   = new Color(0, 255, 255)
  static Purple = new Color(255, 0, 255)
  static Black  = new Color(0, 0, 0)
  readonly r: number;
  readonly g: number;
  readonly b: number;
  constructor(r: number, g: number, b: number, readonly a: number = 1) {
    this.r = Math.floor(r);
    this.g = Math.floor(g);
    this.b = Math.floor(b);
  }
  darken(brightness: number = 1) {
    return new Color(Math.floor(this.r * brightness), Math.floor(this.g * brightness), Math.floor(this.b * brightness), this.a);
  }
  get value() {
    return `rgba(${this.r},${this.g},${this.b},${this.a})`;;
  }
}
