import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { FloorService } from '../service/floor.service';
import { DeskService } from '../service/desk.service';

import { Floor } from '../model/floor';
import { Desk } from '../model/desk';
import {Changeset} from "../model/changeset";

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
    public deskService: DeskService) { }

  ngOnInit() { }

  markDesk($event, addContent) {
    let x = $event.offsetX
    let y = $event.offsetY

    if (!this.deskService.hasSelectedDesk()) {
      let desk = Desk.fromJson({
        x: x,
        y: y,
        height: 30,
        width: 30
      })
      desk.floor = this.floor
      this.selectedDesk = desk
      this.openModal(addContent);//open modal
    }else{
      this.selectedDesk = this.deskService.getSelectedDesk()
      this.moveDesk(this.selectedDesk,x,y)
    }
  }

  moveDesk(selectedDesk:Desk,x,y){
    selectedDesk.x = x
    selectedDesk.y = y

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
