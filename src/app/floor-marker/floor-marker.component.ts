import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { FloorService } from '../service/floor.service';
import { DeskService } from '../service/desk.service';

import { Floor } from '../model/floor';
import { Desk } from '../model/desk';
import {Changeset} from "../model/changeset";
import {DeskCreateDialogComponent} from "../desk-create-dialog/desk-create-dialog.component";

@Component({
  selector: 'floor-marker',
  templateUrl: './floor-marker.component.html',
  styleUrls: ['./floor-marker.component.css']
})
export class FloorMarkerComponent implements OnInit {
  @Input() floor: Floor;
  @Input() changeset: Changeset

  deskAssignments
  desk: Desk

  @Output() deskChange: EventEmitter<Desk> = new EventEmitter<Desk>();

  selectedDesk: Desk
  closeResult: string;

  constructor(public floorService: FloorService,
    private deskModal: NgbModal,
    public deskService: DeskService,
    private modalService: NgbModal) { }

  ngOnInit() { }

  openDeskDialog(desk) {
    if (desk) {
      const modalRef = this.modalService.open(DeskCreateDialogComponent)
      modalRef.componentInstance.desk = desk;

      modalRef.result.then((result) => {
        console.log("Modal result", result)
      }, (reason) => {
        console.log(`close model: ${reason}`)
      });
    }
  }

  markDesk($event) {
    let x = $event.offsetX
    let y = $event.offsetY

    let desk = Desk.fromJson({
      x: x,
      y: y,
      height: 30,
      width: 30
    })
    desk.floor = this.floor

    this.openDeskDialog(desk)
  }

  logPoint($event,name) {
    $event.preventDefault();
    let x = $event.offsetX
    let y = $event.offsetY
    console.log(name,x,y)
  }

  dropToMoveDesk($event){
    $event.preventDefault();
    let x = $event.offsetX
    let y = $event.offsetY

    this.selectedDesk = this.deskService.getSelectedDesk()

    console.log(`Drop desk: from ${this.selectedDesk} to `,x,y)
    this.selectedDesk.x = x
    this.selectedDesk.y = y

    this.saveSelectedDesk();
  }

  saveSelectedDesk() {
    console.log("save desk", this.selectedDesk)
    this.deskService.save(this.selectedDesk);
  }

  openModal(content) {
    this.deskModal.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log("Dialog result: " + this.closeResult);
      if("Save" == result) {
        this.saveSelectedDesk();
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log("Dialog result: " + this.closeResult);
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
