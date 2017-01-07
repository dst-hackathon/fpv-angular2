import {Component, OnInit, NgZone} from '@angular/core';
import {LoginService} from "../service/login.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{
  user
  planId
  isShrunk: boolean = false;

  constructor(private loginService: LoginService,private route :ActivatedRoute,zone: NgZone) {
    window.onscroll = () => {
      zone.run(() => {
        if(window.pageYOffset > 0) {
          this.isShrunk = true;
        } else {
          this.isShrunk = false;
        }
      });
    }
  }

  ngOnInit() {
    this.user = this.loginService.loginUser

    this.route.params.subscribe(params=> this.planId=params['id'])
  }
}
