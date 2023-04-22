import { Vertex3D } from ".";

export class Vector {
  constructor(readonly x: number, readonly y: number, readonly z: number) {}
  get norm(): number {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2));
  }
  normalize(multiple: number = 1): Vector {
    const norm = this.norm;
    return new Vector(
      this.x && (this.x / norm) * multiple,
      this.y && (this.y / norm) * multiple,
      this.z && (this.z / norm) * multiple,
    );
  }
  cross(other: Vector): Vector {
    return new Vector(
      this.y * other.z - this.z * other.y,
      this.z * other.x - this.x * other.z,
      this.x * other.y - this.y * other.x
    );
  }
  dot(other: Vector): number {
    return this.x * other.x + this.y * other.y + this.z * other.z;
  }
  toVertex3D() {
    return new Vertex3D(this.x, this.y ,this.z);
  }
  angle(other: Vector) {
    return this.dot(other) / (this.norm * other.norm);
  }
}
