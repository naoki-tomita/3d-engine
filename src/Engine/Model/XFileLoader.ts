import { Color } from "../Color";
import { Face } from "../Face";
import { Vertex3D } from "../Vertex3D";

export class XFileLoader {
  async load(path: string) {
    const file = await fetch(path).then(it => it.text());
    return this.convert(file);
  }


  convert(xfile: string) {
    const { vertics, faces } = this.#toJson(xfile);
    return faces.map(f => new Face(
      new Vertex3D(vertics[f[0]].x, vertics[f[0]].y, vertics[f[0]].z),
      new Vertex3D(vertics[f[1]].x, vertics[f[1]].y, vertics[f[1]].z),
      new Vertex3D(vertics[f[2]].x, vertics[f[2]].y, vertics[f[2]].z),
      Color.Orange
    ));
  }

  #toJson(data: string): {
    vertics: Array<{ x: number, y: number, z: number }>,
    faces: number[][];
  } {
    const lines = data.split("\n");

    type Vertex = { x: number, y: number, z: number };
    const vertics: Vertex[] = [];
    const faces: number[][] = [];

    const regexVertics = /(.+);(.+);(.+);,/;
    const regexFaces4 = /(.+);(.+),(.+),(.+),(.+);,/;
    const regexFaces3 = /(.+);(.+),(.+),(.+);,/;

    const max = lines.length;
    let i = 0;
    // vertics
    while (true) {
      if (i > max) {
        break;
      }
      if (lines[i].includes("faces")) {
        break;
      }
      const match = regexVertics.exec(lines[i]);
      i++;
      if (!match) {
        continue;
      }
      const x = match[1];
      const y = match[2];
      const z = match[3];
      vertics.push({
        x: Number.parseFloat(x),
        y: Number.parseFloat(y),
        z: Number.parseFloat(z),
      });
    }

    while(true) {
      if (i > max) {
        break;
      }
      let match = regexFaces4.exec(lines[i]);
      if (!match) {
        match = regexFaces3.exec(lines[i]);
      }
      i++;
      if (!match) {
        continue;
      }

      if (match[1].trim() === "4") {
        // 4
        faces.push([
          Number.parseInt(match[2], 10),
          Number.parseInt(match[3], 10),
          Number.parseInt(match[4], 10),
        ]);
        faces.push([
          Number.parseInt(match[4], 10),
          Number.parseInt(match[5], 10),
          Number.parseInt(match[2], 10),
        ]);
      } else if (match[1].trim() === "3") {
        // 3
        faces.push([
          Number.parseInt(match[2], 10),
          Number.parseInt(match[3], 10),
          Number.parseInt(match[4], 10),
        ]);
      }
    }

    return { vertics, faces };
  }
}
