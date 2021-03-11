import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Reimbursement } from 'src/app/models/reimbursement.model';
import { NavBarService } from '../../navigation/NavService/nav-bar.service';
import { ViewTicketsService } from '../ViewTicketsService/view-tickets.service';

@Component({
  selector: 'app-view-tickets',
  templateUrl: './view-tickets.component.html',
  styleUrls: ['./view-tickets.component.css']
})
export class ViewTicketsComponent implements OnInit {
  hide: boolean = false;
  showErrorMessage: boolean = false;
  ticketList: Reimbursement[];
  modalDesc: string = "";
  modalId: number = 0;

  constructor(private viewTicketsService: ViewTicketsService, private cookieService : CookieService, private navBarService: NavBarService) { }

  ngOnInit(): void {
    this.navBarService.isLoggedIn();
    if (<number><unknown>this.cookieService.get("role") == 1) this.navBarService.isFinancialManager();
    this.viewTicketsService.getTicketsExceptById(<number><unknown>this.cookieService.get("id")).subscribe(
      (response: Reimbursement[]) => {
        if (response !== null) {
          this.ticketList = response;
          this.showErrorMessage = false;
        } else {
          this.showErrorMessage = true;
        }          
      },(error: any) => {
        this.showErrorMessage = true;
        console.log(error);
      });
  }

  setModalText(ticket: Reimbursement): void {
    this.modalId = ticket.reimbId;
    this.modalDesc = ticket.description;
  }

}
