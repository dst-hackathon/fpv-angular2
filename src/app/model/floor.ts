import {Building} from './building';

export class Floor {
    id: number;
    name: string;

    image
    imageContentType: string

    building: Building

    static fromJson(jsonObject) : Floor{
        let floor = new Floor()
        floor.id = jsonObject.id
        floor.name = jsonObject.name

        floor.image = jsonObject.image
        floor.imageContentType = jsonObject.imageContentType

        floor.building = Building.fromJson(jsonObject.building);

        return floor;
    }

    getByteImage(){
        return "data:"+ this.imageContentType+";base64," + this.image;
    }
}

