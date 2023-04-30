import { Color } from "../Material/Color";
import { Face } from "../Face";
import { Vertex3D } from "../Vertex3D";

export class ObjLoader {
  static async load(path: string) {
    const obj = await fetch(path).then(it => it.text());
    const parser = new ObjParser(obj);
    const group = parser.groups();
    return group[0].faces.map(it => new Face(
      new Vertex3D(it.v1.x, it.v1.y, it.v1.z),
      new Vertex3D(it.v2.x, it.v2.y, it.v2.z),
      new Vertex3D(it.v3.x, it.v3.y, it.v3.z),
      Color.Green,
    ));
  }
}

type VF = {
  x: number;
  y: number;
  z: number;
  texture?: {
    x: number;
    y: number;
  };
  normal?: {
    x: number;
    y: number;
    z: number;
  };
}
type F = {
  v1: VF;
  v2: VF;
  v3: VF;
  material?: string;
}

type Group = {
  name: string;
  faces: F[];
}

type MtlLib = {
  name?: string;
}

export class ObjParser {
  values: string[];
  constructor(value: string) {
    this.values = value
      .split("\n")
      .map(it => it.trim())
      .filter(it => !it.startsWith("#")) // remove comment.
      .filter(Boolean) // remove empty
  }
  mtllib(): MtlLib {
    const name = this.find(this.values, "mtllib")
    return { name: name ?? undefined };
  }

  groups(): Group[] {
    const groups: string[][] = [];
    let tmp: string[] = [];
    for (let i = 0; i < this.values.length; i++) {
      const line = this.values[i];
      if (line.startsWith("g")) {
        tmp = [];
        groups.push(tmp);
      }
      tmp.push(line);
    }
    return groups.map(it => it.join("\n")).map(it => this.parseGroup(it))
  }

  find(lines: string[], key: string): string | null {
    return lines.find(it => it.startsWith(key))!.replace(key, "").trim()
  }
  filter(lines: string[], key: string): string[] {
    return lines
      .filter(it => it.startsWith(key))
      .map(it => it.replace(key, ""))
      .map(it => it.trim())
  }

  parseFace(fv: string): { v: number, vt?: number, vn?: number } {
    const value = fv.split("/").map(it => parseInt(it));
    if (value.length === 1) {
      return { v: value[0] };
    }
    if (value.length === 2) {
      return { v: value[0], vt: value[1] };
    }
    return { v: value[0], vt: value[1] ? value[1] : undefined, vn: value[2] };
  }

  parseGroup(group: string): Group {
    const lines = group.split("\n");
    const name = this.find(lines, "g")!;
    const vertices = this.filter(lines, "v")
      .map(it => it.split(" "))
      .map(it => it.map(v => Number.parseFloat(v)))
      .map(([x, y, z]) => ({ x, y, z }))
    const vertexNormals = this.filter(lines, "vn")
      .map(it => it.split(" "))
      .map(it => it.map(v => Number.parseFloat(v)))
      .map(([x, y, z]) => ({ x, y, z }))
    const vertexTextures = this.filter(lines, "vt")
      .map(it => it.split(" "))
      .map(it => it.map(v => Number.parseFloat(v)))
      .map(([x, y, z]) => ({ x, y, z }))

    const faces: F[] = [];
    let mtl: string | null = null;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.startsWith("usemtl")) {
        mtl = line.replace("usemtl", "").trim();
        continue;
      }
      if (!line.startsWith("f")) {
        continue;
      }
      const fd = line.replace("f", "").trim().split(" ").map(it => this.parseFace(it));
      if (fd.length === 3) {
        faces.push({
          v1: { ...vertices[fd[0].v - 1] },
          v2: { ...vertices[fd[1].v - 1] },
          v3: { ...vertices[fd[2].v - 1] },
          material: mtl ?? undefined,
        });
      } else if (fd.length === 4) {
        faces.push({
          v1: { ...vertices[fd[0].v - 1] },
          v2: { ...vertices[fd[1].v - 1] },
          v3: { ...vertices[fd[2].v - 1] },
          material: mtl ?? undefined,
        });
        faces.push({
          v1: { ...vertices[fd[0].v - 1] },
          v2: { ...vertices[fd[2].v - 1] },
          v3: { ...vertices[fd[3].v - 1] },
          material: mtl ?? undefined,
        });
      } else {
        throw Error("Face is must be 4 or 3 vertices.");
      }
    }
    return {
      name,
      faces,
    };
  }
}
