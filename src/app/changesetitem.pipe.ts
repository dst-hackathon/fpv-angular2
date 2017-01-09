import { Pipe, PipeTransform } from '@angular/core';
import {SearchService} from "./search.service";
import {ChangesetItem} from "./model/changeset-item";

@Pipe({
  name: 'changesetitem',pure:false
})
export class ChangesetitemPipe implements PipeTransform {

  constructor(private searchService:SearchService){}

  transform(items: ChangesetItem[], arg?: string): any {
    let searchText = this.searchService.searchText

    if(!searchText){
      return items
    }

    return items.filter(item =>
      this.contains(item.status, searchText) ||
      this.searchDesk(item, searchText) ||
      this.searchEmployee(item, searchText)
    );
  }

  private searchDesk(item, searchText: string) :boolean{
    if(item.fromDesk && this.contains(item.fromDesk.code, searchText)){
      return true;
    }

    if(item.toDesk && this.contains(item.toDesk.code, searchText)){
      return true;
    }

    return false
  }

  private contains(value, searchText: string): boolean {
    if(!value){
      return false
    }
    return value.toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase()) !== -1;
  }

  private searchEmployee(item: ChangesetItem, searchText: string) {
    if(!item.employee){
      return false
    }

    return this.contains(item.employee.code, searchText) ||
      this.contains(item.employee.work, searchText) ||
      this.contains(item.employee.firstname, searchText) ||
      this.contains(item.employee.lastname, searchText) ||
      this.contains(item.employee.nickname, searchText)
  }
}
