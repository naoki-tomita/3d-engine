import { Camera } from "./Camera";
import { Face } from "./Face";
import { Model } from "./Model";
import { XFileConverter } from "./Model/Converter";
import { CanvasView } from "./View";
import { Vertex3D } from "./Vertex3D";
import { Vertex2D } from "./Vertex2D";
import { Vector } from "./Vector";
import { Color } from "./Color";
export { Model, CanvasView, Camera, Face, Vertex3D, Vertex2D, Vector, Color, XFileConverter as Converter };

export class Stage {
  constructor(readonly view: CanvasView, readonly camera: Camera, readonly objects: Model[]) {}
  render() {
    const cameraCoordFaces = this.objects.map(obj =>
      obj.faces.map(f => new Face(
        this.camera.convertPosition(f.v1),
        this.camera.convertPosition(f.v2),
        this.camera.convertPosition(f.v3),
        f.color,
      ))
    ).flat();

    this.view.clear()
    cameraCoordFaces
      .sort((a, b) => a.center.z - b.center.z)
      // カメラの前方にいるものだけ描画する
      .filter(f => (f.v1.z < 0) && (f.v2.z < 0) && (f.v3.z < 0))
      // カメラの点（原点）から見て、面の法線ベクトルが90度以上なら、面はあさっての方向を向いていると言える
      .filter(f => f.center.toVector().angle(f.normalVector) <= 0)
      .forEach(f => {
        this.view.draw(this.camera.project(f.v1), this.camera.project(f.v2), this.camera.project(f.v3), f.color)
      });

  }
}
