import { Component, OnInit, Input } from '@angular/core';

import { Employee } from '../model/employee';
import { ChangesetItem } from '../model/changeset-item';
import { DeskAssignment } from '../model/desk-assignment';

@Component({
  selector: 'desk-card',
  templateUrl: './desk-card.component.html',
  styleUrls: ['./desk-card.component.css']
})
export class DeskCardComponent implements OnInit {
  @Input() deskAssignment: DeskAssignment;
  @Input() changesetItem: ChangesetItem

  public currentEmployee: Employee;
  public nextEmployee: Employee;

  constructor() { }

  ngOnInit() {
    if (this.deskAssignment) {
      this.currentEmployee = Object.assign(new Employee(), this.deskAssignment.employee);
    }
    if (this.changesetItem) {
      this.nextEmployee = Object.assign(new Employee(), this.changesetItem.employee);
    }
  }

}
