import {Component, OnInit} from "@angular/core";
import {EmployeeService} from "../service/employee.service";
import {Employee} from "../model/employee";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {DeskAssignmentService} from "../service/desk-assignment.service";
import {Desk} from "../model/desk";

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {

  employee$: Observable<Employee>
  employee: Employee

  desk:Desk

  constructor(private employeeService: EmployeeService
    ,private deskAssignmentService: DeskAssignmentService
    ,private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let empId:number = Number(params['empId']);
      let planId:number = Number(params['id']);

      this.employee$ = this.employeeService.employees.map(items => items.find(item => item.id == empId));
      this.employee$.subscribe(emp => {
        this.employee = emp

        this.deskAssignmentService.getDesk(empId,planId).subscribe(desk=>this.desk = desk)
      })

      this.employeeService.load(empId)
    });
  }

}
