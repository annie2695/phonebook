import { Body, Controller, Get, Post } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { Contact } from './schemas/contact.schema';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly _service: ContactsService) {}

  @Post()
  async create(@Body() contact: CreateContactDto): Promise<Contact> {
    return await this._service.create(contact);
  }

  @Get()
  async findAll(): Promise<Contact[]> {
    return await this._service.findAll();
  }
}
