import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsComponent } from './views/clients/contacts.component';
import {ContactsRoutingModule} from "./contacts-routing.module";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { ContactsTableComponent } from './views/clients/table/contacts-table.component';
import { AddContactDialogComponent } from './views/clients/add-client-dialog/add-contact-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    ContactsComponent,
    ContactsTableComponent,
    AddContactDialogComponent
  ],
  imports: [
    CommonModule,
    ContactsRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ContactsModule { }
