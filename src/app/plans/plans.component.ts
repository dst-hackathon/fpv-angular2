import { Component, OnInit } from '@angular/core';
import {PlanService} from "../service/plan.service";

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {

  constructor(private planService:PlanService) { }

  ngOnInit() {
    this.planService.loadAll()
  }

}
