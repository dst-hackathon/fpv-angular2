import { Component, OnInit, Input } from '@angular/core';

import { Employee } from '../model/employee';
import {ChangesetItem} from "../model/changeset-item";

@Component({
  selector: 'desk-card',
  templateUrl: './desk-card.component.html',
  styleUrls: ['./desk-card.component.css']
})
export class DeskCardComponent implements OnInit {
  @Input() employee: Employee
  @Input() changesetItem: ChangesetItem

  emp
  constructor() { }

  ngOnInit() {
    if(this.changesetItem && this.changesetItem.employee){
      this.emp = Object.assign(new Employee(),this.changesetItem.employee)
    }else{
      this.emp = Object.assign(new Employee(), this.employee);
    }
  }

}
