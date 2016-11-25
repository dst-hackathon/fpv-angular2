import { Component, OnInit } from '@angular/core';
import { PlanService } from '../service/plan.service';
import { Plan } from '../model/plan';

@Component({
  selector: 'plan-list',
  templateUrl: './plan-list.component.html',
  styleUrls: ['./plan-list.component.css']
})
export class PlanListComponent implements OnInit {
  title = "View Master Plan";
  planList: Plan[];

  constructor(public planService: PlanService) { }

  ngOnInit() {
    this.getAllPlan();
  }

  getAllPlan()
  {
    this.planService.getAllPlans().subscribe(planList => this.planList = planList, err => console.log(err))
  }

}
