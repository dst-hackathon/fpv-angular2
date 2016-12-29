import { Component, OnInit } from '@angular/core';
import {LoginService} from "../service/login.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{
  user

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.user = this.loginService.loginUser
  }
}
