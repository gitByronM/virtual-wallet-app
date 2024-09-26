import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CustomerDocument = Customer & Document & {
  _id: Types.ObjectId;
};

@Schema()
export class Customer {
  @Prop({ required: true })
  document: string;

  @Prop({ required: true })
  names: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ default: 0 })
  balance: number;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
