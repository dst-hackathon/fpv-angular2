import {Desk} from './desk';
import {Employee} from './employee';

export class ChangesetItem {
    id: number
    status: string

    employee: Employee
    fromDesk: Desk
    toDesk: Desk

    static fromJson(jsonObject): ChangesetItem{
        let changesetItem = new ChangesetItem();
        changesetItem.id = jsonObject.id;
        changesetItem.status = jsonObject.status;
        changesetItem.employee = Employee.fromJson(jsonObject.employee);
        changesetItem.fromDesk = Desk.fromJson(jsonObject.fromDesk);
        changesetItem.toDesk = Desk.fromJson(jsonObject.toDesk);

        return changesetItem;
    }
}
