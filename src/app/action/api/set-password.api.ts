import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class SetPasswordPayload {
  @IsString()
  @IsNotEmpty()
  @ApiModelProperty({
    type: String,
    example: 'johndoe1234'
  })
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  @ApiModelProperty({
    default: 'token'
  })
  readonly token: string;
}
