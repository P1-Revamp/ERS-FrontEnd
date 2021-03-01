import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reimbursement } from 'src/app/models/reimbursement.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewTicketsService {

  constructor(private http: HttpClient) { }

  getTicketsExceptById(id: number): Observable<Reimbursement[]> {
    return this.http.get(`${environment.URL}/reimbursement/review/` + id + '/') as Observable<Reimbursement[]>;
  }

  sendTicketReview(ticket: Reimbursement): Observable<boolean> {
    return this.http.patch(`${environment.URL}/reimbursement/`, ticket) as Observable<boolean>;
  }

}
