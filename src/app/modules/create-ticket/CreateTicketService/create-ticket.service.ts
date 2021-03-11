import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Reimbursement } from 'src/app/models/reimbursement.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NewReimbursement } from 'src/app/models/new-reimbursement.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CreateTicketService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  createTicket(ticket: NewReimbursement): Observable<boolean> {
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(this.cookieService.get("username") + ":" + this.cookieService.get("password"))});
    return this.http.post(`${environment.URL}reimbursement/`, ticket, {headers}) as Observable<boolean>;

  }

}
