import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'plan-dialog',
  templateUrl: './plandialog.component.html',
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
