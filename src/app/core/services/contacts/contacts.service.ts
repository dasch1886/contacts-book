import {Injectable} from '@angular/core';
import {Contacts} from "@core/services/contacts/contacts.mock";
import {Observable, of} from "rxjs";
import {Contact} from "@shared/models/contacts/contact.model";
import {delay} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private data: Contact[] = Contacts;
  private readonly delayTime = 500;

  constructor() {}

  getContacts(): Observable<Contact[]> {
    return of(this.data).pipe(delay(this.delayTime));
  }

  getContactDetails(id: number) {
    return of(this.data.find((contact) => contact.id === id))
      .pipe(delay(this.delayTime));
  }

  createContact(contact: Contact) {
    contact.id = this.data.length ? this.data[this.data.length - 1].id + 1 : 0;
    this.data.push(contact);
    return of({}).pipe(delay(this.delayTime));
  }

  editContact(contact: Contact) {
    const index = this.data.findIndex((el) => el.id === contact.id);
    this.data[index] = contact;
    return of({}).pipe(delay(this.delayTime));
  }

  removeContact(id: number) {
    this.data = this.data.filter((contact) => contact.id !== id);
    return of({}).pipe(delay(this.delayTime));
  }
}
