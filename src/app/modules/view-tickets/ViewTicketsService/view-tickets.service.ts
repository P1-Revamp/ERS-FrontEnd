import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Reimbursement } from 'src/app/models/reimbursement.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ViewTicketsService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  getTicketsExceptById(id: number): Observable<Reimbursement[]> {
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(this.cookieService.get("username") + ":" + this.cookieService.get("password"))});
    return this.http.get(`${environment.URL}reimbursement/` + id, {headers}) as Observable<Reimbursement[]>;

  }
}
