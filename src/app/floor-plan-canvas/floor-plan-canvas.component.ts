import {Component, OnInit, Input} from "@angular/core";
import {Desk} from "../model/desk";
import {Floor} from "../model/floor";
import {DeskService} from "../service/desk.service";
import {Observable} from "rxjs";
import {Changeset} from "../model/changeset";
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
    private deskService:DeskService
  ){}

  ngOnInit() {
    this.desks = this.deskService.desks
  }
}
