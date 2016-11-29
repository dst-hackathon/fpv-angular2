import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Desk } from '../model/desk';
import { Floor } from '../model/floor';
import { DeskAssignment } from '../model/desk-assignment';
import { DeskService } from '../service/desk.service';
import {ChangesetItem} from "../model/changesetitem";
@Component({
  selector: 'floor-plan-canvas',
  templateUrl: './floor-plan-canvas.component.html',
  styleUrls: ['./floor-plan-canvas.component.css']
})
export class FloorPlanCanvasComponent implements OnInit {
  @Input() floor: Floor;
  @Input() desks: Desk[];
  @Input() deskAssignments: DeskAssignment[];
  @Input() changesetItems: ChangesetItem[];

  constructor() { }

  ngOnInit() {
  }

  getDeskAssignment(desk: Desk) : DeskAssignment {
      if(this.deskAssignments){
        for(let deskAssigment of this.deskAssignments) {
            if (desk.id === deskAssigment.desk.id) {
              return deskAssigment;
            }
        }
      }

      return null;
  }

  getChangesetItem(desk: Desk) : ChangesetItem {
      if(this.changesetItems){
        for(let changesetItem of this.changesetItems) {
            if (desk.id === changesetItem.toDesk.id) {
              return changesetItem;
            }
        }
      }

      return null;
  }
}
