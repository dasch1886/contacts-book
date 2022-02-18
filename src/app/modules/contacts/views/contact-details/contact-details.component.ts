import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Contact} from "@shared/models/contacts/contact.model";
import {ColumnsConfig} from "@modules/contacts/views/contacts/table/colums.config";
import {ContactsRoute} from "@modules/contacts/views/contacts.route";

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit {
  fields: {[key: string]: string};
  contact: Contact;

  constructor(private act: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.setFields();
    this.act.data.subscribe(({details}) => {
      this.contact = details;
    });
  }

  setFields() {
    this.fields = ColumnsConfig.reduce((acc, el) => {
      return {
        ...acc,
        [el.key]: el.header
      }
    }, {});
  }

  goToClients() {
    this.router.navigate([`${ContactsRoute.BASE}`]);
  }

}
