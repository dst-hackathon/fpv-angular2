import {Pipe, PipeTransform} from "@angular/core";
import {Employee} from "./model/employee";

@Pipe({
  name: 'employee'
})
export class EmployeePipe implements PipeTransform {

  transform(items: Employee[], searchText?: string): any {
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
