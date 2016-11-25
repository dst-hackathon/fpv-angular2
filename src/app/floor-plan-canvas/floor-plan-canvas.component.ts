import { Component, OnInit } from '@angular/core';
import { Desk } from '../model/desk';
import { DeskAssignment } from '../model/desk-assignment';
import { DeskService } from '../service/desk.service';
@Component({
  selector: 'floor-plan-canvas',
  templateUrl: './floor-plan-canvas.component.html',
  styleUrls: ['./floor-plan-canvas.component.css']
})
export class FloorPlanCanvasComponent implements OnInit {
  desks: Desk[];
  deskAssignments: DeskAssignment[];
  constructor(public deskService: DeskService) { }

  ngOnInit() {
    this.getDeskByFloor();
  }

  getDeskByFloor() {
    this.deskService.getDesks("1").subscribe(
      json => {
        this.desks = json;
        console.log("Desk ", json)
      },
      err => {
        console.log(err);
      });
  }
}
