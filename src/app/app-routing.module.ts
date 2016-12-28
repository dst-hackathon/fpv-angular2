import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {LogoutComponent} from "./login/logout.component";
import {PlanListComponent} from "./plan-list/plan-list.component";
import {PlanDialogComponent} from "./plandialog/plandialog.component";
import {ChangesetListComponent} from "./changeset-list/changeset-list.component";
import {ChangesetComponent} from "./changeset/changeset.component";
import {EmployeeComponent} from "./employee/employee.component";
import {EmployeeDetailComponent} from "./employee-detail/employee-detail.component";

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login',  component: LoginComponent },
    { path: 'logout',  component: LogoutComponent },
    { path: 'home',  component: PlanListComponent },
    { path: 'plans/:id', component: PlanDialogComponent },
    { path: 'plans/:id/floorPlan/:buildingId/:floorId/:changesetId/:deskId', component: PlanDialogComponent },
    { path: 'plans/:id/changesets', component: ChangesetListComponent },
    { path: 'plans/:id/changesets/:changesetId', component: ChangesetComponent },
    { path: 'plans/:id/employees', component: EmployeeComponent },
    { path: 'plans/:id/employees/:empId', component: EmployeeDetailComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
