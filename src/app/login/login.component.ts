import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {
  Input,
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';
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
  
  @Input() user;
  @Output() userChange = new EventEmitter();

  constructor(public loginService: LoginService) { }

  ngOnInit() {
    this.checkLoginUser()  
  }

  checkLoginUser(){
    this.loginService.getAccount().subscribe(user => {
      this.user = user
      this.userChange.emit(this.user);
    }, err => console.log(err))
  }

  onSignInBtnClick() {
    this.signInButtonClicked = 'clicked';
    console.log(this.signInButtonClicked);
  }

  onSubmit(){
    this.loginService.login(this.username,this.password,this.rememberMe)
      .subscribe(
          json => {
            console.log("login success" + json)
            this.checkLoginUser()
          },
          err => {
              console.log(err);
          });
  }

  logout(){
    this.loginService.logout().subscribe(res => {
      this.user = null
      this.userChange.emit(this.user);
    })
  }
}
