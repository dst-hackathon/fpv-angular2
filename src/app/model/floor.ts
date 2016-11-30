import {Building} from './building';

export class Floor {
    id: number;
    name: string;

    image
    imageContentType: string

    building: Building

    getByteImage(){
      return this.image = `/api/floors/${this.id}/image`;
    }
}

