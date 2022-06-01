import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateContactDto } from './dto/create-contact.dto';
import { Contact, ContactDocument } from './schemas/contact.schema';

/**
 * Service for retrieving Contact informations.
 */
@Injectable()
export class ContactsService {
  constructor(
    @InjectModel(Contact.name) private readonly _model: Model<ContactDocument>,
  ) {}

  /**
   * Add a Contact in the phonebook.
   *
   * @param contact Contact information to save.
   * @throws {ConflictException} on contact already exist
   * @throws {BadRequestException} Default error while saving
   * @returns the new contact entity.
   */
  async create(contact: CreateContactDto): Promise<Contact> {
    return await new this._model({ ...contact, createdAt: new Date() })
      .save()
      .catch((reason) => {
        if (reason.code === 11000)
          throw new ConflictException('The contact already exist');

        throw new BadRequestException(reason.message);
      });
  }

  /**
   * Retrieve all the contact from the phonebook.
   *
   * @returns Array of contact information.
   */
  async findAll(): Promise<Contact[]> {
    return await this._model.find().exec();
  }
}
