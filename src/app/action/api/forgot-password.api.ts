import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail } from 'class-validator';

export class ForgotPasswordPayload {
  @IsEmail()
  @IsNotEmpty()
  @ApiModelProperty({
    type: String,
    example: 'john@example.com'
  })
  readonly email: string;
}
