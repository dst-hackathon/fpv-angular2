import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';

import { FloorService } from '../service/floor.service';

import { Floor } from '../model/floor';

@Component({
  selector: 'floor-selector',
  templateUrl: './floor-selector.component.html',
  styleUrls: ['./floor-selector.component.css']
})

export class FloorSelectorComponent implements OnInit {
  floorList;

  floorId;
  buildingId;
  sort;

  @Input() building
  @Input() selectedFloor: Floor
  @Output() selectedFloorChange: EventEmitter<Floor> = new EventEmitter<Floor>();

  constructor(public floorService: FloorService) { }

  onSelectedFloor(selectedBuilding) {
    this.selectedFloor = selectedBuilding
    this.selectedFloorChange.emit(this.selectedFloor);
  }

  ngOnInit() {
    this.floorList = this.floorService.floors

    this.floorService.loadAll(this.building.id)
  }

}
