import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { IContact, ICreateContactDto } from '../models/contact.model';

/**
 * Service to get the contacts informations in the backend.
 */
@Injectable({ providedIn: 'root' })
export class ContactApiService {
  readonly API_URL = `${environment.apiUrl}/contacts`;
  refreshContacts: EventEmitter<null>;

  constructor(private _http: HttpClient) {
    this.refreshContacts = new EventEmitter();
  }

  addContact(contact: ICreateContactDto): Observable<IContact> {
    return this._http.post<IContact>(this.API_URL, contact);
  }

  getAll(): Observable<IContact[]> {
    return this._http.get<IContact[]>(this.API_URL);
  }
}
