import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewTicketsComponent } from './review-tickets/review-tickets.component';
import { TicketFilterComponent } from './ticket-filter/ticket-filter.component';



@NgModule({
  declarations: [ReviewTicketsComponent, TicketFilterComponent],
  imports: [
    CommonModule
  ]
})
export class ReviewTicketsModule { }
