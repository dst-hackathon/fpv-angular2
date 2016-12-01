import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {PlanService} from "../service/plan.service";
import {DeskService} from "../service/desk.service";
import {DeskAssignmentService} from "../service/desk-assignment.service";
import {ChangesetService} from "../service/changeset.service";
import {Observable} from "rxjs";
import {Desk} from "../model/desk";
import {ChangesetItemService} from "../service/changeset-item.service";

@Component({
  selector: 'plan-dialog',
  templateUrl: './plandialog.component.html',
  styleUrls: ['./plandialog.component.css']
})

export class PlanDialogComponent implements OnInit {
  plan;
  changesetId;

  selectedFloor;
  selectedBuilding

  changesetDate
  selectedChangeset
  noChangeset = false

  floorMode = "View";


  desks:Observable<Desk[]>;

  constructor(
    public planService: PlanService,
    public deskService:DeskService,
    public deskAssignmentService: DeskAssignmentService,
    public changesetService: ChangesetService,
    public changesetItemService: ChangesetItemService,

    private route: ActivatedRoute
  ) {}

  ngOnInit() {
      this.route.params.subscribe(params => {
        let planId = params['id'];

        this.planService.getPlan(planId).subscribe(plan => this.plan = plan, err => console.log(err));
      })


      this.desks = this.deskService.desks;

      //TO DO REMOVE ME MOCK UP DATA
      this.changesetId = 1
  }

  logResponse(json){
    return console.log(json)
  }

  loadData(){
    if (this.selectedFloor && this.changesetDate) {
      this.getDeskByFloor();
      this.getDeskAssignmentsByFloor();

      this.selectedChangeset = this.changesetService.getChangesetByEffectiveDate(this.changesetDate)

      this.selectedChangeset.subscribe(
        changeset=> {
          this.changesetItemService.loadAll(changeset.id)

          this.noChangeset = false

          return changeset
        },
        err => {
          this.noChangeset = true;
        }
      )
    }
  }

  createChangeset(){
    if(this.changesetDate){
      let changeset = {effectiveDate: this.changesetDate, status: "IN_PROGRESS", plan: this.selectedBuilding.plan}

      this.changesetService.save(changeset).subscribe(cs=> {
        this.selectedChangeset = cs
        this.noChangeset = false;
      })
    }
  }

  getDeskByFloor() {
    this.deskService.loadAll(this.selectedFloor.id)
  }

  getDeskAssignmentsByFloor() {
    this.deskAssignmentService.loadAll(this.selectedFloor.id)
  }

  toggleFloorMode() {
    if ("View" === this.floorMode) {
      this.floorMode = "Edit";
    } else {
      this.floorMode = "View"
    }
  }
}

