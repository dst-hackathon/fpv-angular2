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
import {PlansComponent} from "./plans/plans.component";
import {PlanComponent} from "./plans/plan/plan.component";

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login',  component: LoginComponent },
    { path: 'logout',  component: LogoutComponent },
    { path: 'plans',  component: PlansComponent,
      children:[
        { path: '', component: PlanListComponent },
        { path: ':id', component: PlanComponent
          ,children:[
            { path: '', component: PlanDialogComponent},
            { path: 'changesets', component: ChangesetListComponent},
            { path: 'changesets/:changesetId', component: ChangesetComponent },

            { path: 'employees', component: EmployeeComponent },
            { path: 'employees/:empId', component: EmployeeDetailComponent },

            { path: 'floorPlan/:buildingId/:floorId/:changesetId/:deskId', component: PlanDialogComponent },
          ]
        },
      ]
    },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
