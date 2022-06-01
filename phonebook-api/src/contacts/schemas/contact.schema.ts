import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/**
 * Schema of MongoDB Contact collection.
 */
@Schema()
export class Contact {
  @Prop({ required: true })
  createdAt: Date;

  @Prop({ required: true, unique: true })
  displayName: string;

  @Prop({
    required: true,
    validate: {
      validator: (p) => /^\d{10}$/.test(p),
      message: 'Phone number must be 10 digit.',
    },
  })
  phone: number;
}

export type ContactDocument = Contact & Document;

export const ContactSchema = SchemaFactory.createForClass(Contact);
