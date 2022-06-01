import { CreateContactDto } from 'src/contacts/dto/create-contact.dto';
import { Contact } from 'src/contacts/schemas/contact.schema';

export const createContactDtoStub = (): CreateContactDto => ({
  displayName: 'Simba',
  phone: 5141110000,
});

export const contactStub = (): Contact => ({
  displayName: 'Simba',
  phone: 5141110000,
  createdAt: new Date('2022-05-29T19:20:13.146+00:00'),
});
