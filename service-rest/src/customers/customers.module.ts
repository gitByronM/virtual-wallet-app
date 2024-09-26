import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Customer, CustomerSchema } from 'schemas/customer.schema';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { PendingPaymentsModule } from 'pending-payments/pending-payments.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Customer.name, schema: CustomerSchema }]),
    PendingPaymentsModule,
  ],
  controllers: [CustomersController],
  providers: [CustomersService]
})
export class CustomersModule {}
