import {Component, OnInit, Input} from "@angular/core";
import {Desk} from "../model/desk";
import {EmployeeService} from "../service/employee.service";
import {DeskAssignment} from "../model/desk-assignment";
import {ChangesetItem} from "../model/changeset-item";
import {ChangesetItemService} from "../service/changeset-item.service";
import {Changeset} from "../model/changeset";
import {Observable} from "rxjs";

@Component({
  selector: 'desk-assign',
  templateUrl: './desk-assign.component.html',
  styleUrls: ['./desk-assign.component.css']
})
export class DeskAssignComponent implements OnInit {

  @Input() desk: Desk
  @Input() deskAssignment: DeskAssignment
  @Input() changesetItem: ChangesetItem

  @Input() changeset: Changeset

  employee

  constructor(
    private employeeService:EmployeeService,
    private changesetItemService: ChangesetItemService
  ) { }

  ngOnInit() {
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
      this.changesetItemService.move(this.employee, null, this.desk, this.changeset,this.changesetItem)
    }
  }
  unassignEmployee(){
    this.changesetItemService.move(EmployeeService.getEmployee(this.deskAssignment,this.changesetItem), this.desk, null, this.changeset,this.changesetItem)
  }
}
