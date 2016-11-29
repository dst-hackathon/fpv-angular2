import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';

import { BuildingService } from '../service/building.service';

import { Building } from '../model/building';

@Component({
  selector: 'building-selector',
  templateUrl: './building-selector.component.html',
  styleUrls: ['./building-selector.component.css']
})
export class BuildingSelectorComponent implements OnInit {
  buildingList;

  @Input() planId

  @Input() selectedBuilding: Building
  @Output() selectedBuildingChange: EventEmitter<Building> = new EventEmitter<Building>();

  constructor(public buildingService: BuildingService) { }

  onSelectedBuilding(selectedBuilding) {
    this.selectedBuilding = selectedBuilding
    this.selectedBuildingChange.emit(this.selectedBuilding);
  }

  ngOnInit() {
    this.buildingList = this.buildingService.buildings;

    this.buildingService.loadAll(this.planId)
  }

}
