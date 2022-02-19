import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppRoute} from "./app.route";

const routes: Routes = [
  {
    path: '',
    redirectTo: AppRoute.CONTACTS,
    pathMatch: 'full'
  },
  {
    path: AppRoute.CONTACTS,
    loadChildren: () => import('@modules/contacts/contacts.module').then((m) => m.ContactsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
