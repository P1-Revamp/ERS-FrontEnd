import { Component, OnInit, ɵɵtrustConstantResourceUrl } from '@angular/core';
import { Router } from '@angular/router';
import { faBars, faCog, faEdit, faHome, faSignOutAlt, faStamp, faTicketAlt } from '@fortawesome/free-solid-svg-icons';
import { CookieService } from 'ngx-cookie-service';
import { NavBarService } from '../NavService/nav-bar.service';
// import { isFinancialManager$, isLoggedIn$ } from 'src/environments/environment';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  faCog = faCog;
  faBars = faBars;
  faHome = faHome;
  faTicketAlt = faTicketAlt;
  faEdit = faEdit;
  faStamp = faStamp;
  faSignOutAlt = faSignOutAlt;

  isFinancialManager: boolean = false;
  isLoggedIn: boolean = false;

  constructor(private router: Router, private cookieService : CookieService, public navBarService: NavBarService) { }

  ngOnInit(): void {

    this.isLoggedIn = <boolean><unknown>this.cookieService.get("isLoggedIn");
  }

  setIsFinancialManager(isFinancialManager: boolean) {
    this.isFinancialManager = isFinancialManager;
  }

  setIsLoggedIn(isLoggedIn: boolean) {
    this.isLoggedIn = isLoggedIn;
  }

  getIsLoggedIn(): boolean {
    return this.isLoggedIn;
  }

  logout() {
    console.log("in logout");
    this.cookieService.deleteAll();
    // this.navBarService.logout();
  }

}
