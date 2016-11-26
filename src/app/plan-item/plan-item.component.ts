import { Component, OnInit, Input } from '@angular/core';
import { PlanService } from '../service/plan.service';
import { Plan } from '../model/plan';

@Component({
  selector: 'plan-item',
  templateUrl: './plan-item.component.html',
  styleUrls: ['./plan-item.component.css']
})
export class PlanItemComponent implements OnInit {

  @Input() planId
  plan: Plan

  constructor(public planService: PlanService) { }

  ngOnInit() {
  	this.planService.getPlan(this.planId).subscribe(plan => this.plan = plan, err => console.log(err));
  }

}
