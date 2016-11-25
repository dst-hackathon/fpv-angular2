import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../service/login.service';

@Component({
  selector: 'profile',
  template: `
    <div *ngIf="user">
      <p>Login as : {{user.firstName}}</p>
      <button (click)="logout()">Logout</button>
    </div>
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
