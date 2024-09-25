import { IsString, IsEmail, IsPhoneNumber, IsNotEmpty } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty({ message: 'Document is required' })
  document: string;

  @IsString()
  @IsNotEmpty({ message: 'Names is required' })
  names: string;

  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsPhoneNumber(null, { message: 'Invalid phone number' })
  phone: string;
}
