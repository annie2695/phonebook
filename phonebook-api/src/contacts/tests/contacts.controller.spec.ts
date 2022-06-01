import { Test, TestingModule } from '@nestjs/testing';
import { ContactsController } from '../contacts.controller';
import { ContactsService } from '../contacts.service';
import { CreateContactDto } from '../dto/create-contact.dto';
import { Contact } from '../schemas/contact.schema';
import { contactStub } from './stubs/contact.stub';

jest.mock('../contacts.service.ts');

describe('ContactsController', () => {
  let controller: ContactsController;
  let service: ContactsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactsController],
      providers: [ContactsService],
    }).compile();

    controller = module.get<ContactsController>(ContactsController);
    service = module.get<ContactsService>(ContactsService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    let contact: Contact;
    let createDto: CreateContactDto;

    beforeEach(async () => {
      createDto = {
        displayName: contactStub().displayName,
        phone: contactStub().phone,
      };

      contact = await controller.create(createDto);
    });

    it('should call ContactService', () => {
      expect(service.create).toHaveBeenCalledWith(createDto);
    });

    it('should return a contact', () => {
      expect(contact).toEqual(contactStub());
    });
  });

  describe('findAll', () => {
    let contacts: Contact[];

    beforeEach(async () => {
      contacts = await controller.findAll();
    });

    it('should call ContactService', () => {
      expect(service.findAll).toHaveBeenCalled();
    });

    it('should return contacts', () => {
      expect(contacts).toEqual([contactStub()]);
    });
  });
});
