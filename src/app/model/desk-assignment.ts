import {Desk} from './desk';
import {Employee} from './employee';
import {Plan} from './plan';

export class DeskAssignment {
    desk: Desk;
    employee: Employee;
    plan: Plan;

    static fromJson(jsonObject): DeskAssignment{
        let deskAssignment = new DeskAssignment();
        deskAssignment.desk = Desk.fromJson(jsonObject.desk);
        deskAssignment.employee = Employee.fromJson(jsonObject.employee);
        deskAssignment.plan = Plan.fromJson(jsonObject.plan);

        return deskAssignment;
    }
}
