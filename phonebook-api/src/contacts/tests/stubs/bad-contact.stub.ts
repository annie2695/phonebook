import { CreateContactDto } from 'src/contacts/dto/create-contact.dto';

export const tooLongPhoneStub = (): CreateContactDto => ({
  displayName: 'Simba',
  phone: 5141110000222,
});

export const tooShortPhoneStub = (): CreateContactDto => ({
  displayName: 'Simba',
  phone: 514111,
});
