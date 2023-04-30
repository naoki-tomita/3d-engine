import { Camera } from "./Camera";
import { Face } from "./Face";
import { Model } from "./Model";
import { XFileLoader } from "./Model/XFileLoader";
import { CanvasView } from "./View";
import { Vertex3D } from "./Vertex3D";
import { Vertex2D } from "./Vertex2D";
import { Vector } from "./Vector";
import { Color } from "./Material/Color";
import { Texture } from "./Material/Texture";
export { Model, CanvasView, Camera, Face, Vertex3D, Vertex2D, Vector, Color, XFileLoader };


type Opt = {
  drawStroke?: boolean;
  adjustBrightness?: boolean;
};
export class Stage {
  constructor(readonly view: CanvasView, readonly camera: Camera, readonly objects: Model[], private options: Opt = {}) {}
  setOptions(opt: Opt) {
    this.options.adjustBrightness = opt.adjustBrightness ?? this.options.adjustBrightness;
    this.options.drawStroke = opt.drawStroke ?? this.options.drawStroke;
  }

  render() {
    const cameraCoordFaces = this.objects.map(obj =>
      obj.faces.map(f => new Face(
        this.camera.convertPosition(f.v1),
        this.camera.convertPosition(f.v2),
        this.camera.convertPosition(f.v3),
        f.material,
      ))
    ).flat();

    const light = new Vector(100, 100, -100);
    this.view.clear()
    cameraCoordFaces
      .sort((a, b) => a.center.z - b.center.z)
      // カメラの前方にいるものだけ描画する
      .filter(f => (f.v1.z < 0) && (f.v2.z < 0) && (f.v3.z < 0))
      // カメラの点（原点）から見て、面の法線ベクトルが90度以上なら、面はあさっての方向を向いていると言える
      .filter(f => f.center.toVector().angle(f.normalVector) <= 0)
      .forEach(f => {
        // light の方向に法線ベクトルが向いている面は明るく、そうでない面は暗くする
        if (f.material.type === "Color") {
          const _color = f.material as Color;
          const color = this.options.adjustBrightness ? _color.darken(1 - (f.normalVector.angle(light) + 1) / 2) : _color;
          this.view.draw(this.camera.project(f.v1), this.camera.project(f.v2), this.camera.project(f.v3), color, this.options.drawStroke ? Color.Black : color);
        } else {
          const _texture = f.material as Texture;
          this.view.drawImage(this.camera.project(f.v1), this.camera.project(f.v2), this.camera.project(f.v3), _texture);
        }
      });

  }
}
