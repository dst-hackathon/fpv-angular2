import {Component, OnInit} from "@angular/core";
import {ChangesetItem} from "../model/changeset-item";
import {ChangesetItemService} from "../service/changeset-item.service";
import {Observable} from "rxjs";
import {Changeset} from "../model/changeset";
import {ChangesetService} from "../service/changeset.service";

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  changeSetItems: Observable<ChangesetItem[]>
  changeset: Changeset

  constructor(private changesetItemService: ChangesetItemService
    ,private changesetService:ChangesetService) {
  }

  ngOnInit() {
    this.changeSetItems = this.changesetItemService.changesetItems
    this.changesetService.selectedChangeset.subscribe(cs=>this.changeset = cs)
  }

  deleteItem(item){
    this.changesetItemService.remove(item.id)
  }

  public ondrag(event) {
    event.preventDefault()
  }
  public ondrop(event) {
    let fromDesk = JSON.parse(event.dataTransfer.getData('fromDesk'))
    let employee = JSON.parse(event.dataTransfer.getData('employee'))
    let changesetItem = this.getTransferData(event,'changesetItem')
    let toDesk  = null;

    console.log(`Move desk: from ${fromDesk} to ${toDesk}`)

    this.changesetItemService.move(employee, fromDesk, toDesk, this.changeset,changesetItem)
  }
  private getTransferData(event,name) {
    var data = event.dataTransfer.getData(name);
    if(!data){
      return null
    }

    return JSON.parse(data);
  }
}
