import {Component, OnInit} from '@angular/core';
import {ContactsService} from "@core/services/contacts/contacts.service";
import {Contact} from "@shared/models/contacts/contact.model";
import {ColumnsConfig} from "@modules/contacts/views/contacts/table/colums.config";
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
export class ContactsTableComponent implements OnInit {
  columns = ColumnsConfig;
  columnsKeys = ColumnsConfig.map(el => el.key);
  data: Contact[];

  constructor(private activatedRoute: ActivatedRoute,
              private toastr: ToastrService,
              private contactsService: ContactsService,
              private dialog: MatDialog,
              private router: Router) {
  }

  ngOnInit() {
    this.initData();
  }

  initData() {
    this.activatedRoute.data.subscribe(
      ({list}) => this.onDataResponse(list),
      (err) => this.onDataError(err)
    );
  }

  refreshData() {
    this.contactsService.getContacts().subscribe(
      (data) => this.onDataResponse(data),
      (err) => this.onDataError(err));
  }

  onDataResponse(data: Contact[]) {
    this.data = [...data];
  }

  onDataError(err: any) {
    this.toastr.error(err);
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
