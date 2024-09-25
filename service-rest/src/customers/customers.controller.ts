import { Controller, Post, Body, Get, Param, BadRequestException, UsePipes, ValidationPipe } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Controller('customers')
export class CustomersController {
    constructor(private readonly customersService: CustomersService) {}

    @Post('create')
    @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    async createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
        const customer = await this.customersService.createCustomer(createCustomerDto);
        return { status: 'success', data: customer };
    }

    @Get(':document')
    async getCustomerByDocument(@Param('document') document: string) {
        const customer = await this.customersService.getCustomerByDocument(document);
        return { status: 'success', data: customer };
    }
}
