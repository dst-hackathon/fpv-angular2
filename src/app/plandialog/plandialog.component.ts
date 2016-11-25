import { Component, OnInit } from '@angular/core';

import { PlanDialogService } from '../service/plandialog.service';

@Component({
  selector: 'building-selector',
  templateUrl: `
    <h2>Building</h2>
    <select (change)="onSelect($event.target.value)">
      <option value="0">--Select--</option>
    </select>
  `,
  styleUrls: ['./plandialog.component.css']
})

export class PlanDialogComponent implements OnInit {
  plan;
  planId;

  buildingList;
  buildingId;
  floorList;
  floorId;

  constructor(public planDialogService: PlanDialogService) { }

  ngOnInit() {
    // TODO: receive planId from other page
    this.planId = 1;
    this.planDialogService.getPlan(this.planId).subscribe(plan => this.plan = plan, err => console.log(err))
  }

  logResponse(json){
    return console.log(json)
  }
}

