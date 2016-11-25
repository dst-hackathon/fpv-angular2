import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'building-selector',
  templateUrl: `
    <h2>Building</h2>
    <select (change)="onSelect($event.target.value)">
      <option value="0">--Select--</option>
    </select>
  `,
  styleUrls: ['./plandialog.component.css']
})

export class PlanDialogComponent implements OnInit {
  planId;
  bulindingId;
  floorId;

  ngOnInit() {
    // This is a stub to be implemented 
  }

  logResponse(json){
    return console.log(json)
  }
}

