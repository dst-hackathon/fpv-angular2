import { Component, OnInit, Input } from '@angular/core';
import { Employee } from '../model/employee';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.css']
})
export class EmployeeCardComponent implements OnInit {

  @Input() employee: Employee;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {

  }

}
