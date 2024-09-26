import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PendingPaymentDocument = PendingPayment & Document;

@Schema({ timestamps: true })
export class PendingPayment {
  @Prop({ type: Types.ObjectId, ref: 'Customer', required: true })
  customerId: Types.ObjectId;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  token: string;

  @Prop({ required: true })
  sessionId: string;

  @Prop({ default: Date.now, expires: 3600 })
  createdAt: Date;
}


export const PendingPaymentSchema = SchemaFactory.createForClass(PendingPayment);
