import {Component, OnInit, Input} from '@angular/core';
import {Desk} from "../model/desk";
import {DeskService} from "../service/desk.service";

@Component({
  selector: 'app-marker',
  templateUrl: './marker.component.html',
  styleUrls: ['./marker.component.css']
})
export class MarkerComponent implements OnInit {

  @Input() desk:Desk
  constructor(private deskService:DeskService) { }

  ngOnInit() {
  }

  selectDesk(event){
    event.preventDefault();
    this.deskService.setSelectedDesk(this.desk);
  }

  ondragstart(event) {
    console.log("Drag started", event);
    this.deskService.setSelectedDesk(this.desk);
  }
}
