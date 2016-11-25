import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';

import { BuildingSelectorService } from '../service/buildingselector.service';

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

  constructor(public buildingSelectorService: BuildingSelectorService) { }

  onSelectedBuilding(selectedBuilding) {
    this.selectedBuilding = selectedBuilding
    this.selectedBuildingChange.emit(this.selectedBuilding);
  }

  ngOnInit() {
    this.buildingSelectorService.getBuildingList(this.planId)
      .subscribe(buildingList => {
        this.buildingList = buildingList
      }, err => console.log(err));
  }

}
