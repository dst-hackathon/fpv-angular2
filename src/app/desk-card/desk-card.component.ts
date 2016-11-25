import { Component, OnInit, Input } from '@angular/core';

import { Employee } from '../model/employee';

@Component({
  selector: 'desk-card',
  templateUrl: './desk-card.component.html',
  styleUrls: ['./desk-card.component.css']
})
export class DeskCardComponent implements OnInit {
  @Input() employee: Employee

  constructor() { }

  ngOnInit() {
  }

}
