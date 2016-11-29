import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { FloorService } from '../service/floor.service';
import { DeskService } from '../service/desk.service';

import { Floor } from '../model/floor';
import { Desk } from '../model/desk';

@Component({
  selector: 'floor-marker',
  templateUrl: './floor-marker.component.html',
  styleUrls: ['./floor-marker.component.css']
})
export class FloorMarkerComponent implements OnInit {
  @Input() floor
  @Input() desks: Desk[]
  @Input() deskAssignments
  @Input() desk: Desk

  @Output() deskChange: EventEmitter<Desk> = new EventEmitter<Desk>();
  @Output() desksChange: EventEmitter<Desk[]> = new EventEmitter<Desk[]>();

  selectedDesk: Desk
  closeResult: string;

  constructor(public floorService: FloorService,
    private deskModal: NgbModal,
    public deskService: DeskService) { }

  ngOnInit() { }

  markDesk($event, addContent) {
    let desk = Desk.fromJson({
      x: $event.offsetX,
      y: $event.offsetY,
      height: 30,
      width: 30
    })
    desk.floor = this.floor
    this.selectedDesk = desk
    this.openModal(addContent);//open modal
  }

  saveSelectedDesk() {
    console.log("save desk", this.selectedDesk)
    this.deskService.save(this.selectedDesk).subscribe(desk => {
      this.deskChange.emit(this.selectedDesk);
    })

    this.desks.push(this.selectedDesk);
    this.desksChange.emit(this.desks);
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
