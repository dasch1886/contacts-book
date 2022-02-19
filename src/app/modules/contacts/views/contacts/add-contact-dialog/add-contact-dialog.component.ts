import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ContactsService} from "@core/services/contacts/contacts.service";
import {ToastrService} from "ngx-toastr";
import {ColumnsConfig} from "@modules/contacts/views/contacts/table/colums.config";
import {GenderEnum} from "@shared/enums/gender.enum";
import {MatDialogRef} from "@angular/material/dialog";
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-add-contact-dialog',
  templateUrl: './add-contact-dialog.component.html',
  styleUrls: ['./add-contact-dialog.component.scss']
})
export class AddContactDialogComponent implements OnInit {
  fields = ColumnsConfig.filter(el => el.key !== 'actions');
  genderEnum = GenderEnum;
  form: FormGroup;

  constructor(private fb: FormBuilder,
              private ref: MatDialogRef<AddContactDialogComponent>,
              private contactsService: ContactsService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      nickname: ['', [Validators.required, Validators.maxLength(24)]],
      name: ['', [Validators.required, Validators.maxLength(24)]],
      surname: ['', [Validators.required, Validators.maxLength(24)]],
      email: ['', [Validators.required, Validators.maxLength(32)]],
      phone: ['', [Validators.required, Validators.maxLength(12)]],
      gender: ['', [Validators.required]],
    });
  }

  createContact() {
    this.contactsService.createContact(this.form.value)
      .pipe(finalize(() => this.ref.close(true)))
      .subscribe(
        () => this.toastr.success('Dodano kontakt!')
      );
  }
}
