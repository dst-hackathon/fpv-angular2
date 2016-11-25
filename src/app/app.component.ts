import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from './service/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  user;

  constructor(
    public loginService: LoginService,
    public router: Router) {}

  ngOnInit() {
    this.checkLoginUser();
  }

  checkLoginUser() {
    this.loginService.getAccount().subscribe(user => {
      this.user = user
      this.router.navigate(['home']);
    }, err => {
      console.log("User not logged in",err)
      this.router.navigate(['login'])
    })
  }
}