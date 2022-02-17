import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Contact} from "@shared/models/contacts/contact.model";
import {ColumnsConfig} from "@modules/contacts/views/contacts/table/colums.config";
import {ContactsService} from "@core/services/contacts/contacts.service";
import {ToastrService} from "ngx-toastr";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-remove-contact-dialog',
  templateUrl: './remove-contact-dialog.component.html',
  styleUrls: ['./remove-contact-dialog.component.scss']
})
export class RemoveContactDialogComponent implements OnInit, OnDestroy {
  fields: {[key: string]: string};
  subscription = new Subscription();

  constructor(@Inject(MAT_DIALOG_DATA) public data: { contact: Contact },
              private contactsService: ContactsService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.setFields();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  setFields() {
    this.fields = ColumnsConfig.reduce((acc, el) => {
      return {
        ...acc,
        [el.key]: el.header
      }
    }, {});
  }

  remove() {
    this.subscription.add(
      this.contactsService.removeContact(this.data.contact.id).subscribe(
        () => this.toastr.warning('Usunięto kontakt!')
      )
    )
  }
}
