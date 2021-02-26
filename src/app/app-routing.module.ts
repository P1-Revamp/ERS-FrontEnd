import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateTicketComponent } from './modules/create-ticket/create-ticket/create-ticket.component';
import { UserGuardGuard } from './modules/guard/user-guard.guard';
import { HomePageComponent } from './modules/home/home-page/home-page.component';
import { LoginComponent } from './modules/login/login/login.component';
import { NavBarComponent } from './modules/navigation/nav-bar/nav-bar.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'home', canActivate: [UserGuardGuard], component: HomePageComponent},
  {path: 'create-ticket', component: CreateTicketComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
