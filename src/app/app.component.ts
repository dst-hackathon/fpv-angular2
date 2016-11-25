import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './service/employee.service';
import { Employee } from './model/employee';
import { LoginService } from './service/login.service';
import { DeskAssignment } from './model/desk-assignment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app worksxxx!';
  employee: Employee;
  user;

  constructor(public employeeService: EmployeeService,
    public loginService: LoginService) { }

  ngOnInit() {
    this.employeeService.getEmployee(1).subscribe(res => {
      this.employee = res
    });
    this.checkLoginUser();
  }

  checkLoginUser() {
    this.loginService.getAccount().subscribe(user => this.user = user, err => console.log(err))
  }
  
  getDeskAssignment() {
    return new DeskAssignment();
  }
}
