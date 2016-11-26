import { Component, OnInit } from '@angular/core';

import { FloorSelectorService } from '../service/floorselector.service';

import { Floor } from '../model/floor';
import { Desk } from '../model/desk';

@Component({
  selector: 'app-floor-marker',
  templateUrl: './floor-marker.component.html',
  styleUrls: ['./floor-marker.component.css']
})
export class FloorMarkerComponent implements OnInit {
  floor

  desks: Desk[]

  constructor(public floorService:FloorSelectorService) { }

  ngOnInit() {
    this.floorService.getFloor(1)
       .subscribe(floor => this.floor = floor, err => console.log(err));

    this.desks = []
  }

  onDrag($event){
    let desk = Desk.fromJson({x:$event.offsetX,y:$event.offsetY})

    this.desks.push(desk)
    console.log(this.desks)
  }
}
