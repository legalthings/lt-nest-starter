import { ApiModelProperty } from '@nestjs/swagger';
import { SessionModel } from './models/session.model';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetSessionParams {
  @IsString()
  @IsNotEmpty()
  @ApiModelProperty({
    default: '000000000000000000000001'
  })
  readonly id: string;
}

export class GetSessionResponse200 extends SessionModel { }
