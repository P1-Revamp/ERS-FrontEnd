import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateTicketComponent } from './modules/create-ticket/create-ticket/create-ticket.component';
import { UserGuardGuard } from './modules/guard/user-guard.guard';
import { HomePageComponent } from './modules/home/home-page/home-page.component';
import { SettingsComponent } from './modules/home/settings/settings.component';
import { LoginComponent } from './modules/login/login/login.component';
import { ReviewTicketsComponent } from './modules/review-tickets/review-tickets/review-tickets.component';
import { ViewTicketsComponent } from './modules/view-tickets/view-tickets/view-tickets.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'home', canActivate: [UserGuardGuard], component: HomePageComponent},
  {path: 'create-ticket', canActivate: [UserGuardGuard], component: CreateTicketComponent},
  {path: 'my-tickets', canActivate: [UserGuardGuard], component: ViewTicketsComponent},
  {path: 'review-tickets', canActivate: [UserGuardGuard], component: ReviewTicketsComponent},
  {path: 'settings', canActivate: [UserGuardGuard], component: SettingsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
