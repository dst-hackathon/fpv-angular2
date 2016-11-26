import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { Desk } from '../model/desk';
import { DeskAssignment } from '../model/desk-assignment';
import { Employee } from '../model/employee';
import { Floor } from '../model/floor';

import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'desk',
  templateUrl: './desk.component.html',
  styleUrls: ['./desk.component.css']
})
export class DeskComponent implements OnInit {

  @Input() desk: Desk
  @Input() deskAssignment: DeskAssignment
  @Input() floor: Floor
  employee: Employee;
  closeResult: string;
  emptyDeskUrl = '../assets/question-mark.png';
  assignedDeskUrl = '../assets/user-silhouette.png';

  constructor(public employeeService: EmployeeService, private deskModal: NgbModal) { }

  ngOnInit() {
    if (this.deskAssignment) {
      this.employeeService.getEmployee(this.deskAssignment.employee.id).subscribe(res => {
        this.employee = res
      });
    }
  }

  open(content) {
    if(this.deskAssignment == null)
    {
      // new DeskAssignment to bind data from modal
      this.newDeskAssignment();
    }
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

  private newDeskAssignment()
  {
    this.deskAssignment = new DeskAssignment();
    this.deskAssignment.desk = this.desk;
    this.deskAssignment.employee = new Employee();
    this.deskAssignment.employee.id = 0;
    this.deskAssignment.employee.firstname = "";
    this.deskAssignment.employee.lastname = "";
    this.deskAssignment.plan = this.floor.building.plan;
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
