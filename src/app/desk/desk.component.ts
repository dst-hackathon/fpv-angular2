import {Component, OnInit, Input} from "@angular/core";
import {NgbModal, ModalDismissReasons} from "@ng-bootstrap/ng-bootstrap";
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

  deskAssignment: Observable<DeskAssignment>
  changesetItem: Observable<ChangesetItem>

  employee: Observable<Employee>;
  closeResult: string;
  emptyDeskUrl = '../assets/question-mark.png';
  assignedDeskUrl = '../assets/user-silhouette.png';

  selectedDesk: Observable<Desk>;

  constructor(
    public employeeService: EmployeeService,
    private changesetItemService: ChangesetItemService,
    private deskAssigmentService: DeskAssignmentService,
    private deskService: DeskService,
    private deskModal: NgbModal) { }

  ngOnInit() {
    this.deskAssignment = this.getDeskAssignment(this.desk)
    this.changesetItem = this.getChangesetItem(this.desk)

    this.deskAssignment.subscribe(da=> {
      this.loadEmployee(da)
      return da
    })
  }

  getDeskAssignment(desk: Desk) : Observable<DeskAssignment>{
    return this.deskAssigmentService.deskAssignments.map(list=> list.find(item => item.desk.id === desk.id))
  }

  getChangesetItem(desk: Desk) : Observable<ChangesetItem> {
    return this.changesetItemService.changesetItems.map(list=> list.find(item => item.toDesk && item.toDesk.id === desk.id))
  }

  loadEmployee(deskAssignment){
    if(deskAssignment){
      this.employee = this.employeeService.getEmployee(deskAssignment.employee.id)
    }
  }

  open(content) {
    this.deskService.setSelectedDesk(this.desk);
    this.deskModal.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log("Dialog result: " + this.closeResult);
      if("Save" == result)
      {
        // Call service to save deskAssignment
        console.log("Save with DeskAssignment: ", this.deskAssignment);
      }
      else if("DELETE" == result){
        console.log("Delete desk: ", this.desk);
        this.deskService.remove(this.desk.id)
      }

      this.deskService.setSelectedDesk(null);
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.deskService.setSelectedDesk(null);
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  public ondragstart(event) {
    console.log("Drag started", event);
    console.log("Desk ID", this.desk.id);
    event.dataTransfer.setData('fromDeskId', JSON.stringify(this.desk));

    this.employee.subscribe(emp =>{
      event.dataTransfer.setData('employee', JSON.stringify(emp));

      emp
    })
  }

  public ondrop(event) {
    event.preventDefault();
    let fromDeskId = JSON.parse(event.dataTransfer.getData('fromDeskId'))
    let employee = JSON.parse(event.dataTransfer.getData('employee'))
    let toDeskId  = this.desk;

    console.log(`Move desk: from ${fromDeskId} to ${toDeskId}`)

    this.changesetItemService.move(employee, fromDeskId, toDeskId, this.changeset)
  }

  public ondragover(event) {
    event.preventDefault();
  }
  tryClick() {
    console.log('click');
  }

}
