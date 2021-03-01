import { Component, OnInit, ɵɵtrustConstantResourceUrl } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { NavBarService } from '../NavService/nav-bar.service';
// import { isFinancialManager$, isLoggedIn$ } from 'src/environments/environment';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  isFinancialManager: boolean = false;
  isLoggedIn: boolean = false;

  constructor(private router: Router, private cookieService : CookieService, public navBarService: NavBarService) { }

  ngOnInit(): void {

    // console.log("cookie: " + <boolean><unknown>this.cookieService.get("isLoggedIn"));

    this.isLoggedIn = <boolean><unknown>this.cookieService.get("isLoggedIn");

    // console.log("isLoggedIn: " + this.isLoggedIn);

      // isLoggedIn$.subscribe(
      //   (isLoggedIn: boolean) => {
      //     this.isLoggedIn = isLoggedIn;
      //   });

      //   isFinancialManager$.subscribe(
      //     (isFinancialManager: boolean) => {
      //       this.isFinancialManager = isFinancialManager;
      //     });

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
    // this.cookieService.set("isLoggedIn", "false");
    // this.ngOnInit();
    this.cookieService.deleteAll();
    // this.router.navigate(['/login']);
  }

}
