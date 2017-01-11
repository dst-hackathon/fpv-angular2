import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {PlanService} from "../service/plan.service";
import {DeskService} from "../service/desk.service";
import {DeskAssignmentService} from "../service/desk-assignment.service";
import {ChangesetService} from "../service/changeset.service";
import {Observable} from "rxjs";
import {Desk} from "../model/desk";
import {ChangesetItemService} from "../service/changeset-item.service";
import {BuildingService} from "../service/building.service";
import {FloorService} from "../service/floor.service";
import {Floor} from "../model/floor";
import {Building} from "../model/building";
import {Changeset} from "../model/changeset";
import {MdSnackBar} from "@angular/material";

@Component({
  selector: 'plan-dialog',
  templateUrl: './plandialog.component.html',
  styleUrls: ['./plandialog.component.css']
})

export class PlanDialogComponent implements OnInit {
  plan;

  selectedFloor:Floor
  selectedBuilding:Building

  changesetDate
  selectedChangeset:Observable<Changeset>
  noChangeset = false

  desks: Observable<Desk[]>;

  constructor(
    public planService: PlanService,
    public deskService:DeskService,
    public deskAssignmentService: DeskAssignmentService,
    public changesetService: ChangesetService,
    public changesetItemService: ChangesetItemService,
    public buildingService: BuildingService,
    public floorService: FloorService,
    private snackBar: MdSnackBar,

    private route: ActivatedRoute
  ) {}

  ngOnInit() {
      //bind
      this.selectedChangeset = this.changesetService.selectedChangeset;

      this.selectedChangeset.subscribe(
        changeset=> {
          if(!changeset){
            return changeset
          }

          if(this.changesetDate != changeset.effectiveDate){
            this.changesetDate = changeset.effectiveDate
          }

          this.changesetItemService.loadAll(changeset.id)

          this.noChangeset = false

          return changeset
        },
        err => {
          this.noChangeset = true;
        }
      )

      this.planService.selected.subscribe(plan=>this.plan=plan)

      this.route.params.subscribe(params => {
        let floorId = Number(params['floorId']);
        let buildingId = Number(params['buildingId']);
        if(buildingId && floorId) {
          this.buildingService.buildings.subscribe(list=>{
            this.buildingService.get(buildingId).subscribe(b=>{
              this.selectedBuilding = b
              this.floorService.loadAll(buildingId)
            })
          })

          this.floorService.getFloor(floorId).subscribe(f=>{
            this.selectedFloor = f
            this.loadFloorData()
          })
        }

        let changesetId = Number(params['changesetId']);
        if(changesetId){
          this.changesetService.getChangeset(changesetId).subscribe(cs=> this.changesetService.setSelectedChangeset(cs))
        }
      })


      this.desks = this.deskService.desks;
  }

  logResponse(json){
    return console.log(json)
  }

  loadFloorData(){
    if (this.selectedFloor) {
      this.getDeskByFloor(this.selectedFloor.id);
      this.getDeskAssignmentsByFloor(this.selectedFloor.id);
    }
  }

  loadChangesetData(){
    if (this.changesetDate) {
      this.changesetService.getChangesetByEffectiveDate(this.changesetDate).subscribe(cs=>this.changesetService.setSelectedChangeset(cs),err => {
        this.noChangeset = true;
        this.changesetService.setSelectedChangeset(null)
      })
    }
  }

  createChangeset(){
    if(this.changesetDate){
      let changeset = {effectiveDate: this.changesetDate, status: "IN_PROGRESS", plan: this.selectedBuilding.plan}

      this.changesetService.save(changeset).subscribe(cs=> {
        this.changesetService.setSelectedChangeset(cs)
        this.noChangeset = false;
        this.snackBar.open("Created", null, {
          duration: 2000,
        });
      })
    }
  }

  getDeskByFloor(floorId) {
    this.deskService.loadAll(floorId)
  }

  getDeskAssignmentsByFloor(floorId) {
    this.deskAssignmentService.loadAll(floorId)
  }

}

