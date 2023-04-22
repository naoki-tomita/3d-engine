import { Face, Vertex3D } from ".";

export class Model {
  constructor(readonly faces: Face[]) {}
  get vertices(): Vertex3D[] {
    return this.faces.map(it => [it.v1, it.v2, it.v3]).flat();
  }
}
