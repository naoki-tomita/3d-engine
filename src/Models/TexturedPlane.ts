import { Color, Face, Model, Vertex2D, Vertex3D } from "../Engine";
import { Texture } from "../Engine/Material/Texture";

function loadImage(path: string) {
  const image = new Image();
  return new Promise<HTMLImageElement>(ok => {
    image.src = path;
    image.onload = () => ok(image);
  });
}

export class TexturedPlane extends Model {
  static async load(x: number, z: number, width: number, depth: number) {
    const image = await loadImage("./texture.jpg");
    const image2 = await loadImage("./texture2.jpg");
    return new TexturedPlane([
      new Face(new Vertex3D(x, 0, z), new Vertex3D(x + width, 0, z + depth), new Vertex3D(x + width, 0, z), new Texture(image, new Vertex2D(1, 1), new Vertex2D(1023, 1024), new Vertex2D(1024, 1))),
      new Face(new Vertex3D(x, 0, z), new Vertex3D(x, 0, z + depth), new Vertex3D(x + width, 0, z + depth), new Texture(image, new Vertex2D(1, 1), new Vertex2D(1, 1024), new Vertex2D(1024, 1023))),
    ]);
  }
}
