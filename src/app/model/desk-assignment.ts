import {Desk} from './desk';
import {Employee} from './employee';
import {Plan} from './plan';

export class DeskAssignment {
    desk: Desk;
    employee: Employee;
    plan: Plan;

    static fromJson(jsonObject): DeskAssignment{
        return Object.assign(new DeskAssignment(),jsonObject);
    }
}
