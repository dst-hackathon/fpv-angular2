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

}
