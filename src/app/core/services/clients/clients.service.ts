import { Injectable } from '@angular/core';
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
}
