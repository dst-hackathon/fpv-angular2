import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Changeset } from '../model/changeset';
import { ChangesetItem } from '../model/changesetitem';

import {PlanHolderService} from '../service/planholder.service';

@Component({
  selector: 'planholder',
  templateUrl: './planholder.component.html',
  styleUrls: ['./planholder.component.css']
})
export class PlanholderComponent implements OnInit {
 
  @Input() changesetId

changeSets: Changeset[];
changeSetItems: ChangesetItem[];
changeID;

  constructor(public planHolderService : PlanHolderService) { }

  ngOnInit() {
    this.getChangeSetItem();
  }


  getChangeSetItem()
  {
    
    this.planHolderService.getChangesetItemsDeskNull(this.changesetId).subscribe(res => {
        this.changeSetItems = res
        }, err => console.log(err));
  }
}
