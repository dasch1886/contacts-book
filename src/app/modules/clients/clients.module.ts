import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsComponent } from './views/clients/clients.component';
import {ClientsRoutingModule} from "./clients-routing.module";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { ClientsTableComponent } from './views/clients/table/clients-table.component';

@NgModule({
  declarations: [
    ClientsComponent,
    ClientsTableComponent
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class ClientsModule { }
