import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreatePaymentDto {
  @IsString()
  @IsNotEmpty({ message: 'Document is required' })
  document: string;

  @IsString()
  @IsNotEmpty({ message: 'Phone number is required' })
  phone: string;

  @IsNumber()
  @Min(1, { message: 'Amount must be at least 1' })
  amount: number;
}
