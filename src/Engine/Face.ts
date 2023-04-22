import { Color, Vector, Vertex3D } from ".";

export class Face {
  constructor(readonly v1: Vertex3D, readonly v2: Vertex3D, readonly v3: Vertex3D, readonly color: Color) {}
  get normalVector(): Vector {
    const vec1 = this.v2.subtract(this.v1).toVector();
    const vec2 = this.v3.subtract(this.v2).toVector();
    return vec1.cross(vec2).normalize();
  }
  get center() {
    return new Vertex3D(
      (this.v1.x + this.v2.x + this.v3.x) / 3,
      (this.v1.y + this.v2.y + this.v3.y) / 3,
      (this.v1.z + this.v2.z + this.v3.z) / 3,
    )
  }
}
