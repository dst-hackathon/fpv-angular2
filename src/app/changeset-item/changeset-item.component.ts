import { Component, OnInit, Input } from '@angular/core';
import { ChangesetItemService } from '../service/changeset-item.service';
import { ChangesetItem } from '../model/changeset-item';

@Component({
  selector: 'changeset-item',
  templateUrl: './changeset-item.component.html',
  styleUrls: ['./changeset-item.component.css']
})
export class ChangesetItemComponent implements OnInit {

  @Input() changesetItemId
  changesetItem

  constructor(public changesetItemService: ChangesetItemService) { }

  ngOnInit() {
  	this.changesetItemService.getChangesetItem(this.changesetItemId).subscribe(changesetItem => this.changesetItem = changesetItem, err => console.log(err));
  }

}
