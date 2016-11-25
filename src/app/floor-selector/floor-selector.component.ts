import { Component, OnInit } from '@angular/core';

import { FloorSelectorService } from '../service/floorselector.service';

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

  constructor(public floorSelectorService: FloorSelectorService) { }

  ngOnInit() {
    this.floorSelectorService.getFloorList(1,null).subscribe(floorList => this.floorList = floorList, err => console.log(err));
  }

}
