import {Desk} from './desk';
import {Employee} from './employee';
import {Changeset} from "./changeset";

export class ChangesetItem {
    id: number
    status: string

    employee: Employee
    fromDesk: Desk
    toDesk: Desk

    changeset: Changeset;

  static fromJson(item) {
    let changesetItemsTemp = Object.assign(new ChangesetItem(),item);
    changesetItemsTemp.employee = Object.assign(new Employee(),item.employee);

    if(item.fromDesk){
      changesetItemsTemp.fromDesk = Object.assign(new Desk(),item.fromDesk);
    }

    if(item.toDesk){
      changesetItemsTemp.toDesk = Object.assign(new Desk(),item.toDesk);
    }

    return changesetItemsTemp
  }

  toString():string{
    let getCode = function (desk:Desk) {
      if(!desk){
        return "null"
      }

      return desk.code;
    };

    return `CI( ${this.employee.firstname} : ${getCode(this.fromDesk)} => ${getCode(this.toDesk)})`
  }
}
