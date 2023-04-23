import { Model } from "../../Engine";
import { ObjLoader } from "../../Engine/Model/ObjLoader";

export class Van extends Model {
  static async load() {
    const f = await ObjLoader.load("./Van/Van.obj");
    return new Van(f);
  }
}
