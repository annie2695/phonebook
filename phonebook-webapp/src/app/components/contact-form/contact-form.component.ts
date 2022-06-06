import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';

import { catchError } from 'rxjs';

import { ContactApiService } from 'src/app/services/contact-api.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent implements OnInit {
  contact!: FormGroup;

  constructor(
    private _builder: FormBuilder,
    private _service: ContactApiService
  ) {}

  ngOnInit(): void {
    this.contact = this._builder.group({
      displayName: [null, Validators.required],
      phone: [null, [Validators.required, Validators.pattern('^\\d{10}$')]],
    });
  }

  onSubmitForm(formDirective: FormGroupDirective) {
    if (this.contact.valid) {
      this._service
        .addContact(this.contact.value)
        .pipe(
          catchError((e: HttpErrorResponse) => {
            if (e.status === 409)
              this.contact.controls['displayName'].setErrors({
                alreadyExist: true,
              });

            throw e;
          })
        )
        .subscribe(() => {
          formDirective.resetForm();
          this.contact.reset({}, { emitEvent: false });

          this._service.refreshContacts.emit();
        });
    }
  }
}
