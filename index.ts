import { Stage, Camera, CanvasView, Vertex3D } from "./src/Engine";
import { Cube } from "./src/Models/Cube";
import { Cup } from "./src/Models/Cup";

const camera = new Camera(new Vertex3D(0, 0, 0), new Vertex3D(0, 0, 1));
const obj1 = new Cube(0, 0, 1, 0.1);
const obj2 = new Cube(0, 0, 3, 0.5);
const cup = new Cup().move({ dy: -1, dz: 3 });
const view = new CanvasView();
const stage = new Stage(view, camera, [cup, obj1, obj2])

function render() {
  cup.rotate(Math.PI / 360, Math.PI / 720);
  stage.render();
  requestAnimationFrame(render);
}
requestAnimationFrame(render);

window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") {
    camera.rotate(0, Math.PI / 180)
  }
  if (e.key === "ArrowDown") {
    camera.rotate(0, Math.PI / -180)
  }
  if (e.key === "ArrowLeft") {
    camera.rotate(Math.PI / -90, 0)
  }
  if (e.key === "ArrowRight") {
    camera.rotate(Math.PI / 90, 0)
  }

  if (e.key === "w") {
    camera
      .move({ dz: 0.1 })
      .moveLookAt({ dz: 0.1 });
  }
  if (e.key === "s") {
    camera
      .move({ dz: -0.1 })
      .moveLookAt({ dz: -0.1 });
  }
  if (e.key === "a") {
    camera
      .move({ dx: 0.1 })
      .moveLookAt({ dx: 0.1 });
  }
  if (e.key === "d") {
    camera
      .move({ dx: -0.1 })
      .moveLookAt({ dx: -0.1 });
  }
  if (e.key === " ") {
    camera
      .move({ dy: 0.1 })
      .moveLookAt({ dy: 0.1 });
  }
  if (e.key === "Control") {
    camera
      .move({ dy: -0.1 })
      .moveLookAt({ dy: -0.1 });
  }
});
