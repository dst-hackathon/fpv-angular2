import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'building-selector',
  templateUrl: `
    <h2>Building</h2>
    <select (change)="onSelect($event.target.value)">
      <option value="0">--Select--</option>
    </select>
  `,
  styleUrls: ['./building-selector.component.css']
})
export class BuildingSelectorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
