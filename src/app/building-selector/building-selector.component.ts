import { Component, OnInit } from '@angular/core';

import { BuildingSelectorService } from '../service/buildingselector.service';

@Component({
  selector: 'building-selector',
  templateUrl: './building-selector.component.html',
  styleUrls: ['./building-selector.component.css']
})
export class BuildingSelectorComponent implements OnInit {
  buildingList;

  constructor(public buildingSelectorService: BuildingSelectorService) { }

  ngOnInit() {
    
    this.buildingSelectorService.getBuildingList(1,null).subscribe(buildingList => this.buildingList = buildingList, err => console.log(err));
    
  }

}
