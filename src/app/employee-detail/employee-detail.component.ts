import {Component, OnInit} from "@angular/core";
import {EmployeeService} from "../service/employee.service";
import {Employee} from "../model/employee";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {DeskAssignmentService} from "../service/desk-assignment.service";
import {Desk} from "../model/desk";
import {PlanService} from "../service/plan.service";

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {

  employee$: Observable<Employee>
  employee: Employee
  employeeId: number

  desk:Desk
  selectedPlan

  constructor(private planService: PlanService,private employeeService: EmployeeService
    ,private deskAssignmentService: DeskAssignmentService
    ,private route: ActivatedRoute) { }

  ngOnInit() {
    this.planService.selected.subscribe(p=>this.selectedPlan=p);

    this.route.params.subscribe(params => {
      this.employeeId = Number(params['empId']);

      this.employee$ = this.employeeService.employees.map(items => items.find(item => item.id == this.employeeId));
      this.employeeService.load(this.employeeId)
    });

    this.employee$.subscribe(emp => {
      this.employee = emp

      if(this.employee){
        this.deskAssignmentService.getDesk(this.employeeId,this.selectedPlan.id).subscribe(desk=>this.desk = desk)
      }
    })
  }

}
