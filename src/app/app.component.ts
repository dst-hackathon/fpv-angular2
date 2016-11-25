import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './service/employee.service';
import { Employee } from './model/employee';
import { LoginService } from './service/login.service';
import { FloorSelectorService } from './service/floorselector.service';
import { DeskAssignment } from './model/desk-assignment';

import { Floor } from './model/floor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app worksxxx!';
  employee: Employee;
  floor: Floor;

  user;

  constructor(public employeeService: EmployeeService,
    public loginService: LoginService,
    public floorService: FloorSelectorService) { }

  ngOnInit() {
    this.employeeService.getEmployee(1).subscribe(res => {
      this.employee = res
    });

    this.floorService.getFloor(1).subscribe(floor=> {
      this.floor = floor
    })

    this.checkLoginUser();
  }

  checkLoginUser() {
    this.loginService.getAccount().subscribe(user => this.user = user, err => console.log(err))
  }
  
  getDeskAssignment() {
    return new DeskAssignment();
  }
}
