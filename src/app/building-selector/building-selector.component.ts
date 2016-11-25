import { Component, OnInit, Input } from '@angular/core';

import { BuildingSelectorService } from '../service/buildingselector.service';

@Component({
  selector: 'building-selector',
  templateUrl: './building-selector.component.html',
  styleUrls: ['./building-selector.component.css']
})
export class BuildingSelectorComponent implements OnInit {
  buildingList;

  @Input() planId

  constructor(public buildingSelectorService: BuildingSelectorService) { }

  ngOnInit() {
    this.buildingSelectorService.getBuildingList(this.planId)
      .subscribe(buildingList => {
        this.buildingList = buildingList
      }, err => console.log(err));
  }

}
