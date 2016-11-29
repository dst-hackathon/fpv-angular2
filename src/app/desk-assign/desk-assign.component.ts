import {Component, OnInit, Input} from "@angular/core";
import {Desk} from "../model/desk";
import {EmployeeService} from "../service/employee.service";
import {DeskAssignment} from "../model/desk-assignment";
import {ChangesetItem} from "../model/changeset-item";

@Component({
  selector: 'desk-assign',
  templateUrl: './desk-assign.component.html',
  styleUrls: ['./desk-assign.component.css']
})
export class DeskAssignComponent implements OnInit {

  @Input() desk: Desk
  @Input() deskAssignment: DeskAssignment
  @Input() changesetItem: ChangesetItem

  constructor(public employeeService:EmployeeService) { }

  ngOnInit() {
  }

  loadEmployee(code){
    // this.employeeService.getEmployeeByCode(code).subscribe(res => {
    //   this.employee = res
    // });
  }
}
