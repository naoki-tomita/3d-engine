import { Model } from "../../Engine";
import { XFileConverter } from "../../Engine/Model/Converter";
import xfile from "./Cup.x?raw";


export class Cup extends Model {
  constructor() {
    const faces = new XFileConverter().convert(xfile);
    super(faces);
  }
}
