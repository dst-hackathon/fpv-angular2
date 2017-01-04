import {Component, OnInit, Input} from "@angular/core";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Desk} from "../model/desk";
import {DeskService} from "../service/desk.service";
import {DeskAssignment} from "../model/desk-assignment";
import {ChangesetItem} from "../model/changeset-item";
import {Changeset} from "../model/changeset";
import {Observable} from "rxjs";
import {EmployeeService} from "../service/employee.service";
import {ChangesetItemService} from "../service/changeset-item.service";

@Component({
  selector: 'app-assign-dialog',
  templateUrl: './assign-dialog.component.html',
  styleUrls: ['./assign-dialog.component.css']
})
export class AssignDialogComponent implements OnInit {

  @Input() desk:Desk
  @Input() changeset:Changeset
  @Input() changesetItem:Observable<ChangesetItem>
  @Input() deskAssignment:Observable<DeskAssignment>

  deskAssignment$:DeskAssignment
  changesetItem$:ChangesetItem
  employee

  constructor(private activeModal: NgbActiveModal,
              private deskService: DeskService,
              private employeeService:EmployeeService,
              private changesetItemService: ChangesetItemService
  ) { }

  ngOnInit() {
    this.changesetItem.subscribe(ci=>this.changesetItem$=ci)
    this.deskAssignment.subscribe(da=>this.deskAssignment$=da)
  }

  searching:boolean
  searchFailed:boolean

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(300)
      .distinctUntilChanged()
      .do(() => this.searching = true)
      .switchMap(term =>
        this.employeeService.getEmployeeByName(term)
          .do(() => this.searchFailed = false)
          .catch(() => {
            this.searchFailed = true;
            return Observable.of([]);
          }))
      .do(() => this.searching = false);

  formatter(x) {
    return x.code
  }

  assignEmployee(){
    if(this.employee){
      this.changesetItemService.move(this.employee, null, this.desk, this.changeset,this.changesetItem$)
    }

    this.employee=null
  }
  unassignEmployee(){
    this.changesetItemService.move(EmployeeService.getEmployee(this.deskAssignment$,this.changesetItem$), this.desk, null, this.changeset,this.changesetItem$)
    this.employee=null
  }
}
