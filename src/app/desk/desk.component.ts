import {Component, OnInit, Input} from '@angular/core';

import {Desk} from '../model/desk';
import {DeskAssignment} from '../model/desk-assignment';
import {Employee} from '../model/employee';

import {EmployeeService} from '../service/employee.service';

@Component({
  selector: 'desk',
  templateUrl: './desk.component.html',
  styleUrls: ['./desk.component.css']
})
export class DeskComponent implements OnInit {
  
  @Input() desk: Desk
  @Input() deskAssignment: DeskAssignment
  employee: Employee;
  emptyDeskUrl = '../assets/question-mark.png';
  assignedDeskUrl = '../assets/user-silhouette.png';
  
  constructor(public employeeService : EmployeeService) { }

  ngOnInit() {
      if (this.deskAssignment) {
        this.employeeService.getEmployee(this.deskAssignment.employee.id).subscribe(res => {
        this.employee = res
      });
    }
  }
}
