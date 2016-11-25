import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'floor-selector',
  templateUrl: `
    <h3>Floor</h3>
    <select (change)="onSelect($event.target.value)">
      <option value="0">--Select--</option>
    </select>
  `,
  styleUrls: ['./floor-selector.component.css']
})
export class FloorSelectorComponent implements OnInit {
  floorId;

  constructor() { }

  ngOnInit() {
  }

}
