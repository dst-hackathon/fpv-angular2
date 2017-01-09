import { Pipe, PipeTransform } from '@angular/core';
import {Desk} from "./model/desk";

@Pipe({
  name: 'desk', pure :false
})
export class DeskPipe implements PipeTransform {

  transform(desks: Desk[], searchText?: string): any {
    if(!searchText){
      return desks
    }

    if(!desks){
      return []
    }
    return desks.filter(desk =>
      this.contains(desk.code , searchText)
    );
  }

  private contains(value, searchText: string): boolean {
    if(!value){
      return false
    }
    return value.toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase()) !== -1;
  }

}
