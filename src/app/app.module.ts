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

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginComponent,
    CreateTicketComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [HttpClient, CookieService, NavBarComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
