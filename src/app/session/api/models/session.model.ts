import { UserApiModel } from './../../../user/api/models/user.model';
import { UserModel } from './../../../user/models/user.model';
import { ApiModelProperty } from '@nestjs/swagger';
import { SessionModel as Session } from '../../models/session.model';

export class SessionModel extends Session {
  @ApiModelProperty({
    type: String,
    example: '000000000000000000000001'
  })
  readonly id: string;

  @ApiModelProperty({
    type: String,
    example: '2019-01-01T00:00:00'
  })
  readonly created: Date;

  @ApiModelProperty({
    type: UserApiModel
  })
  readonly user: UserModel;
}
