import { JsonpClientBackend } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { Component, HostListener, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Roles } from 'src/app/models/roles.model';
import { User } from 'src/app/models/user.model';
import { ticketArray$, environment } from 'src/environments/environment';
import { LoginService } from '../../login/LoginService/login.service';
import { NavBarComponent } from '../../navigation/nav-bar/nav-bar.component';
import { NavBarService } from '../../navigation/NavService/nav-bar.service';
import { HomeService } from '../HomeService/home.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  user: User = new User(0, "", "", "", "", "", new Roles(0, ""));
  showErrorMessage: boolean = false;

  constructor(public loginService: LoginService, private cookieService : CookieService, private homeService: HomeService, private navBarComponent: NavBarComponent, private navBarService: NavBarService) { }
  
  ngOnInit(): void {
    this.navBarService.isLoggedIn();

    if (<number><unknown>this.cookieService.get("role") == 1) this.navBarService.isFinancialManager();
    this.homeService.getUser(<number><unknown>this.cookieService.get("id")).subscribe(
      (response: User) => {
        this.user = response;
        this.showErrorMessage = false;
      }, (error: any) => {
        this.showErrorMessage = true;
        console.log(error);
      });
    
  
  }
}
