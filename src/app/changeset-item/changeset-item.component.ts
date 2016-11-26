import { Component, OnInit, Input } from '@angular/core';
import { ChangesetService } from '../service/changeset.service';
import { ChangesetItemService } from '../service/changeset-item.service';
import { ChangesetItem } from '../model/changeset-item';

@Component({
  selector: 'changeset-item',
  templateUrl: './changeset-item.component.html',
  styleUrls: ['./changeset-item.component.css']
})
export class ChangesetItemComponent implements OnInit {

  @Input() changesetId
  changeset
  changesetItemList

  constructor(public changesetService: ChangesetService,
  			public changesetItemService: ChangesetItemService) { }

  ngOnInit() {
  	this.changesetItemService.getChangesetList(this.changesetId).subscribe(changesetItemList => this.changesetItemList = changesetItemList, err => console.log(err));
  	this.changesetService.getChangeset(this.changesetId).subscribe(changeset => this.changeset = changeset, err => console.log(err));
  }

  updateStatus(changesetItem, status) {
  	changesetItem.status = status;
  	this.changesetItemService.setChangesetItemStatus(changesetItem).subscribe();
  }

}
