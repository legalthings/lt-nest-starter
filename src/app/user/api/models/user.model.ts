import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { UserModel as User } from '../../models/user.model';

export class UserApiModel extends User {
  @ApiModelProperty({
    type: String,
    example: '000000000000000000000001'
  })
  readonly id: string;

  @ApiModelProperty({
    type: String,
    example: 'John'
  })
  readonly first_name: string;

  @ApiModelProperty({
    type: String,
    example: 'Doe'
  })
  readonly last_name: string;

  @ApiModelProperty({
    type: String,
    example: 'john@example.com'
  })
  readonly email: string;

  @ApiModelProperty({
    isArray: true,
    type: Array,
    example: ['user']
  })
  readonly roles: string[];
}
