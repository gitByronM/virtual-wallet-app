import { Controller, Post, Put, Body, Get, Param, BadRequestException, UsePipes, ValidationPipe } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { RechargeWalletDto } from './dto/recharge-wallet.dto';

@Controller('customers')
export class CustomersController {
    constructor(private readonly customersService: CustomersService) {}

    @Post('create')
    @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    async createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
        const customer = await this.customersService.createCustomer(createCustomerDto);
        return { status: 'success', message: 'Cliente registrado exitosamente.', data: customer };
    }

    @Get(':document')
    async getCustomerByDocument(@Param('document') document: string) {
        const customer = await this.customersService.getCustomerByDocument(document);
        return { status: 'success', data: customer };
    }

    @Put('recharge')
    @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    async rechargeWallet(@Body() rechargeWalletDto: RechargeWalletDto) {
        const updatedCustomer = await this.customersService.rechargeWallet(rechargeWalletDto);
        return { status: 'success', message: 'Billetera actualizada con éxito.', data: updatedCustomer };
    }
}
