import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Desk } from '../model/desk';
import { Floor } from '../model/floor';
import { DeskAssignment } from '../model/desk-assignment';
import { DeskService } from '../service/desk.service';
@Component({
  selector: 'floor-plan-canvas',
  templateUrl: './floor-plan-canvas.component.html',
  styleUrls: ['./floor-plan-canvas.component.css']
})
export class FloorPlanCanvasComponent implements OnInit {
  @Input() floor: Floor;

  desks: Desk[];
  deskAssignments: DeskAssignment[];
  constructor(public deskService: DeskService) { }

  ngOnInit() {
    this.getDeskByFloor();
  }

  ngOnChanges(floor: Floor) {
    if (this.floor) {
      this.floor = Floor.fromJson(this.floor);
      this.getDeskByFloor();
    }
   
  }

  getDeskByFloor() {
    this.deskService.getDesks(this.floor.id).subscribe(
      json => {
        this.desks = json;
        console.log("Desk ", json)
      },
      err => {
        console.log(err);
      });
  }
}
