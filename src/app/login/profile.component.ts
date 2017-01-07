import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {LoginService} from "../service/login.service";

@Component({
  selector: 'profile',
  template: `
    
    <div class="navbar-text float-sm-right navbar-dark-text" *ngIf="user|async">
      <span><i class="fa fa-user-circle-o" aria-hidden="true"></i> {{(user | async)?.firstName}}</span>
      | <a routerLink="/logout" routerLinkActive="active"><i class="fa fa-sign-out" aria-hidden="true"></i> Log out</a>
    </div>
  `,
})
export class ProfileComponent implements OnInit{
  user

  constructor(public loginService: LoginService, public router: Router) {}

  ngOnInit(){
    this.user  = this.loginService.loginUser
  }
}
