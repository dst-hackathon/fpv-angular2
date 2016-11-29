import {Building} from './building';

export class Floor {
    id: number;
    name: string;

    image
    imageContentType: string

    building: Building

    getByteImage(){
      if(this.image && this.imageContentType){
        return "data:"+ this.imageContentType+";base64," + this.image;
      }

      return null;
    }
}

