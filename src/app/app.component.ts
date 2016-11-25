import { Component,OnInit } from '@angular/core';

import { EmployeeService } from './service/employee.service';
import { Employee } from './model/employee';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app worksxxx!';
  employee: Employee

  constructor(public employeeService : EmployeeService){}

  ngOnInit(){
     this.employeeService.getEmployee(1).subscribe(res => {
      this.employee = res
    })
  }
}
