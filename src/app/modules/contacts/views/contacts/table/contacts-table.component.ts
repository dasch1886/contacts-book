import {Component, OnDestroy, OnInit} from '@angular/core';
import {ContactsService} from "@core/services/contacts/contacts.service";
import {Contact} from "@shared/models/contacts/contact.model";
import {ColumnsConfig} from "@modules/contacts/views/contacts/table/colums.config";
import {Subscription} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {RemoveContactDialogComponent} from "@modules/contacts/views/contacts/remove-contact-dialog/remove-contact-dialog.component";
import {ActivatedRoute, Router} from "@angular/router";
import {ContactsRoute} from "@modules/contacts/views/contacts.route";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-contacts-table',
  templateUrl: './contacts-table.component.html',
  styleUrls: ['./contacts-table.component.scss']
})
export class ContactsTableComponent implements OnInit, OnDestroy {
  columns = ColumnsConfig;
  columnsKeys = ColumnsConfig.map(el => el.key);
  data: Contact[];
  subscription = new Subscription();

  constructor(private activatedRoute: ActivatedRoute,
              private toastr: ToastrService,
              private contactsService: ContactsService,
              private dialog: MatDialog,
              private router: Router) {
  }

  ngOnInit() {
    this.initData();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  initData() {
    this.activatedRoute.data.subscribe(
      ({list}) => {
        this.data = [...list];
      },
      (err) => {
        this.toastr.error(err);
      }
    );
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

  goToEdit(id: number) {
    this.router.navigate([`${ContactsRoute.BASE}/${ContactsRoute.EDIT}`, id]);
  }
}
