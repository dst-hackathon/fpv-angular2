import {Component, OnInit, Input} from "@angular/core";
import {NgbModal, ModalDismissReasons} from "@ng-bootstrap/ng-bootstrap";
import {Desk} from "../model/desk";
import {DeskAssignment} from "../model/desk-assignment";
import {Employee} from "../model/employee";
import {Floor} from "../model/floor";
import {EmployeeService} from "../service/employee.service";
import {ChangesetItem} from "../model/changeset-item";
import {Observable} from "rxjs";

@Component({
  selector: 'desk',
  templateUrl: './desk.component.html',
  styleUrls: ['./desk.component.css']
})
export class DeskComponent implements OnInit {

  @Input() desk: Desk
  @Input() deskAssignment: DeskAssignment
  @Input() changesetItem: ChangesetItem

  employee: Observable<Employee>;
  closeResult: string;
  emptyDeskUrl = '../assets/question-mark.png';
  assignedDeskUrl = '../assets/user-silhouette.png';

  constructor(public employeeService: EmployeeService, private deskModal: NgbModal) { }

  ngOnInit() {
    this.loadEmployee()
  }

  loadEmployee(){
    if(this.deskAssignment){
      this.employee = this.employeeService.getEmployee(this.deskAssignment.employee.id)
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
    event.dataTransfer.setData('srcDesk', JSON.stringify(this.desk));
  }

  public ondrop(event) {
    event.preventDefault();
    console.log("Drop", event);
    console.log("To Desk ID", this.desk.id);
    var srcDesk = event.dataTransfer.getData('srcDesk');
    console.log(srcDesk);
    console.log("From Desk ID", JSON.parse(srcDesk).id );
  }

  public ondragover(event) {
    event.preventDefault();
  }
  tryClick() {
    console.log('click');
  }

}
