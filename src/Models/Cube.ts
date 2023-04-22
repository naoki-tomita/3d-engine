import { Color, Face, Model, Vertex3D } from "../Engine";

export class Cube extends Model {
  constructor(x: number, y: number, z: number, size: number) {
    const w = size / 2, h = size / 2, d = size / 2, p = { x: x, y: y, z: z };
    const f = [
      new Face(new Vertex3D(p.x - w, p.y - h, p.z - d), new Vertex3D(p.x + w, p.y - h, p.z - d), new Vertex3D(p.x - w, p.y - h, p.z + d), Color.Red),
      new Face(new Vertex3D(p.x + w, p.y - h, p.z - d), new Vertex3D(p.x + w, p.y - h, p.z + d), new Vertex3D(p.x - w, p.y - h, p.z + d), Color.Red),
      new Face(new Vertex3D(p.x - w, p.y - h, p.z + d), new Vertex3D(p.x + w, p.y - h, p.z + d), new Vertex3D(p.x - w, p.y + h, p.z + d), Color.Blue),
      new Face(new Vertex3D(p.x - w, p.y + h, p.z + d), new Vertex3D(p.x + w, p.y - h, p.z + d), new Vertex3D(p.x + w, p.y + h, p.z + d), Color.Blue),
      new Face(new Vertex3D(p.x + w, p.y - h, p.z - d), new Vertex3D(p.x + w, p.y + h, p.z - d), new Vertex3D(p.x + w, p.y - h, p.z + d), Color.Green),
      new Face(new Vertex3D(p.x + w, p.y + h, p.z - d), new Vertex3D(p.x + w, p.y + h, p.z + d), new Vertex3D(p.x + w, p.y - h, p.z + d), Color.Green),
      new Face(new Vertex3D(p.x - w, p.y + h, p.z - d), new Vertex3D(p.x - w, p.y + h, p.z + d), new Vertex3D(p.x + w, p.y + h, p.z - d), Color.Orange),
      new Face(new Vertex3D(p.x + w, p.y + h, p.z - d), new Vertex3D(p.x - w, p.y + h, p.z + d), new Vertex3D(p.x + w, p.y + h, p.z + d), Color.Orange),
      new Face(new Vertex3D(p.x - w, p.y - h, p.z - d), new Vertex3D(p.x - w, p.y - h, p.z + d), new Vertex3D(p.x - w, p.y + h, p.z + d), Color.Pink),
      new Face(new Vertex3D(p.x - w, p.y - h, p.z - d), new Vertex3D(p.x - w, p.y + h, p.z + d), new Vertex3D(p.x - w, p.y + h, p.z - d), Color.Pink),
      new Face(new Vertex3D(p.x - w, p.y - h, p.z - d), new Vertex3D(p.x - w, p.y + h, p.z - d), new Vertex3D(p.x + w, p.y - h, p.z - d), Color.Yellow),
      new Face(new Vertex3D(p.x + w, p.y - h, p.z - d), new Vertex3D(p.x - w, p.y + h, p.z - d), new Vertex3D(p.x + w, p.y + h, p.z - d), Color.Yellow),
    ];
    super(f);
  }
}
