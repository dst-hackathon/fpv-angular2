import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';

import { Desk } from '../model/desk';
import { DeskService } from '../service/desk.service';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'desk-create-dialog',
  templateUrl: './desk-create-dialog.component.html',
  styleUrls: ['./desk-create-dialog.component.css']
})
export class DeskCreateDialogComponent implements OnInit {
  @Input() desk: Desk

  constructor( private activeModal: NgbActiveModal,private deskService:DeskService) { }

  ngOnInit() {
  }

  save(){
    this.deskService.save(this.desk);
    this.activeModal.close('saved')
  }

  delete(){
    console.log("Delete desk: ", this.desk);
    this.deskService.remove(this.desk.id)
    this.activeModal.close("cancel")
  }
}
