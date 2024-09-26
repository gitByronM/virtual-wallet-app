import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer, CustomerDocument } from 'schemas/customer.schema';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { RechargeWalletDto } from './dto/recharge-wallet.dto';

@Injectable()
export class CustomersService {
    constructor(@InjectModel(Customer.name) private customerModel: Model<CustomerDocument>) {}

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
}
