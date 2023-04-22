class Model {
  constructor(readonly faces: Face[]) {}
  get vertices(): Vertex3D[] {
    return this.faces.map(it => [it.v1, it.v2, it.v3]).flat();
  }
}

class Vector {
  constructor(readonly x: number, readonly y: number, readonly z: number) {}
  get norm(): number {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2));
  }
  normalize(): Vector {
    const norm = this.norm;
    return new Vector(
      this.x && (this.x / norm),
      this.y && (this.y / norm),
      this.z && (this.z / norm)
    );
  }
  cross(other: Vector): Vector {
    return new Vector(
      this.y * other.z - this.z * other.y,
      this.z * other.x - this.x * other.z,
      this.x * other.y - this.y * other.x
    );
  }
}
class Vertex3D {
  constructor(public x: number, public y: number, public z: number) {}

  subtract(other: Vertex3D): Vertex3D {
    return new Vertex3D(this.x - other.x, this.y - other.y, this.z - other.z);
  }

  toNormalizedVector(): Vector {
    return new Vector(this.x, this.y, this.z);
  }

  toVertex2D() {
    const ratio = (500 / (this.z || 0.000001));
    return new Vertex2D(ratio * this.x, ratio * this.y);
  }
}

class Vertex2D {
  constructor(readonly x: number, readonly y: number) {}
}

class Color {
  static Red = new Color("#f00");
  static Green = new Color("#0f0");
  static Blue = new Color("#00f");
  static Yellow = new Color("yellow");
  static Black = new Color("black");
  static Pink = new Color("pink");
  constructor(readonly value: string) {}
}

class Face {
  constructor(readonly v1: Vertex3D, readonly v2: Vertex3D, readonly v3: Vertex3D) {}
}

const camera = {
  position: new Vertex3D(0, 0, 0),
  lookAt: new Vertex3D(0, 0, 1),
}

function cube() {
  const w = 1 / 2, h = 1 / 2, d = 1 / 2, p = { x: 0, y: 0, z: 5 };
  const f = [
    new Face(new Vertex3D(p.x - w, p.y - h, p.z - d), new Vertex3D(p.x + w, p.y - h, p.z - d), new Vertex3D(p.x - w, p.y - h, p.z + d)),
    new Face(new Vertex3D(p.x + w, p.y - h, p.z - d), new Vertex3D(p.x + w, p.y - h, p.z + d), new Vertex3D(p.x - w, p.y - h, p.z + d)),
    new Face(new Vertex3D(p.x - w, p.y - h, p.z + d), new Vertex3D(p.x + w, p.y - h, p.z + d), new Vertex3D(p.x - w, p.y + h, p.z + d)),
    new Face(new Vertex3D(p.x - w, p.y + h, p.z + d), new Vertex3D(p.x + w, p.y - h, p.z + d), new Vertex3D(p.x + w, p.y + h, p.z + d)),
    new Face(new Vertex3D(p.x + w, p.y - h, p.z - d), new Vertex3D(p.x + w, p.y + h, p.z - d), new Vertex3D(p.x + w, p.y - h, p.z + d)),
    new Face(new Vertex3D(p.x + w, p.y + h, p.z - d), new Vertex3D(p.x + w, p.y + h, p.z + d), new Vertex3D(p.x + w, p.y - h, p.z + d)),
    new Face(new Vertex3D(p.x - w, p.y + h, p.z - d), new Vertex3D(p.x - w, p.y + h, p.z + d), new Vertex3D(p.x + w, p.y + h, p.z - d)),
    new Face(new Vertex3D(p.x + w, p.y + h, p.z - d), new Vertex3D(p.x - w, p.y + h, p.z + d), new Vertex3D(p.x + w, p.y + h, p.z + d)),
    new Face(new Vertex3D(p.x - w, p.y - h, p.z - d), new Vertex3D(p.x - w, p.y - h, p.z + d), new Vertex3D(p.x - w, p.y + h, p.z + d)),
    new Face(new Vertex3D(p.x - w, p.y - h, p.z - d), new Vertex3D(p.x - w, p.y + h, p.z + d), new Vertex3D(p.x - w, p.y + h, p.z - d)),
    new Face(new Vertex3D(p.x - w, p.y - h, p.z - d), new Vertex3D(p.x - w, p.y + h, p.z - d), new Vertex3D(p.x + w, p.y - h, p.z - d)),
    new Face(new Vertex3D(p.x + w, p.y - h, p.z - d), new Vertex3D(p.x - w, p.y + h, p.z - d), new Vertex3D(p.x + w, p.y + h, p.z - d)),
  ];
  console.log(f);
  return new Model(f);
}

type Matrix = number[][]


function transformVector(m: Matrix, v: Vertex3D): Vertex3D {
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

function convertPosition(p: Vertex3D, l: Vertex3D, v: Vertex3D): Vertex3D {
  const cameraForward = l.subtract(p).toNormalizedVector();
  const worldUp = new Vector(0, 1, 0);
  const cameraRight = cameraForward.cross(worldUp).normalize();
  const cameraUp = cameraRight.cross(cameraForward);
  const matrix = [
    [cameraRight.x, cameraUp.x, cameraForward.x, 0],
    [cameraRight.y, cameraUp.y, cameraForward.y, 0],
    [cameraRight.z, cameraUp.z, cameraForward.z, 0],
    [0,             0,          0,               1],
  ];
  const r = transformVector(matrix, p.subtract(v));
  return r;
}

const c = document.querySelector("canvas")!.getContext("2d")!;
const width = document.querySelector("canvas")!.width;
const height = document.querySelector("canvas")!.height;
// low level api.
function clear() {
  c.clearRect(0, 0, width, height);
}

function draw(v1: Vertex2D, v2: Vertex2D, v3: Vertex2D, color: string) {
  const dx = width / 2;
  const dy = height / 2;
  c.beginPath();
  c.moveTo(v1.x + dx, -v1.y + dy);
  c.lineTo(v2.x + dx, -v2.y + dy);
  c.lineTo(v3.x + dx, -v3.y + dy);
  c.closePath();
  c.strokeStyle = color;
  c.stroke();
  // c.fillStyle = color;
  // c.fill();
}

const obj = cube();
function render() {
  const cameraCoordFaces = obj.faces.map(f => new Face(
    convertPosition(camera.position, camera.lookAt, f.v1),
    convertPosition(camera.position, camera.lookAt, f.v2),
    convertPosition(camera.position, camera.lookAt, f.v3),
  ));

  clear();
  cameraCoordFaces.forEach(f => draw(f.v1.toVertex2D(), f.v2.toVertex2D(), f.v3.toVertex2D(), "#000000"));
  requestAnimationFrame(render);
}
render();

window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") {
    camera.lookAt.y = camera.lookAt.y + 0.1;
    // camera.position.y = camera.position.y + 0.1;
  }
  if (e.key === "ArrowDown") {
    camera.lookAt.y = camera.lookAt.y - 0.1;
    // camera.position.y = camera.position.y - 0.1;
  }
  if (e.key === "ArrowLeft") {
    camera.lookAt.x = camera.lookAt.x - 0.1;
    // camera.position.x = camera.position.x - 0.1;
  }
  if (e.key === "ArrowRight") {
    camera.lookAt.x = camera.lookAt.x + 0.1;
    // camera.position.x = camera.position.x + 0.1;
  }
  if (e.key === "w") {
    camera.position.y = camera.position.y + 0.1;
  }
  if (e.key === "s") {
    camera.position.y = camera.position.y - 0.1;
  }
  if (e.key === "a") {
    camera.position.x = camera.position.x - 0.1;
  }
  if (e.key === "d") {
    camera.position.x = camera.position.x + 0.1;
  }
  const pos = convertPosition(camera.position, camera.lookAt, camera.position);
  console.table([camera.position, camera.lookAt, pos]);
});
