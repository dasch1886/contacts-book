import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ContactsService} from "@core/services/contacts/contacts.service";
import {ToastrService} from "ngx-toastr";
import {Subscription} from "rxjs";
import {ColumnsConfig} from "@modules/contacts/views/contacts/table/colums.config";
import {GenderEnum} from "@shared/enums/gender.enum";

@Component({
  selector: 'app-add-contact-dialog',
  templateUrl: './add-contact-dialog.component.html',
  styleUrls: ['./add-contact-dialog.component.scss']
})
export class AddContactDialogComponent implements OnInit, OnDestroy {
  fields = ColumnsConfig;
  genderEnum = GenderEnum;
  form: FormGroup;
  subscription = new Subscription();

  constructor(private fb: FormBuilder,
              private contactsService: ContactsService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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
    this.subscription.add(
      this.contactsService.createContact(this.form.value).subscribe(
        () => this.toastr.success('Dodano kontakt!')
      )
    );
  }
}
