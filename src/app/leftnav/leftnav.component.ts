import { Component, OnInit } from '@angular/core';
import {LoginService} from "../service/login.service";

@Component({
  selector: 'leftnav',
  templateUrl: './leftnav.component.html',
  styleUrls: ['./leftnav.component.css']
})
export class LeftnavComponent implements OnInit{
  user

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.user = this.loginService.loginUser
  }
}
