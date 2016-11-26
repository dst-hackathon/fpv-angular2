import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { Desk } from '../model/desk';
import { DeskAssignment } from '../model/desk-assignment';
import { Employee } from '../model/employee';
import { DeskMoveModal } from '../desk-move-modal/desk-move-modal'

import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'desk',
  templateUrl: './desk.component.html',
  styleUrls: ['./desk.component.css']
})
export class DeskComponent implements OnInit {

  @Input() desk: Desk
  @Input() deskAssignment: DeskAssignment
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
    this.deskModal.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
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

  tryClick() {
    console.log('click');
  }

}
