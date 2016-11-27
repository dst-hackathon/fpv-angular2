import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {LoginService} from "./service/login.service";

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
    this.user  = this.loginService.loginUser
    this.checkLoginUser()

    this.loginService.loadLoginAccount()
  }

  checkLoginUser() {
    this.user.subscribe(user => {
      if(user){
        this.router.navigate(['home']);
      }else{
        this.router.navigate(['login'])
      }
    }, err => {
      console.log("User not logged in",err)
      this.router.navigate(['login'])
    })
  }
}
