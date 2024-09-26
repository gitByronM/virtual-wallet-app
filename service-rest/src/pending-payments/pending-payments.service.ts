// src/pending-payments/pending-payments.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { PendingPayment, PendingPaymentDocument } from 'schemas/pending-payment.schema';

@Injectable()
export class PendingPaymentsService {
  constructor(@InjectModel(PendingPayment.name) private pendingPaymentModel: Model<PendingPaymentDocument>) {}

  async createPendingPayment(
    customerId: Types.ObjectId,
    amount: number,
    token: string,
    sessionId: string,
  ): Promise<PendingPayment> {
    const pendingPayment = new this.pendingPaymentModel({
      customerId,
      amount,
      token,
      sessionId,
    });

    return pendingPayment.save();
  }

  async findPendingPayment(
    customerId: Types.ObjectId,
    token: string,
    sessionId: string,
  ): Promise<PendingPayment> {
    const payment = await this.pendingPaymentModel.findOne({ customerId, token, sessionId }).exec();

    if (!payment) {
      throw new NotFoundException('No se encontro un pago pendiente para el usuario.');
    }
    
    return payment;
  }

  async deletePendingPayment(token: string): Promise<void> {
    await this.pendingPaymentModel.deleteOne({ token }).exec();
  }
}
