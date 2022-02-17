import {Injectable} from '@angular/core';
import {Contacts} from "@core/services/clients/contacts.mock";
import {Observable, of} from "rxjs";
import {Contact} from "@shared/models/clients/contact.model";

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  private data: Contact[] = Contacts;

  constructor() { }

  getClients(): Observable<Contact[]> {
    return of(this.data);
  }

  createContact(contact: Contact) {
    contact.id = this.data.length ? this.data[this.data.length - 1].id + 1 : 0;
    this.data.push(contact);
    return of({});
  }
}
