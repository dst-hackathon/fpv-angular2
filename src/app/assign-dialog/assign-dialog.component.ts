import {Component, OnInit, Input} from "@angular/core";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Desk} from "../model/desk";
import {DeskService} from "../service/desk.service";
import {DeskAssignment} from "../model/desk-assignment";
import {ChangesetItem} from "../model/changeset-item";
import {Changeset} from "../model/changeset";
import {Observable} from "rxjs";

@Component({
  selector: 'app-assign-dialog',
  templateUrl: './assign-dialog.component.html',
  styleUrls: ['./assign-dialog.component.css']
})
export class AssignDialogComponent implements OnInit {

  @Input() desk:Desk
  @Input() changeset:Changeset
  @Input() changesetItem:Observable<ChangesetItem>
  @Input() deskAssignment:Observable<DeskAssignment>

  constructor(private activeModal: NgbActiveModal,private deskService: DeskService) { }

  ngOnInit() {
  }
}
