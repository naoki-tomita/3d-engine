import { Color, Face, Model, Vertex3D } from "../Engine";

export class Plane extends Model {
  static load(x: number, z: number, width: number, depth: number) {
    return new Plane([
      new Face(new Vertex3D(x, 0, z), new Vertex3D(x + width, 0, z + depth), new Vertex3D(x + width, 0, z), Color.Yellow),
      new Face(new Vertex3D(x, 0, z), new Vertex3D(x, 0, z + depth), new Vertex3D(x + width, 0, z + depth), Color.Green),
    ]);
  }
}
