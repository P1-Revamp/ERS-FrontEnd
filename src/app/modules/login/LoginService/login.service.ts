import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }


  verifyCredentials(username: string, password: string): Observable<number[]> {

    let credentials: any = {username, password};
    return this.http.post(`${environment.URL}/user/login/`, credentials) as Observable<number[]>;
  }

}
