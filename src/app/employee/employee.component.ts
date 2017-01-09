import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Employee} from "../model/employee";
import {EmployeeService} from "../service/employee.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employees: Observable<Employee[]>

  constructor(private employeeService: EmployeeService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.employees = this.employeeService.employees

    this.employeeService.loadAll()
  }

}
