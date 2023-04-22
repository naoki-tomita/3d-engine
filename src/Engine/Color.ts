export class Color {
  static Red:    Color = new Color(255, 0, 0)
  static Green:  Color = new Color(0, 255, 0)
  static Blue:   Color = new Color(0, 0, 255)
  static Yellow: Color = new Color(255, 255, 0)
  static Pink:   Color = new Color(255, 20, 147)
  static Orange: Color = new Color(255, 99, 71)
  static Cyan:   Color = new Color(0, 255, 255)
  static Purple: Color = new Color(255, 0, 255)
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
