import { Face, Vertex3D } from "..";
import { Matrix } from "../Matrix";

export class Model {
  constructor(readonly faces: Face[]) {}
  get center(): Vertex3D {
    const size = this.faces.length;
    const sum = this.faces
      .map(it => it.center)
      .reduce(({x, y, z}, c) => ({ x: x + c.x, y: y + c.y, z: z + c.z }), { x: 0, y: 0, z: 0 });
    return new Vertex3D(sum.x / size, sum.y / size, sum.z / size);
  }

  get vertices(): Vertex3D[] {
    return this.faces.map(it => [it.v1, it.v2, it.v3]).flat();
  }

  move(d: { dx?: number, dy?: number, dz?: number }): Model {
    this.vertices.forEach(v => v.move(d));
    return this;
  }

  rotate(theta: number, phi: number, center: Vertex3D = this.center) {
    const tMove = Matrix.move({
      dx: -center.x,
      dy: -center.y,
      dz: -center.z,
    });
    const rotate = Matrix.rotateY(theta);
    const move = Matrix.move({
      dx: center.x,
      dy: center.y,
      dz: center.z,
    });
    const a = Matrix.product(tMove, rotate)
    const r = Matrix.product(a, move);
    this.vertices.forEach(v => {
      const result = Matrix.product(rotate, [[v.x], [v.y], [v.z], [1]]);
      v.x = result[0][0] / result[3][0];
      v.y = result[1][0] / result[3][0];
      v.z = result[2][0] / result[3][0];
    });
  }
}
