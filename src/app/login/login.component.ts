import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { trigger,state,style,transition,animate} from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('loginState', [
      state('none', style({
        opacity: 0,
        height: '0px'
      })),
      state('clicked', style({
        opacity: 1,
        height: '260px'
      })),
      transition('none => clicked', animate('500ms ease-out'))
    ])
  ]
})
export class LoginComponent implements OnInit {
  username;
  password;
  rememberMe;
  signInButtonClicked = 'none';
  
  user;

  constructor(public loginService: LoginService, public router: Router) { }

  ngOnInit() {}

  onSignInBtnClick($event) {
    $event.preventDefault();
    $event.stopPropagation();

    this.signInButtonClicked = 'clicked';
    console.log(this.signInButtonClicked);
  }

  onSubmit(){
    this.loginService.login(this.username,this.password,this.rememberMe)
      .subscribe(
          json => {
            console.log("login success" + json)
            this.router.navigate(['home']);
          },
          err => {
              console.log(err);
          });
  }
}
