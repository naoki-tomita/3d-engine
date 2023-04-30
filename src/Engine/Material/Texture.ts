import { Material } from ".";
import { Vertex2D } from "../Vertex2D";

export class Texture extends Material {
  readonly type = "Texture";
  constructor(
    readonly image: HTMLImageElement,
    readonly v1: Vertex2D,
    readonly v2: Vertex2D,
    readonly v3: Vertex2D,
  ) {
    super();
  }
}
