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
  @Input() desks: Desk[];
  @Input() deskAssignments: DeskAssignment[];
  
  constructor() { }

  ngOnInit() {
  }

  getDeskAssignment(desk: Desk) : DeskAssignment {
      
      for(let deskAssigment of this.deskAssignments) {
          if (desk.id === deskAssigment.desk.id) {
            return deskAssigment;
          }
      }
      return null;
  }
}
