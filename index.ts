import { Stage, Camera, CanvasView, Vertex3D, Face, Color, Model } from "./src/Engine";

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

const camera = new Camera(new Vertex3D(1.3, 1.3, 1.3), new Vertex3D(1, 1, 2));
const obj1 = cube(1, 1, 2, 0.1);
const obj2 = cube(1, 1, 4, 0.5);
const view = new CanvasView();
const stage = new Stage(view, camera, [obj1, obj2])

function render() {
  stage.render();
  requestAnimationFrame(render);
}
requestAnimationFrame(render);

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
