import { Color } from "./Material/Color";
import { createRenderer } from "./Material/ImageRenderer";
import { Texture } from "./Material/Texture";
import { Vertex2D } from "./Vertex2D";

export class CanvasView {
  context: CanvasRenderingContext2D;
  width: number;
  height: number;
  imageRenderer: ReturnType<typeof createRenderer>
  constructor() {
    const canvas = document.querySelector("canvas")!
    this.context = canvas.getContext("2d")!;
    this.width = canvas.width;
    this.height = canvas.height;
    this.imageRenderer = createRenderer(this.width, this.height);
  }
  clear() {
    this.context.clearRect(0, 0, this.width, this.height);
  }
  drawImage(v1: Vertex2D, v2: Vertex2D, v3: Vertex2D, texture: Texture) {
    this.imageRenderer(texture.image, [texture.v1, texture.v2, texture.v3], this.context, [v1, v2, v3])
  }
  draw(v1: Vertex2D, v2: Vertex2D, v3: Vertex2D, color: Color, strokeColor?: Color) {
    const dx = this.width / 2;
    const dy = this.height / 2;
    this.context.beginPath();
    this.context.moveTo(v1.x + dx, -v1.y + dy);
    this.context.lineTo(v2.x + dx, -v2.y + dy);
    this.context.lineTo(v3.x + dx, -v3.y + dy);
    this.context.closePath();
    this.context.strokeStyle = strokeColor?.value ?? color.value;
    this.context.stroke();
    this.context.fillStyle = color.value;
    this.context.fill();
  }
}
