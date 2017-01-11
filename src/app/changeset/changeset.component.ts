import {Component, OnInit} from "@angular/core";
import {ChangesetItemService} from "../service/changeset-item.service";
import {ChangesetService} from "../service/changeset.service";
import {ChangesetItem} from "../model/changeset-item";
import {Observable} from "rxjs";
import {Changeset} from "../model/changeset";
import {ActivatedRoute} from "@angular/router";
import {Plan} from "../model/plan";
import {PlanService} from "../service/plan.service";
import {Location} from "@angular/common";
import {MdSnackBar} from "@angular/material";

@Component({
  selector: 'app-changeset',
  templateUrl: './changeset.component.html',
  styleUrls: ['./changeset.component.css']
})
export class ChangesetComponent implements OnInit {

  changesetId
  changeset:Observable<Changeset>
  changesetItemList: Observable<ChangesetItem[]>
  selectedPlan:Observable<Plan>

  constructor(private route: ActivatedRoute,private _location: Location,public changesetService: ChangesetService,
              public changesetItemService: ChangesetItemService,
              private planService: PlanService,private snackBar: MdSnackBar
  ) { }

  ngOnInit() {
    this.changesetItemList = this.changesetItemService.changesetItems

    this.selectedPlan = this.planService.selected

    this.route.params.subscribe(params => {
      this.changesetId = params['changesetId'];
      this.changeset = this.changesetService.getChangeset(this.changesetId)

      this.changesetItemService.loadAll(this.changesetId)
    });
  }

  approve(){
    this.changesetService.approve(this.changesetId).subscribe(cs=>{
      console.log("COMPLETE approve process",cs)
      this.openSnackBar("COMPLETE approve process",null)
    })
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  delete(){
    this.changesetService.remove(this.changesetId,()=>{
      this._location.back()
    })
  }

  updateStatus(changesetItem, status) {
    changesetItem.status = status;
    this.changesetItemService.setChangesetItemStatus(changesetItem).subscribe();
  }

  print(){
    window.print()
  }

}
