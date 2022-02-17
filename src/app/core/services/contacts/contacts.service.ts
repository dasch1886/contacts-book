import {Injectable} from '@angular/core';
import {Contacts} from "@core/services/contacts/contacts.mock";
import {Observable, of} from "rxjs";
import {Contact} from "@shared/models/contacts/contact.model";

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private data: Contact[] = Contacts;

  constructor() { }

  getContacts(): Observable<Contact[]> {
    return of(this.data);
  }

  getContactDetails(id: number) {
    return of(this.data.find((contact) => contact.id === id));
  }

  createContact(contact: Contact) {
    contact.id = this.data.length ? this.data[this.data.length - 1].id + 1 : 0;
    this.data.push(contact);
    return of({});
  }

  removeContact(id: number) {
    this.data = this.data.filter((contact) => contact.id !== id);
    return of({});
  }
}
