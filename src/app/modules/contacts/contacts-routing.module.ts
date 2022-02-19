import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContactsComponent} from "./views/contacts/contacts.component";
import {ContactsRoute} from "./views/contacts.route";
import {DetailsResolverService} from "@core/services/contacts/resolvers/details/details-resolver.service";
import {ContactDetailsComponent} from "@modules/contacts/views/contact-details/contact-details.component";
import {ContactEditComponent} from "@modules/contacts/views/contact-edit/contact-edit.component";
import {ListResolverService} from "@core/services/contacts/resolvers/list/list-resolver.service";

const routes: Routes = [
  {
    path: '',
    component: ContactsComponent,
    resolve: {
      list: ListResolverService
    }
  },
  {
    path: `${ContactsRoute.DETAILS}/:id`,
    component: ContactDetailsComponent,
    resolve: {
      details: DetailsResolverService
    }
  },
  {
    path: `${ContactsRoute.EDIT}/:id`,
    component: ContactEditComponent,
    resolve: {
      details: DetailsResolverService
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactsRoutingModule { }
