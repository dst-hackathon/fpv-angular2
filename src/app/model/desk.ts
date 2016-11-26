import { Floor } from './floor';

export class Desk {
    id: number;
    code: string;
    width: number;
    height: number;
    x: number;
    y: number;

    floor: Floor

    static fromJson(jsonObject): Desk {
        let desk = new Desk();
        desk.id = jsonObject.id;
        desk.code = jsonObject.code;
        desk.x = jsonObject.x;
        desk.y = jsonObject.y;
        desk.height = jsonObject.height;
        desk.width = jsonObject.width;

        return desk;
    }
}