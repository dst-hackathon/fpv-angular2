import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username;
  password;
  rememberMe;
  
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
