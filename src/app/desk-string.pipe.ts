import { Pipe, PipeTransform } from '@angular/core';
import {Desk} from "./model/desk";

@Pipe({
  name: 'deskString'
})
export class DeskStringPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return this.getDeskString(value);
  }

  getDeskString(desk:Desk): string {
    if(!desk){
      return "-"
    }

    return `${desk.floor.name}:${desk.code}`
  }
}
