import {Component, OnInit, Input} from '@angular/core';
import {NgbModal, NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Desk} from "../model/desk";
import {DeskService} from "../service/desk.service";
import {Observable} from "rxjs";
import {DeskAssignment} from "../model/desk-assignment";
import {ChangesetItem} from "../model/changeset-item";
import {DeskAssignmentService} from "../service/desk-assignment.service";
import {ChangesetItemService} from "../service/changeset-item.service";
import {Changeset} from "../model/changeset";

@Component({
  selector: 'app-assign-dialog',
  templateUrl: './assign-dialog.component.html',
  styleUrls: ['./assign-dialog.component.css']
})
export class AssignDialogComponent implements OnInit {

  @Input() desk:Desk
  @Input() changeset:Changeset

  deskAssignment:Observable<DeskAssignment>
  changesetItem:Observable<ChangesetItem>;

  constructor(private deskService: DeskService
    ,private deskAssigmentService: DeskAssignmentService
    ,private changesetItemService: ChangesetItemService
    ,private activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.deskAssignment = this.deskAssigmentService.get(this.desk)
    this.changesetItem = this.changesetItemService.get(this.desk)
  }

  deleteDesk(){
    console.log("Delete desk: ", this.desk);
    this.deskService.remove(this.desk.id)
    this.activeModal.close("cancel")
  }
}
