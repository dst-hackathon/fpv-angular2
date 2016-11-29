import {Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';

import { FloorService } from '../service/floor.service';

import { Floor } from '../model/floor';
import {Building} from "../model/building";

@Component({
  selector: 'floor-selector',
  templateUrl: './floor-selector.component.html',
  styleUrls: ['./floor-selector.component.css']
})

export class FloorSelectorComponent implements OnInit,OnChanges {
  floorList;

  floorId;
  buildingId;
  sort;

  @Input() building: Building
  @Input() selectedFloor: Floor
  @Output() selectedFloorChange: EventEmitter<Floor> = new EventEmitter<Floor>();

  constructor(public floorService: FloorService) { }

  onSelectedFloor(selectedBuilding) {
    this.selectedFloor = selectedBuilding
    this.selectedFloorChange.emit(this.selectedFloor);
  }

  ngOnInit() {
    this.floorList = this.floorService.floors

    this.loadFloor();
  }

  ngOnChanges(changes: SimpleChanges) {
    var buildingChange = changes['building'];

    if(buildingChange){
      if(buildingChange.currentValue != buildingChange.previousValue){
        this.loadFloor()
      }
    }
  }

  loadFloor() {
    this.floorService.loadAll(this.building.id)
  }
}
