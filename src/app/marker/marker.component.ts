import {Component, OnInit, Input} from '@angular/core';
import {Desk} from "../model/desk";
import {DeskService} from "../service/desk.service";
import {DeskCreateDialogComponent} from "../desk-create-dialog/desk-create-dialog.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-marker',
  templateUrl: './marker.component.html',
  styleUrls: ['./marker.component.css']
})
export class MarkerComponent implements OnInit {

  @Input() desk:Desk

  isDragstart:boolean = false

  constructor(private deskService:DeskService,private modalService: NgbModal) { }

  ngOnInit() {
  }

  selectDesk(event){
    event.preventDefault();
    this.deskService.setSelectedDesk(this.desk);
    this.openDeskDialog(this.desk)
  }

  openDeskDialog(desk) {
    if (desk) {
      const modalRef = this.modalService.open(DeskCreateDialogComponent)
      modalRef.componentInstance.desk = desk;

      modalRef.result.then((result) => {
        console.log("Modal result", result)
      }, (reason) => {
        console.log(`close model: ${reason}`)
        this.deskService.setSelectedDesk(null);
      });
    }
  }

  ondragstart(event) {
    console.log("Drag started", event);
    this.deskService.setSelectedDesk(this.desk);
  }

  ondragenter(event) {
    console.log("Drag enter", event);
    this.isDragstart = true
  }
}
