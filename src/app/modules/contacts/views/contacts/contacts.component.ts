import {Component, ViewChild} from '@angular/core';
import {ContactsTableComponent} from "@modules/contacts/views/contacts/table/contacts-table.component";
import {MatDialog} from "@angular/material/dialog";
import {AddContactDialogComponent} from "@modules/contacts/views/contacts/add-contact-dialog/add-contact-dialog.component";

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent {

  @ViewChild(ContactsTableComponent) table: ContactsTableComponent;

  constructor(private dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(AddContactDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      result && this.table.refreshData();
    });
  }
}
