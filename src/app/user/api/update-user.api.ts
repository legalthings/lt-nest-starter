import { UserApiModel } from './models/user.model';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsEmail, IsNotEmpty, IsEnum } from 'class-validator';

export class UpdateUserParams {
  @IsString()
  @IsOptional()
  @ApiModelProperty({
    default: '000000000000000000000001'
  })
  readonly id: string;
}

export class UpdateUserPayload {
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
  @IsNotEmpty()
  @IsOptional()
  @ApiModelProperty({
    type: String,
    example: 'johndoe1234',
    required: false,
  })
  readonly password?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiModelProperty({
    type: String,
    example: 'johndoe1234',
    required: false,
  })
  readonly old_password?: string;
}

export class UpdateUserResponse200 extends UserApiModel { }
