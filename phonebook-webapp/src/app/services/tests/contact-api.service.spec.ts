import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { IContact } from 'src/app/models/contact.model';
import { ContactApiService } from '../contact-api.service';
import { contactStub } from './stubs/contact.stub';

describe('ContactApiService', () => {
  let httpMock: HttpTestingController;
  let service: ContactApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ContactApiService],
    });

    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ContactApiService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('GET contacts', () => {
    it('should retrieve contacts', () => {
      const dummyContacts: IContact[] = [contactStub()];

      service.getAll().subscribe((contacts) => {
        expect(contacts.length).toBe(1);
        expect(contacts).toEqual(dummyContacts);
      });

      const request = httpMock.expectOne(`${service.API_URL}/contacts`);
      expect(request.request.method).toBe('GET');
      request.flush(dummyContacts);
    });
  });
});
