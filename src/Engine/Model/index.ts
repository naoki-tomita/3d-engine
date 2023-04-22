import { Face, Vertex3D } from "..";

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
    const ct = Math.cos(theta), st = Math.sin(theta), cp = Math.cos(phi), sp = Math.sin(phi);
    this.vertices.forEach((v) => {
      const x = v.x - center.x,
            y = v.y - center.y,
            z = v.z - center.z;

      v.x = ct * x - st * cp * z + st * sp * y + center.x;
      v.z = st * x + ct * cp * z - ct * sp * y + center.z;
      v.y = sp * z + cp * y + center.y;
    });
  }
}
