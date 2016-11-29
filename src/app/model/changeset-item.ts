import {Desk} from './desk';
import {Employee} from './employee';

export class ChangesetItem {
    id: number
    status: string

    employee: Employee
    fromDesk: Desk
    toDesk: Desk
}
