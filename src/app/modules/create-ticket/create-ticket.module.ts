import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { FormsModule, FormGroup, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [CreateTicketComponent],
  imports: [
    CommonModule,
    FormsModule, 
    FormGroup, 
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CreateTicketModule { }
