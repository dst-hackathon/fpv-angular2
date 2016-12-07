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

    return changesetItemsTemp
  }
}
