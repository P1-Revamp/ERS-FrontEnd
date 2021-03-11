import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './modules/navigation/nav-bar/nav-bar.component';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './modules/login/login/login.component';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { CreateTicketComponent } from './modules/create-ticket/create-ticket/create-ticket.component';
import { ViewTicketsComponent } from './modules/view-tickets/view-tickets/view-tickets.component';
import { ReviewTicketsComponent } from './modules/review-tickets/review-tickets/review-tickets.component';
import { SettingsComponent } from './modules/home/settings/settings.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomePageComponent } from './modules/home/home-page/home-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomePageComponent,
    LoginComponent,
    CreateTicketComponent,
    ViewTicketsComponent,
    ReviewTicketsComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
  ],
  providers: [HttpClient, CookieService, NavBarComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
