import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';

import { FloorSelectorService } from '../service/floorselector.service';

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

  constructor(public floorSelectorService: FloorSelectorService) { }

  onSelectedFloor(selectedBuilding) {
    this.selectedFloor = selectedBuilding
    this.selectedFloorChange.emit(this.selectedFloor);
  }

  ngOnInit() {
    this.floorSelectorService.getFloorList(this.building.id).subscribe(floorList => this.floorList = floorList, err => console.log(err));
  }

}
