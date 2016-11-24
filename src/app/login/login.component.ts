import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username;
  password;
  user;

  constructor(public loginService: LoginService) { }

  ngOnInit() {
    this.checkLoginUser()  
  }

  checkLoginUser(){
    this.loginService.getAccount().subscribe(user => this.user = user, err => console.log(err))
  }

  onSubmit(){
    this.loginService.login(this.username,this.password)
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
    this.loginService.logout().subscribe(this.logResponse)
    this.user = null
  }

  logResponse(json){
    return console.log(json)
  }
}
