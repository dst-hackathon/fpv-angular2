import { Component, OnInit, Input } from '@angular/core';
import { Employee } from '../model/employee';
import {ActivatedRoute} from "@angular/router";
import {PlanService} from "../service/plan.service";
import {Plan} from "../model/plan";

@Component({
  selector: 'employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.css']
})
export class EmployeeCardComponent implements OnInit {

  @Input() employee: Employee;

  plan:Plan

  constructor(private route: ActivatedRoute,private planService: PlanService) { }

  ngOnInit() {
    this.planService.selected.subscribe(p=>this.plan = p)
  }

}
