import {Component, OnInit, Input} from "@angular/core";
import {Desk} from "../model/desk";
import {Floor} from "../model/floor";
import {DeskAssignment} from "../model/desk-assignment";
import {DeskService} from "../service/desk.service";
import {Observable} from "rxjs";
import {ChangesetItem} from "../model/changeset-item";
import {Changeset} from "../model/changeset";
import {DeskAssignmentService} from "../service/desk-assignment.service";
import {ChangesetItemService} from "../service/changeset-item.service";
@Component({
  selector: 'floor-plan-canvas',
  templateUrl: './floor-plan-canvas.component.html',
  styleUrls: ['./floor-plan-canvas.component.css']
})
export class FloorPlanCanvasComponent implements OnInit {
  @Input() floor: Floor;
  @Input() changeset: Changeset

  desks: Observable<Desk[]>;

  constructor(
    private deskService:DeskService,
    private deskAssigmentService: DeskAssignmentService,
    private changesetItemService: ChangesetItemService,

  ) { }

  ngOnInit() {
    this.desks = this.deskService.desks

    if(this.floor) this.deskAssigmentService.loadAll(this.floor.id)
    if(this.changeset) this.changesetItemService.loadAll(this.changeset.id)
  }
}
