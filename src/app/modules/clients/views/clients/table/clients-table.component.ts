import {Component, OnDestroy, OnInit} from '@angular/core';
import {ClientsService} from "@core/services/clients/clients.service";
import {Contact} from "@shared/models/clients/contact.model";
import {ColumnsConfig} from "@modules/clients/views/clients/table/colums.config";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-clients-table',
  templateUrl: './clients-table.component.html',
  styleUrls: ['./clients-table.component.scss']
})
export class ClientsTableComponent implements OnInit, OnDestroy {
  displayedColumns = ColumnsConfig;
  columnsKeys: string[];
  data: Contact[];
  subscription = new Subscription();

  constructor(private clientService: ClientsService) {
  }

  ngOnInit(): void {
    this.columnsKeys = this.displayedColumns.map(el => el.key);
    this.refreshData();
  }

  refreshData() {
    this.subscription.unsubscribe();
    this.subscription.add(
      this.clientService.getClients().subscribe((data) => {
        this.data = [...data];
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
