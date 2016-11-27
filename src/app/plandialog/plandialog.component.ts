import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {PlanService} from "../service/plan.service";
import {DeskService} from "../service/desk.service";
import {DeskAssignmentService} from "../service/desk-assignment.service";
import {ChangesetService} from "../service/changeset.service";

@Component({
  selector: 'plan-dialog',
  templateUrl: './plandialog.component.html',
  styleUrls: ['./plandialog.component.css']
})

export class PlanDialogComponent implements OnInit {
  plan;
  planId;

  buildingList;
  buildingId;
  floorList;
  floorId;
  changesetId;

  selectedFloor;
  desks;
  deskAssignments;

  selectedBuilding

  changesetDate
  selectedChangeset
  noChangeset = false

  floorMode = "View";

  constructor(
    public planService: PlanService,
    public deskService:DeskService,
    public deskAssignmentService: DeskAssignmentService,
    public changesetService: ChangesetService,

    private route: ActivatedRoute
  ) {}

  ngOnInit() {
      this.route.params.subscribe(params => {
        let planId = params['id'];

        this.planService.getPlan(planId)
          .subscribe(plan => this.plan = plan, err => console.log(err));
      })

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

      this.changesetService.getChangesetByEffectiveDate(this.changesetDate).subscribe(
        changeset=> this.selectedChangeset = changeset,
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
    this.deskService.getDesks(this.selectedFloor.id).subscribe(
      json => {
        this.desks = json;
        console.log("Desk ", json)
      },
      err => {
        console.log(err);
      });
  }

  getDeskAssignmentsByFloor() {
    this.deskAssignmentService.getDeskAssignments(this.selectedFloor.id).subscribe(
      result => {
        this.deskAssignments = result;
        console.log("DeskAssigments", result);
      }
    );
  }

  toggleFloorMode() {
    if ("View" === this.floorMode) {
      this.floorMode = "Edit";
    } else {
      this.floorMode = "View"
    }
  }
}

