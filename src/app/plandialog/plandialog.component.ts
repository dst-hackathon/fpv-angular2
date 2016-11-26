import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { PlanService } from '../service/plan.service';
import { DeskService } from '../service/desk.service';

import { Floor } from '../model/floor';


@Component({
  selector: 'plan-dialog',
  templateUrl: './plandialog.component.html',
  styleUrls: ['./plandialog.component.css']
})

export class PlanDialogComponent implements OnInit {
  plan;
  planId;

  buildingList;
  buildingId;
  floorList;
  floorId;

  selectedFloor
  desks

  selectedBuilding

  constructor(
    public planService: PlanService,
    public deskService:DeskService,
    
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
      this.route.params.subscribe(params => {
        let planId = params['id'];

        this.planService.getPlan(planId)
          .subscribe(plan => this.plan = plan, err => console.log(err));
      })
  }

  logResponse(json){
    return console.log(json)
  }

  floorChange(){
    if (this.selectedFloor) {
        this.selectedFloor = Floor.fromJson(this.selectedFloor);
        this.getDeskByFloor();
      }
  }

  getDeskByFloor() {
    this.deskService.getDesks(this.selectedFloor.id).subscribe(
      json => {
        this.desks = json;
        console.log("Desk ", json)
      },
      err => {
        console.log(err);
      });
  }


}

