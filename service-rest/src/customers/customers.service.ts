import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer, CustomerDocument } from 'schemas/customer.schema';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { RechargeWalletDto } from './dto/recharge-wallet.dto';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { ConfirmPaymentDto } from './dto/confirm-payment.dto';
import { v4 as uuidv4 } from 'uuid';
import { MailerService } from '@nestjs-modules/mailer';
import { PendingPaymentsService } from 'pending-payments/pending-payments.service';
import { CheckBalanceDto } from './dto/check-balance.dto';

@Injectable()
export class CustomersService {
   constructor(
        @InjectModel(Customer.name) private customerModel: Model<CustomerDocument>,
        private readonly pendingPaymentsService: PendingPaymentsService,
        private mailerService: MailerService 
    ) {}

    async createCustomer(createCustomerDto: CreateCustomerDto): Promise<Customer> {
        const { document, phone } = createCustomerDto;
        const existingCustomer = await this.customerModel.findOne({ $or: [{ document }, { phone } ] }).exec();
    
        if (existingCustomer) {
          throw new ConflictException('Ya existe un cliente con este celular o documento.');
        }
    
        const newCustomer = new this.customerModel(createCustomerDto);
        return newCustomer.save();
    }

    async getCustomerByDocument(document: string): Promise<Customer> {
        const customer = await this.customerModel.findOne({ document }).exec();

        if (!customer) {
            throw new NotFoundException(`Cliente con documento ${document} no encontrado`);
        }

        return customer;
    }

    async rechargeWallet(rechargeWalletDto: RechargeWalletDto): Promise<Customer> {
        const { document, phone, amount } = rechargeWalletDto;
    
        const customer = await this.customerModel.findOne({ document, phone }).exec();
    
        if (!customer) {
          throw new NotFoundException('No se encontro ningun cliente para el documento y numero dado.');
        }

        customer.balance += amount;
    
        return customer.save();
    }

    async createPayment(createPaymentDto: CreatePaymentDto): Promise<{ sessionId: string }> {
        const { document, phone, amount } = createPaymentDto;
        const customer = await this.customerModel.findOne({ document, phone }).exec();

        if (!customer) {
            throw new NotFoundException('Cliente no encontrado.');
        }

        if (customer.balance < amount) {
            throw new BadRequestException('Balance insuficiente.');
        }

        const token = uuidv4().substring(0, 6);
        const sessionId = uuidv4();

        await this.pendingPaymentsService.createPendingPayment(customer._id, amount, token, sessionId);

        await this.mailerService.sendMail({
            to: customer.email,
            subject: 'Token de confirmación de pago',
            text: `Tu token de confirmación de pago es: ${token}`,
        });

        return { sessionId };
    }

    async confirmPayment(confirmPaymentDto: ConfirmPaymentDto): Promise<Customer> {
        const { document, phone, token, sessionId } = confirmPaymentDto;
    
        const customer = await this.customerModel.findOne({ document, phone }).exec();
        if (!customer) {
          throw new NotFoundException('Cliente no encontrado.');
        }
    
        const pendingPayment = await this.pendingPaymentsService.findPendingPayment(customer._id, token, sessionId);
    
        if (customer.balance < pendingPayment.amount) {
          throw new BadRequestException('Balance insuficiente.');
        }
    
        customer.balance -= pendingPayment.amount;
    
        await this.pendingPaymentsService.deletePendingPayment(token);
    
        return customer.save();
    }

    async checkBalance(checkBalanceDto: CheckBalanceDto): Promise<{ balance: number }> {
        const { document, phone } = checkBalanceDto;
    
        const customer = await this.customerModel.findOne({ document, phone }).exec();
        if (!customer) {
          throw new NotFoundException('Cliente no encontrado.');
        }
    
        return { balance: customer.balance };
      }
}
