import { Stage, Camera, CanvasView, Vertex3D } from "./src/Engine";
import { Cube } from "./src/Models/Cube";
import { Cup } from "./src/Models/Cup";
import { Van } from "./src/Models/Van";


async function main() {
  const adjustBrightness = document.getElementById("adjust-brightness") as HTMLInputElement;
  const drawStroke = document.getElementById("draw-stroke") as HTMLInputElement;
  const camera = new Camera(new Vertex3D(40, 40, 40), new Vertex3D(0, 0, 0));
  const obj1 = new Cube(0, 0, 1, 0.1);
  const obj2 = new Cube(0, 0, 3, 0.5);
  const cup = await Cup.load().then(it => it.move({ dy: -1, dz: 3 }));
  const van = await Van.load().then(it => it.move({ dy: 0, dz: -5 }));
  const view = new CanvasView();
  const stage = new Stage(view, camera, [van], { adjustBrightness: adjustBrightness.checked, drawStroke: drawStroke.checked })
  adjustBrightness.addEventListener("change", () => stage.setOptions({ adjustBrightness: adjustBrightness.checked }))
  drawStroke.addEventListener("change", () => stage.setOptions({ drawStroke: drawStroke.checked }));

  class Input {
    pressing = new Set<string>();
    constructor() {
      window.addEventListener("keydown", (e) => {
        this.pressing.add(e.key.toLowerCase());
      });
      window.addEventListener("keyup", (e) => {
        this.pressing.delete(e.key.toLowerCase());
      });
    }
  }
  const input = new Input();
  function processInput() {
    const pressing = input.pressing;
    if (pressing.has("ArrowUp".toLowerCase())) {
      camera.rotate(0, Math.PI / 180)
    }
    if (pressing.has("ArrowDown".toLowerCase())) {
      camera.rotate(0, Math.PI / -180)
    }
    if (pressing.has("ArrowLeft".toLowerCase())) {
      camera.rotate(Math.PI / -90, 0)
    }
    if (pressing.has("ArrowRight".toLowerCase())) {
      camera.rotate(Math.PI / 90, 0)
    }

    if (pressing.has("w".toLowerCase())) {
      camera.moveDirection(0.1, 0);
    }
    if (pressing.has("s".toLowerCase())) {
      camera.moveDirection(-0.1, 0);
    }
    if (pressing.has("a".toLowerCase())) {
      camera.moveDirection(0, -0.1);
    }
    if (pressing.has("d".toLowerCase())) {
      camera.moveDirection(0, 0.1);
    }
    if (pressing.has(" ".toLowerCase())) {
      camera
        .move({ dy: 0.1 })
        .moveLookAt({ dy: 0.1 });
    }
    if (pressing.has("Shift".toLowerCase())) {
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
}

main();
