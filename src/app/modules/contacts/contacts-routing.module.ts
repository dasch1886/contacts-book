import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContactsComponent} from "./views/clients/contacts.component";
import {ContactsRoute} from "./views/contacts.route";

const routes: Routes = [
  {
    path: '',
    component: ContactsComponent
  },
  {
    path: ContactsRoute.DETAILS,
  },
  {
    path: ContactsRoute.EDIT,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactsRoutingModule { }
