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
  toVertex3D() {
    return new Vertex3D(this.x, this.y ,this.z);
  }
}
class Vertex3D {
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

class Vertex2D {
  constructor(readonly x: number, readonly y: number) {}
}

class Color {
  static Red:    Color = new Color(255, 0, 0)
  static Green:  Color = new Color(0, 255, 0)
  static Blue:   Color = new Color(0, 0, 255)
  static Yellow: Color = new Color(255, 255, 0)
  static Pink:   Color = new Color(255, 20, 147)
  static Orange: Color = new Color(255, 99, 71)
  static Cyan:   Color = new Color(0, 255, 255)
  static Purple: Color = new Color(255, 0, 255)
  readonly r: number;
  readonly g: number;
  readonly b: number;
  constructor(r: number, g: number, b: number, readonly a: number = 1) {
    this.r = Math.floor(r);
    this.g = Math.floor(g);
    this.b = Math.floor(b);
  }
  darken(brightness: number = 1) {
    return new Color(Math.floor(this.r * brightness), Math.floor(this.g * brightness), Math.floor(this.b * brightness), this.a);
  }
  get value() {
    return `rgba(${this.r},${this.g},${this.b},${this.a})`;;
  }
}

class Face {
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

function cube(x: number, y: number, z: number, size: number) {
  const w = size / 2, h = size / 2, d = size / 2, p = { x: x, y: y, z: z };
  const f = [
    new Face(new Vertex3D(p.x - w, p.y - h, p.z - d), new Vertex3D(p.x + w, p.y - h, p.z - d), new Vertex3D(p.x - w, p.y - h, p.z + d), Color.Red),
    new Face(new Vertex3D(p.x + w, p.y - h, p.z - d), new Vertex3D(p.x + w, p.y - h, p.z + d), new Vertex3D(p.x - w, p.y - h, p.z + d), Color.Red),
    new Face(new Vertex3D(p.x - w, p.y - h, p.z + d), new Vertex3D(p.x + w, p.y - h, p.z + d), new Vertex3D(p.x - w, p.y + h, p.z + d), Color.Blue),
    new Face(new Vertex3D(p.x - w, p.y + h, p.z + d), new Vertex3D(p.x + w, p.y - h, p.z + d), new Vertex3D(p.x + w, p.y + h, p.z + d), Color.Blue),
    new Face(new Vertex3D(p.x + w, p.y - h, p.z - d), new Vertex3D(p.x + w, p.y + h, p.z - d), new Vertex3D(p.x + w, p.y - h, p.z + d), Color.Green),
    new Face(new Vertex3D(p.x + w, p.y + h, p.z - d), new Vertex3D(p.x + w, p.y + h, p.z + d), new Vertex3D(p.x + w, p.y - h, p.z + d), Color.Green),
    new Face(new Vertex3D(p.x - w, p.y + h, p.z - d), new Vertex3D(p.x - w, p.y + h, p.z + d), new Vertex3D(p.x + w, p.y + h, p.z - d), Color.Orange),
    new Face(new Vertex3D(p.x + w, p.y + h, p.z - d), new Vertex3D(p.x - w, p.y + h, p.z + d), new Vertex3D(p.x + w, p.y + h, p.z + d), Color.Orange),
    new Face(new Vertex3D(p.x - w, p.y - h, p.z - d), new Vertex3D(p.x - w, p.y - h, p.z + d), new Vertex3D(p.x - w, p.y + h, p.z + d), Color.Pink),
    new Face(new Vertex3D(p.x - w, p.y - h, p.z - d), new Vertex3D(p.x - w, p.y + h, p.z + d), new Vertex3D(p.x - w, p.y + h, p.z - d), Color.Pink),
    new Face(new Vertex3D(p.x - w, p.y - h, p.z - d), new Vertex3D(p.x - w, p.y + h, p.z - d), new Vertex3D(p.x + w, p.y - h, p.z - d), Color.Yellow),
    new Face(new Vertex3D(p.x + w, p.y - h, p.z - d), new Vertex3D(p.x - w, p.y + h, p.z - d), new Vertex3D(p.x + w, p.y + h, p.z - d), Color.Yellow),
  ];
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

function draw(v1: Vertex2D, v2: Vertex2D, v3: Vertex2D, color: Color) {
  const dx = width / 2;
  const dy = height / 2;
  c.beginPath();
  c.moveTo(v1.x + dx, -v1.y + dy);
  c.lineTo(v2.x + dx, -v2.y + dy);
  c.lineTo(v3.x + dx, -v3.y + dy);
  c.closePath();
  c.strokeStyle = color.value;
  c.stroke();
  c.fillStyle = color.value;
  c.fill();
}

class Camera {
  constructor(public position: Vertex3D, public lookAt: Vertex3D) {}
  project(v: Vertex3D): Vertex2D {
    const ratio = (500 / (v.z || 0.000001));
    return new Vertex2D(ratio * v.x, ratio * v.y);
  }
}

const camera = new Camera(new Vertex3D(1, 1, 1), new Vertex3D(1, 1, 2));
const obj1 = cube(1, 1, 2, 0.1);
const obj2 = cube(1, 1, 4, 0.5);
function render() {
  const cameraCoordFaces = [obj1, obj2].map(obj =>
    obj.faces.map(f => new Face(
      convertPosition(camera.position, camera.lookAt, f.v1),
      convertPosition(camera.position, camera.lookAt, f.v2),
      convertPosition(camera.position, camera.lookAt, f.v3),
      f.color,
    ))
  ).flat();

  clear();
  cameraCoordFaces
    .sort((a, b) => a.center.z - b.center.z)
    // カメラの前方にいるものだけにいるものは描画する必要がない
    .filter(f => (f.v1.z < 0) && (f.v2.z < 0) && (f.v3.z < 0))
    .filter(f => f.normalVector.z >= 0)
    .forEach(f => {
      draw(camera.project(f.v1), camera.project(f.v2), camera.project(f.v3), f.color)
    });
  requestAnimationFrame(render);
}
render();

window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") {
    camera.lookAt.z = camera.lookAt.z + 0.1;
    camera.position.z = camera.position.z + 0.1;
  }
  if (e.key === "ArrowDown") {
    camera.lookAt.z = camera.lookAt.z - 0.1;
    camera.position.z = camera.position.z - 0.1;
  }
  if (e.key === "ArrowLeft") {
    camera.lookAt.x = camera.lookAt.x + 0.1;
    camera.position.x = camera.position.x + 0.1;
  }
  if (e.key === "ArrowRight") {
    camera.lookAt.x = camera.lookAt.x - 0.1;
    camera.position.x = camera.position.x - 0.1;
  }
  if (e.key === " ") {
    camera.lookAt.y = camera.lookAt.y + 0.1;
    camera.position.y = camera.position.y + 0.1;
  }
  if (e.key === "Control") {
    camera.lookAt.y = camera.lookAt.y - 0.1;
    camera.position.y = camera.position.y - 0.1;
  }

  if (e.key === "w") {
    camera.lookAt.z = camera.lookAt.z + 0.1;
  }
  if (e.key === "s") {
    camera.lookAt.z = camera.lookAt.z - 0.1;
  }
  if (e.key === "a") {
    camera.lookAt.x = camera.lookAt.x + 0.1;
  }
  if (e.key === "d") {
    camera.lookAt.x = camera.lookAt.x - 0.1;
  }
});
