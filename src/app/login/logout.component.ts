import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../service/login.service';

@Component({
  selector: 'logout',
  template: 'Logout'
})
export class LogoutComponent implements OnInit {

  constructor(public loginService :LoginService,
    public router: Router
  ) { }

  ngOnInit() {
    this.logout()
  }

  logout(){
    this.loginService.logout().subscribe(res => {
      this.router.navigate(['login']);
    })
  }
}
