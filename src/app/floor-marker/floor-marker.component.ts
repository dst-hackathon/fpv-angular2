import { Component, OnInit, Input } from '@angular/core';

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

  selectedDesk: Desk

  constructor(public floorService:FloorService) { }

  ngOnInit() {
    this.floorService.getFloor(1)
       .subscribe(floor => this.floor = floor, err => console.log(err));

    this.desks = []
  }

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
}
