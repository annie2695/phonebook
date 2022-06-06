import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  AbstractControl,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
} from '@angular/forms';

import { ContactFormComponent } from './contact-form.component';

describe('ContactFormComponent', () => {
  let component: ContactFormComponent;
  let fixture: ComponentFixture<ContactFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactFormComponent],
      imports: [ReactiveFormsModule, FormsModule, HttpClientModule],
    }).compileComponents();

    // create component and test fixture
    fixture = TestBed.createComponent(ContactFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be invalid when empty', () => {
    expect(component.contact.valid).toBeFalsy();
  });

  describe('display name field validity', () => {
    it('should be required', () => {
      let displayName = component.contact.controls['displayName'];
      let errors = displayName.errors || {};

      expect(displayName.valid).toBeFalsy();
      expect(errors['required']).toBeTruthy();

      displayName.setValue('Simba');
      errors = displayName.errors || {};

      expect(errors['displayName']).toBeFalsy();
    });
  });

  describe('phone field', () => {
    let phone: AbstractControl;
    let errors: ValidationErrors;

    beforeEach(() => {
      phone = component.contact.controls['phone'];
      errors = phone.errors || {};
    });

    it('should be required', () => {
      expect(phone.valid).toBeFalsy();
      expect(errors['required']).toBeTruthy();

      phone.setValue(5141112222);
      errors = phone.errors || {};

      expect(errors['phone']).toBeFalsy();
    });

    it('should be 10 digits', () => {
      phone.setValue(514);
      expect(phone.valid).toBeFalsy();

      phone.setValue(51411122222);
      expect(phone.valid).toBeFalsy();

      phone.setValue('(514)111-2222');
      expect(phone.valid).toBeFalsy();

      phone.setValue('5141112222');
      expect(phone.valid).toBeTruthy();
    });
  });
});
