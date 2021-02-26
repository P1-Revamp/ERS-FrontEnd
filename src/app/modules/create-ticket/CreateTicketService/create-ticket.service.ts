import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Reimbursement } from 'src/app/models/reimbursement.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NewReimbursement } from 'src/app/models/new-reimbursement.model';

@Injectable({
  providedIn: 'root'
})
export class CreateTicketService {

  constructor(private http: HttpClient) { }

  createTicket(ticket: NewReimbursement): Observable<boolean> {

    return this.http.post(`${environment.URL}/reimbursement/`, ticket) as Observable<boolean>;

  }

}
