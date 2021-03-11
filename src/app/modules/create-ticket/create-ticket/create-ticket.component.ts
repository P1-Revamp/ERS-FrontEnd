import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, Type, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { CookieService } from 'ngx-cookie-service';
import { NewReimbursement } from 'src/app/models/new-reimbursement.model';
import { Roles } from 'src/app/models/roles.model';
import { Status } from 'src/app/models/status.model';
import { Types } from 'src/app/models/types.model';
import { User } from 'src/app/models/user.model';
import { NavBarService } from '../../navigation/NavService/nav-bar.service';
import { CreateTicketService } from '../CreateTicketService/create-ticket.service';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.css']
})
export class CreateTicketComponent implements OnInit {
  faEdit = faEdit;

  ticketForm: FormGroup;
  amount: number;
  type: number;
  description: string;
  // message: string = "";
  // messageError: string = "";
  showSuccessMessage: boolean = false;
  showErrorMessage: boolean = false;
  showAmountErrorMessage: boolean = false;
  showOtherErrorMessage: boolean = false;

  @ViewChild('amountEntered') amountInput;
  @ViewChild('descriptionEntered') descriptionInput;

  constructor(private navBarService: NavBarService, private cookieService: CookieService, private router: Router, private createTicketService: CreateTicketService) { }

  ngOnInit(): void {
    this.navBarService.isLoggedIn();
    if (<number><unknown>this.cookieService.get("role") == 1) this.navBarService.isFinancialManager();
    this.ticketForm = new FormGroup({
      amount: new FormControl('', { validators: [Validators.required] }),
      type: new FormControl('', { validators: [Validators.required] }),
      description: new FormControl('', { validators: [Validators.required] }),
    });
  }

  createTicket(event: any) {
    this.amount = event.target.amount.value;
    this.type = event.target.type.value;
    this.description = event.target.description.value;

    // console.log(event.target.amount);
    // console.log(event.target.amount.value);
    // console.log(typeof this.amount);

    // if (typeof this.amount == typeof 1) console.log("Is a number");
    // if (typeof this.amount == typeof "string") console.log("Is a String");
    // if (typeof this.amount == typeof Number) console.log("Is a number");

    if (<string><unknown>this.amount == "") {
      this.showAmountErrorMessage = true;
      this.showErrorMessage = false;
      this.showSuccessMessage = false;
      this.showOtherErrorMessage = false;
    } else if (this.type == 4 && this.description == "") {
      this.showOtherErrorMessage = true;
    } else {
      let newTicket: NewReimbursement = new NewReimbursement(<number>this.amount, this.description, new User(<number><unknown>this.cookieService.get("id"), "", "", "", "", "", new Roles(0, "")), new Status(1, "pending"), new Types(this.type, ""));

      this.createTicketService.createTicket(newTicket).subscribe(
        (response: boolean) => {

          if (response) {
            this.showSuccessMessage = true;
            this.showErrorMessage = false;
            this.showAmountErrorMessage = false;
            this.showOtherErrorMessage = false;
          } else {
            this.showErrorMessage = true;
            this.showSuccessMessage = false;
            this.showAmountErrorMessage = false;
            this.showOtherErrorMessage = false;
          }
        }, (error: any) => {
            this.showErrorMessage = true;
            this.showSuccessMessage = false;
            this.showAmountErrorMessage = false;
            this.showOtherErrorMessage = false;
            console.log(error);
          });

      // console.log(this.amount);
      // console.log(this.type);
      // console.log(this.description);

      this.amountInput.nativeElement.value = "";
      this.descriptionInput.nativeElement.value = "";

      // this.message = "Ticket Successfully Created";
    }

   
  }
}
