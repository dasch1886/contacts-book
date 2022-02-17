import {Component, ViewChild} from '@angular/core';
import {ClientsTableComponent} from "@modules/clients/views/clients/table/clients-table.component";
import {MatDialog} from "@angular/material/dialog";
import {AddClientDialogComponent} from "@modules/clients/views/clients/add-client-dialog/add-client-dialog.component";

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent {

  @ViewChild(ClientsTableComponent) table: ClientsTableComponent;

  constructor(private dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(AddClientDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      result && this.table.refreshData();
    })
  }
}
