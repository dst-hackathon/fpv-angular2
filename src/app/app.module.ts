import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PlanDialogComponent } from './plandialog/plandialog.component';
import { DeskComponent } from './desk/desk.component';

import { LoginService } from './service/login.service';
import { PlanService } from './service/plan.service';
import { PlanListComponent } from './plan-list/plan-list.component';
import { PlanDialogService } from './service/plandialog.service';
import { EmployeeService } from './service/employee.service';
import { DeskCardComponent } from './desk-card/desk-card.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PlanDialogComponent,
    DeskComponent,
    DeskCardComponent,
    PlanDialogComponent,
    PlanListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    LoginService,PlanDialogService,EmployeeService,PlanService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
