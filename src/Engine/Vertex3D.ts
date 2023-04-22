import { Vector } from ".";

export class Vertex3D {
  constructor(public x: number, public y: number, public z: number) {}

  subtract(other: Vertex3D): Vertex3D {
    return new Vertex3D(this.x - other.x, this.y - other.y, this.z - other.z);
  }

  add(vector: Vector): Vertex3D {
    return new Vertex3D(this.x + vector.x, this.y + vector.y, this.z + vector.z);
  }

  toNormalizedVector(): Vector {
    return this.toVector().normalize();
  }

  toVector() {
    return new Vector(this.x, this.y, this.z);
  }
}
