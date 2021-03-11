import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }


  // verifyCredentials(username: string, password: string): Observable<number[]> {

  //   const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(username + ":" + password)});

  //   // let credentials: any = {username, password};
  //   return this.http.get(`${environment.URL}user/login/`, {headers, responseType:'text' as 'json'}) as Observable<number[]>;
  // }

  verifyCredentials(username: string, password: string): Observable<number[]> {

    let credentials = {username, password};

    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(username + ":" + password)});
    return this.http.post(`${environment.URL}user/login/`, credentials, {headers}) as Observable<number[]>;
  }

}
