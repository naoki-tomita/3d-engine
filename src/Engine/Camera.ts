import { Vector } from "./Vector";
import { Vertex2D } from "./Vertex2D";
import { Vertex3D } from "./Vertex3D";

type Matrix = number[][]

export class Camera {
  matrix: Matrix;
  constructor(private position: Vertex3D, private lookAt: Vertex3D) {
    this.calcMatrix();
  }

  move({ dx = 0, dy = 0, dz = 0 }: { dx?: number, dy?: number, dz?: number }) {
    this.position.x += dx;
    this.position.y += dy;
    this.position.z += dz;
    this.calcMatrix();
    return this;
  }

  moveLookAt({ dx = 0, dy = 0, dz = 0 }: { dx?: number, dy?: number, dz?: number }) {
    this.lookAt.x += dx;
    this.lookAt.y += dy;
    this.lookAt.z += dz;
    this.calcMatrix();
    return this;
  }

  project(v: Vertex3D): Vertex2D {
    const ratio = (500 / (v.z || 0.000001));
    return new Vertex2D(ratio * v.x, ratio * v.y);
  }

  private transformVector(m: Matrix, v: Vertex3D): Vertex3D {
    const x = v.x
    const y = v.y
    const z = v.z
    const w = 1;
    const result: number[] = [];
    for (let i = 0; i < 4; i++) {
      const m0 = m[0][i];
      const m1 = m[1][i];
      const m2 = m[2][i];
      const m3 = m[3][i];
      const r = x * m0 + y * m1 + z * m2 + w * m3;
      result.push(r);
    }
    return new Vertex3D(result[0] / result[3], result[1] / result[3], result[2] / result[3]);
  }

  private calcMatrix() {
    const cameraForward = this.lookAt.subtract(this.position).toNormalizedVector();
    const worldUp = new Vector(0, 1, 0);
    const cameraRight = cameraForward.cross(worldUp).normalize();
    const cameraUp = cameraRight.cross(cameraForward);
    this.matrix = [
      [cameraRight.x, cameraUp.x, cameraForward.x, 0],
      [cameraRight.y, cameraUp.y, cameraForward.y, 0],
      [cameraRight.z, cameraUp.z, cameraForward.z, 0],
      [0,             0,          0,               1],
    ];
  }

  convertPosition(v: Vertex3D): Vertex3D {
    const r = this.transformVector(this.matrix, this.position.subtract(v));
    return r;
  }
}
