import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';

import { ChangesetService } from '../service/changeset.service';

import { Changeset } from '../model/changeset';

@Component({
  selector: 'changeset-list',
  templateUrl: './changeset-list.component.html',
  styleUrls: ['./changeset-list.component.css']
})
export class ChangesetListComponent implements OnInit {

@Input() planId
changesetList;
     

  constructor(public changesetService: ChangesetService) { }

  ngOnInit() {
    this.changesetService.getChangesetList(this.planId)
      .subscribe(changesetList => {
        this.changesetList = changesetList
      }, err => console.log(err));

  }

  

}
