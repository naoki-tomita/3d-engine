import { Model } from "../../Engine";
import { XFileLoader } from "../../Engine/Model/XFileLoader";

export class Cup extends Model {
  static async load() {
    const faces = await new XFileLoader().load("./Cup.x");
    return new Cup(faces);
  }
}
