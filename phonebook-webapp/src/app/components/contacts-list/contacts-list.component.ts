import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription, take } from 'rxjs';

import { IContact } from 'src/app/models/contact.model';
import { ContactApiService } from 'src/app/services/contact-api.service';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.scss'],
})
export class ContactsListComponent implements OnInit, OnDestroy {
  contacts!: IContact[];
  displayedColumns: string[] = ['displayName', 'phone', 'createdAt'];
  private refreshSubscription: Subscription;

  constructor(private _service: ContactApiService) {
    this.refreshSubscription = this._service.refreshContacts.subscribe(() => {
      this.getContacts();
    });
  }

  ngOnInit(): void {
    this.getContacts();
  }

  ngOnDestroy(): void {
    this.refreshSubscription.unsubscribe();
  }

  private getContacts() {
    this._service
      .getAll()
      .pipe(take(1))
      .subscribe((result) => {
        this.contacts = result;
      });
  }
}
