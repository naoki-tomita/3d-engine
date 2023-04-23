import { Model } from "../../Engine";
import { XFileConverter } from "../../Engine/Model/Converter";

export class Cup extends Model {
  static async load() {
    const faces = await new XFileConverter().load("./Cup.x");
    return new Cup(faces);
  }
}
