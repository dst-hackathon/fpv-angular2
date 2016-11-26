import { Component, OnInit, Input,Output, EventEmitter } from '@angular/core';

import { FloorService } from '../service/floor.service';

import { Floor } from '../model/floor';
import { Desk } from '../model/desk';

@Component({
  selector: 'floor-marker',
  templateUrl: './floor-marker.component.html',
  styleUrls: ['./floor-marker.component.css']
})
export class FloorMarkerComponent implements OnInit {
  @Input() floor
  @Input() desks: Desk[]
  @Input() deskAssignments

  @Output() desksChange: EventEmitter<Desk[]> = new EventEmitter<Desk[]>();

  selectedDesk: Desk

  constructor(public floorService:FloorService) { }

  ngOnInit() {}

  markDesk($event){
    let desk = Desk.fromJson({
      x:$event.offsetX,
      y:$event.offsetY,
      height: 30,
      width: 30
    })
    desk.floor = this.floor

    this.selectedDesk = desk
  }

  completeCreateDesk(){
    console.log("complete create",this.selectedDesk)
    this.desks.push(this.selectedDesk);

    this.desksChange.emit(this.desks);
  }
}
