import { BadRequestException, ConflictException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { connect, Connection, Model } from 'mongoose';
import { ContactsService } from '../contacts.service';
import { Contact, ContactSchema } from '../schemas/contact.schema';
import { tooLongPhoneStub, tooShortPhoneStub } from './stubs/bad-contact.stub';
import { contactStub, createContactDtoStub } from './stubs/contact.stub';

describe('ContactsService', () => {
  let service: ContactsService;

  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let contactModel: Model<Contact>;

  beforeAll(async () => {
    // Create and connect to MongoDB server
    mongod = await MongoMemoryServer.create();
    mongoConnection = (await connect(mongod.getUri())).connection;
    contactModel = mongoConnection.model(Contact.name, ContactSchema);
  });

  afterAll(async () => {
    // Close the connection to mongo server after all test
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongod.stop();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContactsService,
        // Provide Contact schema model
        { provide: getModelToken(Contact.name), useValue: contactModel },
      ],
    }).compile();

    service = module.get<ContactsService>(ContactsService);
  });

  afterEach(async () => {
    // Clear all entries in the db after each steps
    const collections = mongoConnection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create function', () => {
    it('should return the saved object', async () => {
      const contact: Contact = await service.create(createContactDtoStub());

      expect(contact.displayName).toBe(createContactDtoStub().displayName);
      expect(contact.phone).toBe(createContactDtoStub().phone);
      expect(contact.createdAt).toBeDefined();
    });

    it('should throw ConflitException on already exist contact', async () => {
      await new contactModel(contactStub()).save();

      await expect(service.create(createContactDtoStub())).rejects.toThrow(
        ConflictException,
      );
    });

    it('should throw BadRequestException on phone validation not respected', async () => {
      await new contactModel(contactStub()).save();

      await expect(service.create(tooLongPhoneStub())).rejects.toThrow(
        BadRequestException,
      );

      await expect(service.create(tooShortPhoneStub())).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('findAll function', () => {
    it('should return an array of Contact', async () => {
      await new contactModel(contactStub()).save();

      const contacts: Contact[] = await service.findAll();
      expect(contacts.length).toBe(1);
      expect(contacts).toMatchObject([contactStub()]);
    });

    it('should return [] if empty', async () => {
      const contacts: Contact[] = await service.findAll();

      expect(contacts).toBeDefined();
      expect(contacts.length).toBe(0);
      expect(contacts).toMatchObject([]);
    });
  });
});
