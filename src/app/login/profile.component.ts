import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../service/login.service';

@Component({
  selector: 'profile',
  template: `
    <span class="navbar-text float-sm-right navbar-dark-text" *ngIf="user">
      Login as : {{user.firstName}}
    </span>
  `,
})
export class ProfileComponent{
  @Input() user;

  constructor(public loginService: LoginService, public router: Router) { }

  logout(){
    this.loginService.logout().subscribe(res => {
      this.user = null
      this.router.navigate(['login']);
    })
  }
}
