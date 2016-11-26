import {Changeset} from './changeset';
import {Employee} from './employee';
import {Desk} from './desk';


export class ChangesetItem {
 
 changeset: Changeset;
 employee: Employee;
 fromDesk: Desk;
 id: number;
 status: String;
 toDesk: Desk;


    static fromJson(jsonObject): ChangesetItem {

        let changesetItem = new ChangesetItem();
        changesetItem.changeset = Changeset.fromJson(jsonObject.changeset);
        changesetItem.employee = Employee.fromJson(jsonObject.employee);
        changesetItem.id = jsonObject.id;
        changesetItem.status = jsonObject.status;

        if (changesetItem.fromDesk != null) 
        {
           changesetItem.fromDesk = Desk.fromJson(jsonObject.fromDesk);  
        }
        return changesetItem;
    }


}
    