import { Component, OnInit,Input } from '@angular/core';

import { Desk } from '../model/desk';
import { DeskService } from '../service/desk.service';

@Component({
  selector: 'floor-create-dialog',
  templateUrl: './floor-create-dialog.component.html',
  styleUrls: ['./floor-create-dialog.component.css']
})
export class FloorCreateDialogComponent implements OnInit {
  @Input() desk: Desk

  constructor(public deskService: DeskService) { }

  ngOnInit() {
  }

  save(){
    this.deskService.save(this.desk).subscribe(res => {
      console.log(res)
    })
  }
  delete(){}
}
