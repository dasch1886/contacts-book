import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {ContactsService} from "@core/services/contacts/contacts.service";
import {Contact} from '@shared/models/contacts/contact.model';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DetailsResolverService implements Resolve<Observable<Contact | undefined>> {

  constructor(private contactsService: ContactsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Contact | undefined> {
    return this.contactsService.getContactDetails(+route.params['id']);
  }
}
