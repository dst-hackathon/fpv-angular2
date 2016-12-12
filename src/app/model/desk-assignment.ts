import {Desk} from './desk';
import {Employee} from './employee';
import {Plan} from './plan';

export class DeskAssignment {
    desk: Desk;
    employee: Employee;
    plan: Plan;

    static fromJson(jsonObject): DeskAssignment{
      let da = Object.assign(new DeskAssignment(),jsonObject);

      if(da.employee){
        da.employee = Object.assign(new Employee(),da.employee);
      }
      
      return da
    }
}
