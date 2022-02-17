import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppRoute} from "./app.route";

const routes: Routes = [
  {
    path: '',
    redirectTo: AppRoute.CLIENTS,
    pathMatch: 'full'
  },
  {
    path: AppRoute.CLIENTS,
    loadChildren: () => import('@modules/contacts/contacts.module').then((m) => m.ContactsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
