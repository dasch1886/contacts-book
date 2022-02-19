import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ContactsRoute} from "@modules/contacts/views/contacts.route";
import {getFields} from "@modules/contacts/views/utils/fields";

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit {
  fields: {
    label: string,
    value: string
  }[];

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({details}) => {
      this.fields = getFields(details);
    });
  }

  goToClients() {
    this.router.navigate([`${ContactsRoute.BASE}`]);
  }

}
