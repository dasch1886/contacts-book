import {Component, OnDestroy, OnInit} from '@angular/core';
import {ContactsService} from "@core/services/contacts/contacts.service";
import {Contact} from "@shared/models/contacts/contact.model";
import {ColumnsConfig} from "@modules/contacts/views/contacts/table/colums.config";
import {Subscription} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {RemoveContactDialogComponent} from "@modules/contacts/views/contacts/remove-contact-dialog/remove-contact-dialog.component";

@Component({
  selector: 'app-clients-table',
  templateUrl: './contacts-table.component.html',
  styleUrls: ['./contacts-table.component.scss']
})
export class ContactsTableComponent implements OnInit, OnDestroy {
  displayedColumns = ColumnsConfig;
  columnsKeys: string[];
  data: Contact[];
  subscription = new Subscription();

  constructor(private clientService: ContactsService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.columnsKeys = this.displayedColumns.map(el => el.key);
    this.refreshData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  refreshData() {
    this.subscription.unsubscribe();
    this.subscription.add(
      this.clientService.getClients().subscribe((data) => {
        this.data = [...data];
      })
    );
  }

  openDialog(element: Contact) {
    const dialogRef = this.dialog.open(RemoveContactDialogComponent, {
      data: {contact: element}
    });

    dialogRef.afterClosed().subscribe(result => {
      result && this.refreshData();
    });
  }
}
