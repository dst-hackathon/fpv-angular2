import {Pipe, PipeTransform} from "@angular/core";
import {ChangesetItem} from "./model/changeset-item";

@Pipe({
  name: 'unassign', pure :false
})
export class UnassignPipe implements PipeTransform {

  transform(items: ChangesetItem[], args?: any): any {
    if(!items){
      return []
    }
    return items.filter(item =>
      item.toDesk == null
    );
  }
}
