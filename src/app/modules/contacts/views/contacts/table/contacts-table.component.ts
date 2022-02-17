import {Component, OnDestroy, OnInit} from '@angular/core';
import {ContactsService} from "@core/services/contacts/contacts.service";
import {Contact} from "@shared/models/contacts/contact.model";
import {ColumnsConfig} from "@modules/contacts/views/contacts/table/colums.config";
import {Subscription} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {RemoveContactDialogComponent} from "@modules/contacts/views/contacts/remove-contact-dialog/remove-contact-dialog.component";
import {Router} from "@angular/router";
import {ContactsRoute} from "@modules/contacts/views/contacts.route";

@Component({
  selector: 'app-contacts-table',
  templateUrl: './contacts-table.component.html',
  styleUrls: ['./contacts-table.component.scss']
})
export class ContactsTableComponent implements OnInit, OnDestroy {
  displayedColumns = ColumnsConfig;
  columnsKeys: string[];
  data: Contact[];
  subscription = new Subscription();

  constructor(private contactsService: ContactsService,
              private dialog: MatDialog,
              private router: Router) {
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
      this.contactsService.getContacts().subscribe((data) => {
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

  goToDetails(id: number) {
    this.router.navigate([`${ContactsRoute.BASE}/${ContactsRoute.DETAILS}`, id]);
  }
}
