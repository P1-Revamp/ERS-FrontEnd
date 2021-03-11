import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NavBarService {

  showMenu: boolean;
  showReviewTab: boolean;

  constructor(private cookieService: CookieService, private http: HttpClient) { 
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

  // logout() {
  //   this.http.get(`${environment.URL}user/logout/`);
  // }

}
