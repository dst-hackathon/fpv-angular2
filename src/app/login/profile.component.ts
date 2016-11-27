import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {LoginService} from "../service/login.service";

@Component({
  selector: 'profile',
  template: `
    
    <span class="navbar-text float-sm-right navbar-dark-text" *ngIf="user|async">
      Login as : {{(user | async)?.firstName}}
    </span>
  `,
})
export class ProfileComponent implements OnInit{
  user

  constructor(public loginService: LoginService, public router: Router) {}

  ngOnInit(){
    this.user  = this.loginService.loginUser
  }
}
