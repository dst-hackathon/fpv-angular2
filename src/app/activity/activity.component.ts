import {Component, OnInit} from "@angular/core";
import {ChangesetItem} from "../model/changeset-item";
import {ChangesetItemService} from "../service/changeset-item.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

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
