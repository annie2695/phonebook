import { IContact } from 'src/app/models/contact.model';

export const contactStub = (): IContact => ({
  displayName: 'Simba',
  phone: 5141110000,
  createdAt: new Date('2022-05-29T19:20:13.146+00:00'),
});
