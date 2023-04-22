import { Stage, Camera, CanvasView, Vertex3D } from "./src/Engine";
import { Cube } from "./src/Models/Cube";
import { Cup } from "./src/Models/Cup";

const camera = new Camera(new Vertex3D(1.3, 1.3, 1.3), new Vertex3D(1, 1, 2));
const obj1 = new Cube(1, 1, 2, 0.1);
const obj2 = new Cube(1, 1, 4, 0.5);
const cup = new Cup().move({ dz: 4, dx: 1 });
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
    camera
      .move({ dz: 0.1 })
      .moveLookAt({ dz: 0.1 });
  }
  if (e.key === "ArrowDown") {
    camera
      .move({ dz: -0.1 })
      .moveLookAt({ dz: -0.1 });
  }
  if (e.key === "ArrowLeft") {
    camera
      .move({ dx: 0.1 })
      .moveLookAt({ dx: 0.1 });
  }
  if (e.key === "ArrowRight") {
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

  if (e.key === "w") {
    camera
      .moveLookAt({ dy: 0.1 });
  }
  if (e.key === "s") {
    camera
      .moveLookAt({ dy: -0.1 });
  }
  if (e.key === "a") {
    camera
      .moveLookAt({ dx: -0.1 });
  }
  if (e.key === "d") {
    camera
      .moveLookAt({ dx: 0.1 });
  }
});
