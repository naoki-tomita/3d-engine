import { Stage, Camera, CanvasView, Vertex3D } from "./src/Engine";
import { Cube } from "./src/Models/Cube";
import { Cup } from "./src/Models/Cup";

const adjustBrightness = document.getElementById("adjust-brightness") as HTMLInputElement;
const drawStroke = document.getElementById("draw-stroke") as HTMLInputElement;

const camera = new Camera(new Vertex3D(1, 1, 1), new Vertex3D(0, 0, 2));
const obj1 = new Cube(0, 0, 1, 0.1);
const obj2 = new Cube(0, 0, 3, 0.5);
const cup = await Cup.load().then(it => it.move({ dy: -1, dz: 3 }));
const view = new CanvasView();
const stage = new Stage(view, camera, [cup, obj1, obj2], { adjustBrightness: adjustBrightness.checked, drawStroke: drawStroke.checked })

adjustBrightness.addEventListener("change", () => stage.setOptions({ adjustBrightness: adjustBrightness.checked }))
drawStroke.addEventListener("change", () => stage.setOptions({ drawStroke: drawStroke.checked }));

class Input {
  pressing = new Set<string>();
  constructor() {
    window.addEventListener("keydown", (e) => {
      console.log("down", e.key)
      this.pressing.add(e.key);
    });
    window.addEventListener("keyup", (e) => {
      console.log("up", e.key)
      this.pressing.delete(e.key);
    });
  }
}
const input = new Input();
function processInput() {
  const pressing = input.pressing;
  if (pressing.has("ArrowUp")) {
    camera.rotate(0, Math.PI / 180)
  }
  if (pressing.has("ArrowDown")) {
    camera.rotate(0, Math.PI / -180)
  }
  if (pressing.has("ArrowLeft")) {
    camera.rotate(Math.PI / -90, 0)
  }
  if (pressing.has("ArrowRight")) {
    camera.rotate(Math.PI / 90, 0)
  }

  if (pressing.has("w")) {
    camera.moveDirection(0.1, 0);
  }
  if (pressing.has("s")) {
    camera.moveDirection(-0.1, 0);
  }
  if (pressing.has("a")) {
    camera.moveDirection(0, -0.1);
  }
  if (pressing.has("d")) {
    camera.moveDirection(0, 0.1);
  }
  if (pressing.has(" ")) {
    camera
      .move({ dy: 0.1 })
      .moveLookAt({ dy: 0.1 });
  }
  if (pressing.has("Shift")) {
    camera
      .move({ dy: -0.1 })
      .moveLookAt({ dy: -0.1 });
  }
  setTimeout(processInput, 1000 / 30);
}
setTimeout(processInput, 1000 / 30);

function autoRotate() {
  cup.rotate(Math.PI / 360, Math.PI / 360);
  setTimeout(autoRotate, 1000 / 30);
}
setTimeout(autoRotate, 1000 / 30);

function render() {
  stage.render();
  requestAnimationFrame(render);
}
requestAnimationFrame(render);
