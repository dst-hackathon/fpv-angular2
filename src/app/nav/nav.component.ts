import { Component, OnInit } from '@angular/core';
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

  constructor(private loginService: LoginService,private route :ActivatedRoute) { }

  ngOnInit() {
    this.user = this.loginService.loginUser

    this.route.params.subscribe(params=> this.planId=params['id'])
  }
}
