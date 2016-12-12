import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  template: `
    <div class="sidebar">
      <div class="text-right">
        <button type="button" class="btn btn-outline-primary" (click)="isEnableActivityBar = !isEnableActivityBar">Show/Hide Activities</button>
      </div>
      <div [ngbCollapse]="isEnableActivityBar">
        <ng-content></ng-content> 
      </div>
     
    </div>
  `,
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
