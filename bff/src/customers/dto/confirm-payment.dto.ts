import { IsString, IsNotEmpty } from 'class-validator';

export class ConfirmPaymentDto {
  @IsString()
  @IsNotEmpty({ message: 'Session ID is required' })
  sessionId: string;

  @IsString()
  @IsNotEmpty({ message: 'Token is required' })
  token: string;

  @IsString()
  @IsNotEmpty({ message: 'Document is required' })
  document: string;

  @IsString()
  @IsNotEmpty({ message: 'Phone number is required' })
  phone: string;
}

