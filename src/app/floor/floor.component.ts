import { Component, OnInit, OnChanges, Input,SimpleChanges } from '@angular/core';

import { FloorService } from '../service/floor.service';

import { Floor } from '../model/floor';
import {Observable} from "rxjs";

@Component({
  selector: 'floor',
  templateUrl: './floor.component.html',
  styleUrls: ['./floor.component.css']
})
export class FloorComponent implements OnInit, OnChanges {
  @Input() floor: Floor
  loadedFloor: Observable<Floor>

  constructor(public floorService:FloorService) { }

  ngOnInit() {
    this.loadedFloor = this.floorService.getFloor(this.floor.id)
    this.floorService.loadFloorImage(this.floor)
  }

  ngOnChanges(changes: SimpleChanges) {
    let floor = changes['floor'].currentValue
    this.loadedFloor = this.floorService.getFloor(floor.id)

    this.floorService.loadFloorImage(this.floor)
  }
}
