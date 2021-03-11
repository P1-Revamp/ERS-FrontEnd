import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private headers = new HttpHeaders({Authorization: 'Basic ' + btoa(this.cookieService.get("username") + ":" + this.cookieService.get("password"))});

  constructor(private http: HttpClient, private cookieService : CookieService) { }


  getUser(id: number): Observable<User> {
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(this.cookieService.get("username") + ":" + this.cookieService.get("password"))});
    return this.http.get(`${environment.URL}user/` + id, {headers}) as Observable<User>;
  }

  checkIfUsernameExists(user: User): Observable<boolean> {
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(this.cookieService.get("username") + ":" + this.cookieService.get("password"))});
    return this.http.post(`${environment.URL}user/username`, user, {headers}) as Observable<boolean>;
  }

  updateUsername(user: User): Observable<boolean> {
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(this.cookieService.get("username") + ":" + this.cookieService.get("password"))});
    return this.http.patch(`${environment.URL}user/username`, user, {headers}) as Observable<boolean>;
  }

  updateEmail(user: User): Observable<boolean> {
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(this.cookieService.get("username") + ":" + this.cookieService.get("password"))});
    return this.http.patch(`${environment.URL}user/email`, user, {headers}) as Observable<boolean>;
  }

  updatePassword(user: User): Observable<boolean> {
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(this.cookieService.get("username") + ":" + this.cookieService.get("password"))});
    return this.http.patch(`${environment.URL}user/password`, user, {headers}) as Observable<boolean>;
  }
}
