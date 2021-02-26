import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class NavBarService {

  showMenu: boolean;
  showReviewTab: boolean;

  constructor(private cookieService: CookieService) { 
    this.showMenu = false;
    this.showReviewTab = false;
  }

  isLoggedIn() {
    this.showMenu = true;
  }

  isNotLoggedIn() {
    this.showMenu = false;
  }

  isFinancialManager() {
    this.showReviewTab = true;
  }

  isNotFinancialManager() {
    this.showReviewTab = false;
  }

}
