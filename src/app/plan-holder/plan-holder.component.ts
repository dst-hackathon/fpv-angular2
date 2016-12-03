import { Component, OnInit, Input } from '@angular/core';
import {PlanHolderService} from '../service/planholder.service';
import {ChangesetItem} from "../model/changeset-item";

@Component({
  selector: 'plan-holder',
  templateUrl: './plan-holder.component.html',
  styleUrls: ['./plan-holder.component.css']
})
export class PlanHolderComponent implements OnInit {

@Input() changesetId

changeSetItems: ChangesetItem[];

  constructor(public planHolderService : PlanHolderService) { }

  ngOnInit() {
    this.getChangeSetItem();
  }

  getChangeSetItem()
  {

    this.planHolderService.getChangesetItemsDesk(this.changesetId).subscribe(res => {
        this.changeSetItems = res
        }, err => console.log(err));
  }

}
