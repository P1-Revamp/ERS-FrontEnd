import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reimbursement } from 'src/app/models/reimbursement.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ViewTicketsService {

  constructor(private http: HttpClient) { }

  getTicketsExceptById(id: number): Observable<Reimbursement[]> {
    
    return this.http.get(`${environment.URL}/reimbursement/` + id + '/') as Observable<Reimbursement[]>;

  }
}
