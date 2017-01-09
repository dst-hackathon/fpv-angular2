import { Pipe, PipeTransform } from '@angular/core';
import {Desk} from "./model/desk";
import {ChangesetItemService} from "./service/changeset-item.service";
import {DeskAssignmentService} from "./service/desk-assignment.service";
import {SearchService} from "./search.service";

@Pipe({
  name: 'desk',pure:false
})
export class DeskPipe implements PipeTransform {

  constructor(private changesetItemService : ChangesetItemService,
              private deskAssignmentService:DeskAssignmentService,
              private searchService:SearchService
              ){}

  transform(desks: Desk[], arg?: string): any {
    let searchText = this.searchService.searchText

    if(!searchText){
      return desks
    }

    if(!desks){
      return []
    }
    return desks.filter(desk =>
      this.contains(desk.code , searchText) ||
      this.searchEmployeeFromDesk(desk,searchText)
    );
  }

  private searchEmployeeFromDesk(desk,searchText) :boolean{
    let ciList = []
      .concat(this.changesetItemService.findByFromDesk(desk))
      .concat(this.changesetItemService.findByToDesk(desk))
      .concat(this.deskAssignmentService.findByDesk(desk))

    for (let ci of ciList) {
      let found = this.contains(
        ci.employee.firstname,searchText)
          || this.contains(ci.employee.lastname,searchText)
          || this.contains(ci.employee.nickname,searchText)
          || this.contains(ci.employee.code,searchText)
          || this.contains(ci.employee.work,searchText)
      if(found){
        return true;
      }
    }

    return false;
  }

  private contains(value, searchText: string): boolean {
    if(!value){
      return false
    }
    return value.toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase()) !== -1;
  }

}
