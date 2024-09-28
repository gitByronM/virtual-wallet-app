import { Controller, Post, Put, Body, Get, Param, BadRequestException, UsePipes, ValidationPipe } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { RechargeWalletDto } from './dto/recharge-wallet.dto';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { ConfirmPaymentDto } from './dto/confirm-payment.dto';
import { CheckBalanceDto } from './dto/check-balance.dto';

@Controller('customers')
export class CustomersController {
    constructor(private readonly customersService: CustomersService) {}

    @Post('create')
    @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    async createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
        const customer = await this.customersService.createCustomer(createCustomerDto);
        return { status: 'success', message: 'Cliente registrado exitosamente.' };
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
        return { status: 'success', message: 'Billetera actualizada con éxito.' };
    }

    @Post('payment')
    @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    async createPayment(@Body() createPaymentDto: CreatePaymentDto) {
        const sessionId = await this.customersService.createPayment(createPaymentDto);
        return { status: 'success', code: 200, message: 'Se ha enviado un token de confirmación a tu email.', data: sessionId };
    }

    @Post('payment/confirm')
    @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    async confirmPayment(@Body() confirmPaymentDto: ConfirmPaymentDto) {
        const customer = await this.customersService.confirmPayment(confirmPaymentDto);
        return { status: 'success', code: 200, message: 'Pago confirmado. Se ha descontado el monto de tu billetera.' };
    }

    @Post('balance')
    @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    async checkBalance(@Body() checkBalanceDto: CheckBalanceDto) {
        const balance = await this.customersService.checkBalance(checkBalanceDto);
        return { status: 'success', code: 200, message: 'Balance recuperado con éxito.', data: balance };
    }
}
