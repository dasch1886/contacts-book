import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClientsComponent} from "./views/clients/clients.component";
import {ClientsRoute} from "./views/clients.route";

const routes: Routes = [
  {
    path: '',
    component: ClientsComponent
  },
  {
    path: ClientsRoute.DETAILS,
  },
  {
    path: ClientsRoute.EDIT,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientsRoutingModule { }
