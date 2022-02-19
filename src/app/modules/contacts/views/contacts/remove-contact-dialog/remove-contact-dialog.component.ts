import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Contact} from "@shared/models/contacts/contact.model";
import {ContactsService} from "@core/services/contacts/contacts.service";
import {ToastrService} from "ngx-toastr";
import {getFields} from "@modules/contacts/views/utils/fields";
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-remove-contact-dialog',
  templateUrl: './remove-contact-dialog.component.html',
  styleUrls: ['./remove-contact-dialog.component.scss']
})
export class RemoveContactDialogComponent implements OnInit {
  fields: {
    label: string,
    value: string
  }[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: { contact: Contact },
              private ref: MatDialogRef<RemoveContactDialogComponent>,
              private contactsService: ContactsService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.fields = getFields(this.data.contact);
  }

  remove() {
    this.contactsService.removeContact(this.data.contact.id)
      .pipe(finalize(() => this.ref.close(true)))
      .subscribe(
      () => this.toastr.warning('Usunięto kontakt!')
    )
  }
}
