import {Component, OnInit} from "@angular/core";
import {ChangesetItem} from "../model/changeset-item";
import {ChangesetItemService} from "../service/changeset-item.service";
import {Observable} from "rxjs";

@Component({
  selector: 'plan-holder',
  templateUrl: './plan-holder.component.html',
  styleUrls: ['./plan-holder.component.css']
})
export class PlanHolderComponent implements OnInit {

  changeSetItems: Observable<ChangesetItem[]>

  constructor(private changesetItemService: ChangesetItemService) {
  }

  ngOnInit() {
    this.changeSetItems = this.changesetItemService.changesetItems
  }

  deleteItem(item){
    this.changesetItemService.remove(item.id)
  }

}
