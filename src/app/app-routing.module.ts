import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthGuardService } from './service/auth-guard.service';
import { RoleGuardService } from './service/role-guard.service';
import { AdminBoardComponent } from './admin-board/admin-board.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeeComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'addemployee',
    component: AddEmployeeComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'adminBoard',
    component: AdminBoardComponent,
    canActivate: [AuthGuardService, RoleGuardService]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'logout',
    component: LogoutComponent,
    canActivate: [AuthGuardService]
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
