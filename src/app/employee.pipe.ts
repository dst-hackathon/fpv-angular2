import {Pipe, PipeTransform} from "@angular/core";
import {Employee} from "./model/employee";
import {SearchService} from "./search.service";

@Pipe({
  name: 'employee',pure:false
})
export class EmployeePipe implements PipeTransform {

  constructor(private searchService:SearchService){}

  transform(items: Employee[], arg?: string): any {
    let searchText = this.searchService.searchText

    if(!searchText){
      return items
    }

    return items.filter(item =>
      this.contains(item.firstname, searchText)
        || this.contains(item.lastname, searchText)
        || this.contains(item.nickname, searchText)
        || this.contains(item.code, searchText)
        || this.contains(item.businessUnit, searchText)
        || this.contains(item.work, searchText)
        || this.contains(item.position, searchText)
    );
  }

  private contains(value, searchText: string): boolean {
    if(!value){
      return false
    }
    return value.toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase()) !== -1;
  }

}
