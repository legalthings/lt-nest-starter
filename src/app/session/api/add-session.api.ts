import { ApiModelProperty } from '@nestjs/swagger';
import { SessionModel } from './models/session.model';
import { IsString, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';

export class AddSessionPayload {
  @IsEmail()
  @IsNotEmpty()
  @ApiModelProperty({
    type: String,
    example: 'john@example.com'
  })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @ApiModelProperty({
    type: String,
    example: 'johndoe1234'
  })
  readonly password: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiModelProperty({
    type: String,
    example: 'response'
  })
  readonly captcha_response?: string;
}

export class AddSessionResponse201 extends SessionModel { }
