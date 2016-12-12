import { Component, OnInit, Input } from '@angular/core';

import { Employee } from '../model/employee';
import { ChangesetItem } from '../model/changeset-item';
import { DeskAssignment } from '../model/desk-assignment';
import {AssignDialogComponent} from "../assign-dialog/assign-dialog.component";
import {Desk} from "../model/desk";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Changeset} from "../model/changeset";
import {Observable} from "rxjs";

@Component({
  selector: 'desk-card',
  templateUrl: './desk-card.component.html',
  styleUrls: ['./desk-card.component.css']
})
export class DeskCardComponent implements OnInit {
  @Input() desk: Desk;
  @Input() deskAssignment: Observable<DeskAssignment>;
  @Input() changesetItem: Observable<ChangesetItem>;
  @Input() changeset: Changeset;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  openAssignDialog() {
    let desk = this.desk
    if (desk) {
      const modalRef = this.modalService.open(AssignDialogComponent)
      modalRef.componentInstance.desk = desk;
      modalRef.componentInstance.changesetItem = this.changesetItem;
      modalRef.componentInstance.deskAssignment = this.deskAssignment;
      modalRef.componentInstance.changeset = this.changeset;

      modalRef.result.then((result) => {
        console.log("Modal result", result)
      }, (reason) => {
        console.log(`close model: ${reason}`)
      });
    }
  }

}
