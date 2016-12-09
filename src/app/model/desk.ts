import {Floor} from "./floor";

export class Desk {
  id: number;
  code: string;
  width: number;
  height: number;
  x: number;
  y: number;

  floor: Floor

  static fromJson(jsonObject): Desk {
    return Object.assign(new Desk(), jsonObject);
  }
}
