import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { FloorService } from '../service/floor.service';
import { DeskService } from '../service/desk.service';

import { Floor } from '../model/floor';
import { Desk } from '../model/desk';
import {Changeset} from "../model/changeset";

@Component({
  selector: 'floor-marker',
  templateUrl: './floor-marker.component.html',
  styleUrls: ['./floor-marker.component.css']
})
export class FloorMarkerComponent implements OnInit {
  @Input() floor: Floor;
  @Input() changeset: Changeset

  desks: Desk[]
  deskAssignments
  desk: Desk

  @Output() deskChange: EventEmitter<Desk> = new EventEmitter<Desk>();
  @Output() desksChange: EventEmitter<Desk[]> = new EventEmitter<Desk[]>();

  selectedDesk: Desk

  constructor(public floorService: FloorService,
    private deskModal: NgbModal,
    public deskService: DeskService) { }

  ngOnInit() { }

  markDesk($event, addContent) {
    let desk = Desk.fromJson({
      x: $event.offsetX,
      y: $event.offsetY,
      height: 30,
      width: 30
    })
    desk.floor = this.floor
    this.openModal(addContent);//open modal
    this.selectedDesk = desk
  }

  completeCreateDesk(selectedDesk) {
    console.log("complete create", selectedDesk)
    this.desks.push(selectedDesk);

    this.desksChange.emit(this.desks);
  }

  openModal(content) {
    this.deskModal.open(content);
  }
}
