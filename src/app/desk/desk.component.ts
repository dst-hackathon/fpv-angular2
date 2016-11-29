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

@Component({
  selector: 'desk',
  templateUrl: './desk.component.html',
  styleUrls: ['./desk.component.css']
})
export class DeskComponent implements OnInit {

  @Input() desk: Desk
  @Input() deskAssignment: DeskAssignment
  @Input() changesetItem: ChangesetItem
  @Input() changeset: Changeset

  employee: Observable<Employee>;
  loadedEmployee;
  closeResult: string;
  emptyDeskUrl = '../assets/question-mark.png';
  assignedDeskUrl = '../assets/user-silhouette.png';

  constructor(
    public employeeService: EmployeeService,
    private changesetItemService: ChangesetItemService,
    private deskModal: NgbModal) { }

  ngOnInit() {
    this.loadEmployee()
  }

  loadEmployee(){
    if(this.deskAssignment){
      this.employee = this.employeeService.getEmployee(this.deskAssignment.employee.id)
      this.employee.subscribe(emp => this.loadedEmployee = emp)
    }
  }

  open(content) {
    this.deskModal.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log("Dialog result: " + this.closeResult);
      if("Save" == result)
      {
        // Call service to save deskAssignment
        console.log("Save with DeskAssignment: ", this.deskAssignment);
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
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
    event.dataTransfer.setData('employee', JSON.stringify(this.loadedEmployee));
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
