import {Component, OnInit, Input} from "@angular/core";
import {Desk} from "../model/desk";
import {EmployeeService} from "../service/employee.service";
import {DeskAssignment} from "../model/desk-assignment";
import {ChangesetItem} from "../model/changeset-item";
import {Employee} from "../model/employee";
import {ChangesetItemService} from "../service/changeset-item.service";
import {Changeset} from "../model/changeset";

@Component({
  selector: 'desk-assign',
  templateUrl: './desk-assign.component.html',
  styleUrls: ['./desk-assign.component.css']
})
export class DeskAssignComponent implements OnInit {

  @Input() desk: Desk
  @Input() deskAssignment: DeskAssignment
  @Input() changesetItem: ChangesetItem

  @Input() changeset: Changeset

  employee

  employeeCode

  constructor(
    private employeeService:EmployeeService,
    private changesetItemService: ChangesetItemService
  ) { }

  ngOnInit() {
  }

  assignEmployee(){
    this.employeeService.getEmployeeByCode(this.employeeCode).subscribe(employee=> {
      this.changesetItemService.move(employee, null, this.desk, this.changeset)
    })
  }


}
