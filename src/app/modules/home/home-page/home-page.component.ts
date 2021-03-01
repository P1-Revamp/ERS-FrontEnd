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

  // user: User = new User(0, "", "", "", "", "", new Roles(0, ""));
  user: User;

  constructor(public loginService: LoginService, private cookieService : CookieService, private homeService: HomeService, private navBarComponent: NavBarComponent, private navBarService: NavBarService) { }
  
  ngOnInit(): void {
    this.navBarService.isLoggedIn();
    if (<number><unknown>this.cookieService.get("role") == 1) this.navBarService.isFinancialManager();
    this.homeService.getUser(<number><unknown>this.cookieService.get("id")).subscribe(
      (user: User) => {
        this.user = user;
      });
    
  
  }

  // @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
  //   this.loginService.verifyCredentials();
  // }

  // async getUserInfo(id: number) {

  //   this.homeService.getUser(id).subscribe(
  //     (user: User) => {
  //       this.user = user;
  //       // if (user.role.roleId === 1) {
  //       //   this.navBarComponent.setIsFinancialManager(true);
  //       // }
        
  //     }
  //   )

  // }

}
