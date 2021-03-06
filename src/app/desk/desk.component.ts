import {Component, OnInit, Input} from "@angular/core";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Desk} from "../model/desk";
import {DeskAssignment} from "../model/desk-assignment";
import {Employee} from "../model/employee";
import {EmployeeService} from "../service/employee.service";
import {ChangesetItem} from "../model/changeset-item";
import {Observable} from "rxjs";
import {Changeset} from "../model/changeset";
import {ChangesetItemService} from "../service/changeset-item.service";
import {DeskAssignmentService} from "../service/desk-assignment.service";
import {DeskService} from "../service/desk.service";

@Component({
  selector: 'desk',
  templateUrl: './desk.component.html',
  styleUrls: ['./desk.component.css']
})
export class DeskComponent implements OnInit {

  @Input() desk: Desk
  @Input() changeset: Changeset

  deskAssignment$: Observable<DeskAssignment>
  changesetItem$: Observable<ChangesetItem>

  deskAssignment: DeskAssignment
  changesetItem: ChangesetItem

  emptyDeskUrl = '../assets/question-mark.png';
  assignedDeskUrl = '../assets/user-silhouette.png';

  selectedDesk: Observable<Desk>;

  isPopoverHover: boolean;

  constructor(
    public employeeService: EmployeeService,
    private changesetItemService: ChangesetItemService,
    private deskAssigmentService: DeskAssignmentService,
    private deskService: DeskService,
    private deskModal: NgbModal) { }

  ngOnInit() {
    this.deskAssignment$ = this.deskAssigmentService.get(this.desk)
    this.changesetItem$ = this.changesetItemService.get(this.desk)

    this.deskAssignment$.subscribe(da=> this.deskAssignment = da)
    this.changesetItem$.subscribe(ci=> this.changesetItem= ci)
  }

  private getEmployee():Employee {

    if(this.changesetItem && this.changesetItem.employee){
      return this.changesetItem.employee
    }

    if(this.deskAssignment && this.deskAssignment.employee){
      return this.deskAssignment.employee
    }

    return null
  }

  selectDesk(event){
    event.preventDefault();
    this.deskService.setSelectedDesk(this.desk);
  }

  public ondragstart(event, popoverWindow) {
    popoverWindow.close();
    console.log("Drag started", event);
    console.log("Desk ID", this.desk.id);
    event.dataTransfer.setData('fromDesk', JSON.stringify(this.desk))
    event.dataTransfer.setData('employee', JSON.stringify(this.getEmployee()))
    event.dataTransfer.setData('changesetItem', JSON.stringify(this.changesetItem||null))
  }

  public ondrop(event) {
    event.preventDefault();
    let fromDesk = JSON.parse(event.dataTransfer.getData('fromDesk'))
    let employee = JSON.parse(event.dataTransfer.getData('employee'))
    let changesetItem = this.getTransferData(event,'changesetItem')
    let toDesk  = this.desk;

    console.log(`Move desk: from ${fromDesk} to ${toDesk}`)

    this.changesetItemService.move(employee, fromDesk, toDesk, this.changeset,changesetItem)
  }

  private getTransferData(event,name) {
    var data = event.dataTransfer.getData(name);
    if(!data){
      return null
    }

    return JSON.parse(data);
  }

  public ondragover(event) {
    event.preventDefault();
  }

  showChangesetItem(item:ChangesetItem){
    if(!item){
      return false
    }

    // do not display approved changeset to screen
    if(item.status == 'ACCEPT'){
      return false
    }

    return true;
  }

  showDeskAssignmentItem(item: ChangesetItem, da: DeskAssignment) {
    if(!da){
      return false
    }

    if(this.showChangesetItem(item)){
      return false
    }

    return true;
  }

  showAsPreviousStep(da: DeskAssignment){
    return this.isPreviousStep(da)
  }

  isPreviousStep(da: DeskAssignment) {
    return this.changesetItemService.findByFromDesk(da.desk).length > 0;
  }

  isNotEmptyDesk(){
    if(this.deskAssignment && !this.isPreviousStep(this.deskAssignment)){
      return true
    }

    if(this.changesetItem){
      return true
    }


    return false
  }

  enterPopoverContent() {
    this.isPopoverHover = true;
  }

  leavePopoverContent(popoverWindow) {
    this.isPopoverHover = false;
    popoverWindow.close();
  }

  closePopoverWindow(popoverWindow) {
    setTimeout(() => {
      if (!this.isPopoverHover) {
        popoverWindow.close();
      }
    }, 300);
  }

}
