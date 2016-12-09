import {Component, OnInit, Input} from "@angular/core";
import {ChangesetService} from "../service/changeset.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'changeset-list',
  templateUrl: './changeset-list.component.html',
  styleUrls: ['./changeset-list.component.css']
})
export class ChangesetListComponent implements OnInit {

  planId
  changesetList;


  constructor(private route: ActivatedRoute,public changesetService: ChangesetService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.planId = params['id'];

      this.changesetService.getChangesetList(this.planId)
        .subscribe(changesetList => {
          this.changesetList = changesetList
      }, err => console.log(err));
    });
  }


}
