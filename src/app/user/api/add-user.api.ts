import { UserApiModel } from './models/user.model';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';

export class AddUserPayload {
  @IsString()
  @IsOptional()
  @ApiModelProperty({
    type: String,
    example: 'John',
    required: false,
  })
  readonly first_name?: string;

  @IsString()
  @IsOptional()
  @ApiModelProperty({
    type: String,
    example: 'Doe',
    required: false,
  })
  readonly last_name?: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  @ApiModelProperty({
    type: String,
    example: 'john@example.com',
    required: false,
  })
  readonly email?: string;

  @IsString()
  @IsOptional()
  @ApiModelProperty({
    type: String,
    example: 'johndoe1234',
    required: false,
  })
  readonly password?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiModelProperty({
    type: String,
    example: 'response'
  })
  readonly captcha_response?: string;
}

export class AddUserResponse201 extends UserApiModel { }
