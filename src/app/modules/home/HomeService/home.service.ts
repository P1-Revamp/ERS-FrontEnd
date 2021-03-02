import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }


  getUser(id: number): Observable<User> {
    return this.http.get(`${environment.URL}/user/` + id) as Observable<User>;
  }

  checkIfUsernameExists(user: User): Observable<boolean> {
    return this.http.post(`${environment.URL}/user/username`, user) as Observable<boolean>;
  }
  updateUsername(user: User): Observable<boolean> {
    return this.http.patch(`${environment.URL}/user/username`, user) as Observable<boolean>;
  }
  updateEmail(user: User): Observable<boolean> {
    return this.http.patch(`${environment.URL}/user/email`, user) as Observable<boolean>;
  }
  updatePassword(user: User): Observable<boolean> {
    return this.http.patch(`${environment.URL}/user/password`, user) as Observable<boolean>;
  }

}
