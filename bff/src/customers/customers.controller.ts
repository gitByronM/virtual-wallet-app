import { Controller, Post, Body, UsePipes, ValidationPipe, Put } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CheckBalanceDto } from './dto/check-balance.dto';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { ConfirmPaymentDto } from './dto/confirm-payment.dto';
import { RechargeWalletDto } from './dto/recharge-wallet.dto';

@Controller('customers')
export class CustomersController {
    constructor(private readonly customersService: CustomersService) {}

    @Post('create')
    @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    async createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
        const customer = await this.customersService.createCustomer(createCustomerDto);
        return customer;
    }

    @Put('recharge')
    @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    async reloadWallet(@Body() rechargeWalletDto: RechargeWalletDto) {
        const reload = await this.customersService.rechargeWallet(rechargeWalletDto);
        return reload;
    }

    @Post('payment')
    @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    async createPayment(@Body() createPaymentDto: CreatePaymentDto) {
        const payment = await this.customersService.createPayment(createPaymentDto);
        return payment;
    }

    @Post('payment/confirm')
    @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    async confirmPayment(@Body() confirmPaymentDto: ConfirmPaymentDto) {
        const confirmation = await this.customersService.confirmPayment(confirmPaymentDto);
        return confirmation;
      }

    @Post('balance')
    @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    async checkBalance(@Body() checkBalanceDto: CheckBalanceDto) {
        const balance = await this.customersService.checkBalance(checkBalanceDto);
        return balance;
    }
}
