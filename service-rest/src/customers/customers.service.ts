import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer, CustomerDocument } from 'src/schemas/customer.schema';
import { CreateCustomerDto } from './dto/create-customer.dto';

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
}
