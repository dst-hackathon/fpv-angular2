import { Component, OnInit,Input } from '@angular/core';

import { Floor } from '../model/floor';

@Component({
  selector: 'floor',
  templateUrl: './floor.component.html',
  styleUrls: ['./floor.component.css']
})
export class FloorComponent implements OnInit {
  @Input() floor: Floor

  constructor() { }

  ngOnInit() {
    if(this.floor){
      this.floor = Floor.fromJson(this.floor); 
    }
  }

}
