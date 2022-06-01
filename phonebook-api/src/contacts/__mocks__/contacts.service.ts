import { contactStub } from '../tests/stubs/contact.stub';

export const ContactsService = jest.fn().mockReturnValue({
  create: jest.fn().mockResolvedValue(contactStub()),
  findAll: jest.fn().mockResolvedValue([contactStub()]),
});
