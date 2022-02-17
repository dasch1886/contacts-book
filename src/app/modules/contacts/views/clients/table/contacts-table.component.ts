import {Component, OnDestroy, OnInit} from '@angular/core';
import {ContactsService} from "@core/services/contacts/contacts.service";
import {Contact} from "@shared/models/contacts/contact.model";
import {ColumnsConfig} from "@modules/contacts/views/clients/table/colums.config";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-clients-table',
  templateUrl: './contacts-table.component.html',
  styleUrls: ['./contacts-table.component.scss']
})
export class ContactsTableComponent implements OnInit, OnDestroy {
  displayedColumns = ColumnsConfig;
  columnsKeys: string[];
  data: Contact[];
  subscription = new Subscription();

  constructor(private clientService: ContactsService) {
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
