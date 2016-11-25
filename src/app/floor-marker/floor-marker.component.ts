import { Component, OnInit } from '@angular/core';

import { FloorSelectorService } from '../service/floorselector.service';

import { Floor } from '../model/floor';

@Component({
  selector: 'app-floor-marker',
  templateUrl: './floor-marker.component.html',
  styleUrls: ['./floor-marker.component.css']
})
export class FloorMarkerComponent implements OnInit {
  floor

  deskAssignments

  constructor(public floorService:FloorSelectorService) { }

  ngOnInit() {
    this.floorService.getFloor(1)
       .subscribe(floor => this.floor = floor, err => console.log(err));

    this.deskAssignments = []
  }

  onDrag($event){
    this.deskAssignments.push({x:$event.offsetX,y:$event.offsetY})
    console.log(this.deskAssignments)
  }
}
