import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { CheckBalanceDto } from './dto/check-balance.dto';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { ConfirmPaymentDto } from './dto/confirm-payment.dto';
import { RechargeWalletDto } from './dto/recharge-wallet.dto';

@Injectable()
export class CustomersService {
    private readonly baseUrl = process.env.SERVICE_REST_URL;

    async createCustomer(createCustomerDto: CreateCustomerDto) {
        const {data: response} = await axios.post(`${this.baseUrl}/customers/create`, createCustomerDto);
        return response;
    }

    async rechargeWallet(rechargeWalletDto: RechargeWalletDto) {
        const {data: response} = await axios.put(`${this.baseUrl}/customers/recharge`, rechargeWalletDto);
        return response;
    }     

    async createPayment(createPaymentDto: CreatePaymentDto): Promise<any> {
        const {data: response} = await axios.post(`${this.baseUrl}/customers/payment`, createPaymentDto);
        return response;
    }

    async confirmPayment(confirmPaymentDto: ConfirmPaymentDto): Promise<any> {
        const {data: response} = await axios.post(`${this.baseUrl}/customers/payment/confirm`, confirmPaymentDto);
        return response;
    }

    async checkBalance(checkBalanceDto: CheckBalanceDto): Promise<any> {
        const {data: response} = await axios.post(`${this.baseUrl}/customers/balance`, checkBalanceDto);
        return response;
    }
}
