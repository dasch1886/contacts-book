import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {ContactsService} from "@core/services/contacts/contacts.service";
import {Contact} from '@shared/models/contacts/contact.model';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ListResolverService implements Resolve<Observable<Contact[]>> {

  constructor(private contactsService: ContactsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Contact[]> {
    return this.contactsService.getContacts();
  }
}
