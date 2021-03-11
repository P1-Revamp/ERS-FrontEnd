import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Reimbursement } from 'src/app/models/reimbursement.model';
import { Roles } from 'src/app/models/roles.model';
import { Status } from 'src/app/models/status.model';
import { User } from 'src/app/models/user.model';
import { NavBarService } from '../../navigation/NavService/nav-bar.service';
import { ReviewTicketsService } from '../ReviewTicketsService/review-tickets.service';

@Component({
  selector: 'app-review-tickets',
  templateUrl: './review-tickets.component.html',
  styleUrls: ['./review-tickets.component.css']
})
export class ReviewTicketsComponent implements OnInit {
  ticketList: Reimbursement[];
  filter: number;

  reviewForm: FormGroup;
  descriptionModalDesc: string = "";
  descriptionModalId: number = 0;
  reviewModalId: number = 0;
  ticketUnderReview: Reimbursement;

  statusId: number;

  showTicketSuccessMessage: boolean = false;
  showTicketErrorMessage: boolean = false;
  showErrorMessage: boolean = false;

  constructor(private reviewTicketService: ReviewTicketsService, private cookieService : CookieService, private navBarService: NavBarService, private router: Router) { }

  ngOnInit(): void {
    this.navBarService.isLoggedIn();
    if (<number><unknown>this.cookieService.get("role") == 1) this.navBarService.isFinancialManager();
    this.filter = <number><unknown>this.cookieService.get("filter");
    this.reviewTicketService.getTicketsExceptById(<number><unknown>this.cookieService.get("id")).subscribe(
      (response: Reimbursement[]) => {
        this.ticketList = response;
      }, (error: any) => {
        this.showErrorMessage = true;
        console.log(error);
      });

    this.reviewForm = new FormGroup({
      statusId: new FormControl('', { validators: [Validators.required] }),
    })
  }

  reviewTicket(event: any, ticket: Reimbursement) {
    let newStatus: Status;
    if(<number><unknown>event.target.review.value == 2) {
      newStatus = new Status(<number><unknown>event.target.review.value, "approved");
    } else {
      newStatus = new Status(<number><unknown>event.target.review.value, "denied");
    }

    ticket.status = newStatus;
    ticket.resolver = new User(<number><unknown>this.cookieService.get("id"),"", "", "", "", "", new Roles(1, ""));

    document.getElementById("reviewModal").click();

    this.reviewTicketService.sendTicketReview(ticket).subscribe(
      (response: boolean) => {
        if (response) {
          this.showTicketSuccessMessage = true;
          this.showTicketErrorMessage = false;
          this.showErrorMessage = false;
        } else {
          this.showTicketErrorMessage = true;
          this.showErrorMessage = false;
          this.showTicketSuccessMessage = false;
        }
      }, (error: any) => {
        this.showErrorMessage = true;
        this.showTicketErrorMessage = false;
        this.showTicketSuccessMessage = false;
        console.log(error);
      });
  }

  setFilter(status: number): void {
      this.filter = status;
  }

  setDescriptionModalText(ticket: Reimbursement): void {
    this.descriptionModalId = ticket.reimbId;
    this.descriptionModalDesc = ticket.description;
  }
  
  setReviewModalText(ticket: Reimbursement): void {
    this.reviewModalId = ticket.reimbId;
    this.ticketUnderReview = ticket;
  }
}
