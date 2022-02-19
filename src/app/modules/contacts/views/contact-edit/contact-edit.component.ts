import {Component, OnInit} from '@angular/core';
import {ColumnsConfig} from "@modules/contacts/views/contacts/table/colums.config";
import {GenderEnum} from "@shared/enums/gender.enum";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ContactsService} from "@core/services/contacts/contacts.service";
import {ToastrService} from "ngx-toastr";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {Contact} from "@shared/models/contacts/contact.model";
import {ContactsRoute} from "@modules/contacts/views/contacts.route";

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss']
})
export class ContactEditComponent implements OnInit {
  fields = ColumnsConfig;
  genderEnum = GenderEnum;
  form: FormGroup;
  id: number;
  subscription = new Subscription();

  constructor(private fb: FormBuilder,
              private contactsService: ContactsService,
              private toastr: ToastrService,
              private act: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.act.data.subscribe(({details}) => {
      this.id = +details.id;
      this.createForm(details);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  createForm(contact: Contact) {
    this.form = this.fb.group({
      nickname: [contact.nickname, [Validators.required, Validators.maxLength(24)]],
      name: [contact.name, [Validators.required, Validators.maxLength(24)]],
      surname: [contact.surname, [Validators.required, Validators.maxLength(24)]],
      email: [contact.email, [Validators.required, Validators.maxLength(32)]],
      phone: [contact.phone, [Validators.required, Validators.maxLength(12)]],
      gender: [contact.gender, [Validators.required]],
    });
  }

  editContact() {
    this.subscription.add(
      this.contactsService.editContact({id: this.id, ...this.form.value}).subscribe(
        () => {
          this.goToClients();
          this.toastr.success('Kontakt edytowany!');
        }
      )
    );
  }

  goToClients() {
    this.router.navigate([`${ContactsRoute.BASE}`]);
  }
}
