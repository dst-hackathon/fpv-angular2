import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './login/logout.component';
import { ProfileComponent } from './login/profile.component';

import { PlanDialogComponent } from './plandialog/plandialog.component';
import { DeskComponent } from './desk/desk.component';
import { FloorPlanCanvasComponent } from './floor-plan-canvas/floor-plan-canvas.component';

import { LoginService } from './service/login.service';
import { DeskAssignmentService } from './service/desk-assignment.service';
import { PlanService } from './service/plan.service';
import { PlanListComponent } from './plan-list/plan-list.component';
import { PlanDialogService } from './service/plandialog.service';
import { EmployeeService } from './service/employee.service';
import { DeskService } from './service/desk.service';
import { DeskCardComponent } from './desk-card/desk-card.component';
import { FloorSelectorComponent } from './floor-selector/floor-selector.component';
import { BuildingSelectorComponent } from './building-selector/building-selector.component';
import { FloorSelectorService } from './service/floorselector.service';
import { BuildingSelectorService } from './service/buildingselector.service';

import { FloorComponent } from './floor/floor.component';

import { AppRoutingModule  } from './app-routing.module';
import { FloorMarkerComponent } from './floor-marker/floor-marker.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,LogoutComponent,ProfileComponent,
    PlanDialogComponent,
    DeskComponent,
    FloorPlanCanvasComponent,
    DeskCardComponent,
    PlanDialogComponent,
    FloorSelectorComponent,
    PlanListComponent,
    BuildingSelectorComponent,
    FloorComponent,
    FloorMarkerComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    NgbModule.forRoot()
  ],
  providers: [
    LoginService,
    PlanDialogService,
    EmployeeService,
    PlanService,
    FloorSelectorService,
    DeskAssignmentService,
    BuildingSelectorService,
    DeskService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
