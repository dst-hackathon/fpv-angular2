import { Component, OnInit, OnChanges, Input,SimpleChanges } from '@angular/core';

import { FloorService } from '../service/floor.service';

import { Floor } from '../model/floor';

@Component({
  selector: 'floor',
  templateUrl: './floor.component.html',
  styleUrls: ['./floor.component.css']
})
export class FloorComponent implements OnInit, OnChanges {
  @Input() floor: Floor
  loadedFloor: Floor

  constructor(public floorService:FloorService) { }

  ngOnInit() {
    this.loadFloor(this.floor)
  }

  ngOnChanges(changes: SimpleChanges) {
    let floor = changes['floor'].currentValue
    this.loadedFloor = null
    this.loadFloor(floor)
  }

  loadFloor(floor){
    if(floor && floor.id){
      this.floorService.getFloor(floor.id).subscribe(floor => this.loadedFloor = floor, err => console.log(err));
    }
  }
}
