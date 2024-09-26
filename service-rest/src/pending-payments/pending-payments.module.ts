import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PendingPaymentsService } from './pending-payments.service';
import { PendingPayment, PendingPaymentSchema } from 'schemas/pending-payment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PendingPayment.name, schema: PendingPaymentSchema }]),
  ],
  providers: [PendingPaymentsService],
  exports: [PendingPaymentsService],
})
export class PendingPaymentsModule {}
