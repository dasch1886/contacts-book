import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContactsComponent} from "./views/contacts/contacts.component";
import {ContactsRoute} from "./views/contacts.route";
import {DetailsResolverService} from "@core/services/contacts/resolvers/details/details-resolver.service";
import {ContactDetailsComponent} from "@modules/contacts/views/contact-details/contact-details.component";

const routes: Routes = [
  {
    path: '',
    component: ContactsComponent
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
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactsRoutingModule { }
