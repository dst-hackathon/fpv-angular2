import {Component, OnInit, Input} from "@angular/core";
import {Desk} from "../model/desk";
import {Observable} from "rxjs";
import {DeskService} from "../service/desk.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AssignDialogComponent} from "../assign-dialog/assign-dialog.component";
import {Changeset} from "../model/changeset";

@Component({
  selector: 'app-canvas-controller',
  templateUrl: './canvas-controller.component.html',
  styleUrls: ['./canvas-controller.component.css']
})
export class CanvasControllerComponent implements OnInit {

  selectedDesk: Observable<Desk>;
  @Input() changeset: Changeset

  private desk;

  constructor(private deskService: DeskService, private modalService: NgbModal) {
  }

  ngOnInit() {
    this.selectedDesk = this.deskService.selectedDesk

    this.selectedDesk.subscribe(desk=>this.desk = desk)
  }

  openAssignDialog() {
    let desk = this.desk
    if (desk) {
      const modalRef = this.modalService.open(AssignDialogComponent)
      modalRef.componentInstance.desk = desk;
      modalRef.componentInstance.changeset = this.changeset;

      modalRef.result.then((result) => {
        console.log("Modal result", result)
        this.deskService.setSelectedDesk(null);
      }, (reason) => {
        console.log(`close model: ${reason}`)
        this.deskService.setSelectedDesk(null);
      });
    }
  }

  clearSelectedDesk(){
    this.deskService.getConfig().enableMove = false
    this.deskService.setSelectedDesk(null);
  }
}
