import { Component, OnInit } from '@angular/core';

import { Employee } from '../model/employee';

import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'desk-card',
  templateUrl: './desk-card.component.html',
  styleUrls: ['./desk-card.component.css']
})
export class DeskCardComponent implements OnInit {
  employee: Employee

  constructor(public employeeService: EmployeeService) { }

  ngOnInit() {
    this.employeeService.getEmployee(1).subscribe(res => {
      this.employee = res
    })
  }

}
