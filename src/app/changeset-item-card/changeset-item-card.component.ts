import {Component, OnInit, Input} from '@angular/core';
import {ChangesetItem} from "../model/changeset-item";

@Component({
  selector: 'app-changeset-item-card',
  templateUrl: './changeset-item-card.component.html',
  styleUrls: ['./changeset-item-card.component.css']
})
export class ChangesetItemCardComponent implements OnInit {
  @Input() changesetItem:ChangesetItem

  constructor() { }

  ngOnInit() {
  }

  public ondragstart(event) {
    event.dataTransfer.setData('fromDesk', JSON.stringify(this.changesetItem.fromDesk))
    event.dataTransfer.setData('employee', JSON.stringify(this.changesetItem.employee))
    event.dataTransfer.setData('changesetItem', JSON.stringify(this.changesetItem))
    console.log("Drag started", event,this.changesetItem);
  }
}
