import {Component, OnInit, Input} from '@angular/core';
import {Desk} from "../model/desk";

@Component({
  selector: 'app-marker',
  templateUrl: './marker.component.html',
  styleUrls: ['./marker.component.css']
})
export class MarkerComponent implements OnInit {

  @Input() desk:Desk
  constructor() { }

  ngOnInit() {
  }

}
