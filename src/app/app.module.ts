import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PlanDialogComponent } from './plandialog/plandialog.component';

import { LoginService } from './service/login.service';
import { EmployeeService } from './service/employee.service';
import { DeskCardComponent } from './desk-card/desk-card.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DeskCardComponent,
    PlanDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    LoginService,EmployeeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
