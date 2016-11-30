import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';

import { Desk } from '../model/desk';
import { DeskService } from '../service/desk.service';

@Component({
  selector: 'desk-create-dialog',
  templateUrl: './desk-create-dialog.component.html',
  styleUrls: ['./desk-create-dialog.component.css']
})
export class DeskCreateDialogComponent implements OnInit {
  @Input() desk: Desk
  @Output() deskChange: EventEmitter<Desk> = new EventEmitter<Desk>();

  constructor(public deskService: DeskService ) { }

  ngOnInit() {
  }

  delete(){}
}
