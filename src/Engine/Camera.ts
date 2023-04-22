import { Vector, Vertex2D, Vertex3D } from ".";

type Matrix = number[][]

export class Camera {
  constructor(public position: Vertex3D, public lookAt: Vertex3D) {}
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

  convertPosition(v: Vertex3D): Vertex3D {
    const cameraForward = this.lookAt.subtract(this.position).toNormalizedVector();
    const worldUp = new Vector(0, 1, 0);
    const cameraRight = cameraForward.cross(worldUp).normalize();
    const cameraUp = cameraRight.cross(cameraForward);
    const matrix = [
      [cameraRight.x, cameraUp.x, cameraForward.x, 0],
      [cameraRight.y, cameraUp.y, cameraForward.y, 0],
      [cameraRight.z, cameraUp.z, cameraForward.z, 0],
      [0,             0,          0,               1],
    ];
    const r = this.transformVector(matrix, this.position.subtract(v));
    return r;
  }
}
