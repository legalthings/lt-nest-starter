import { LoggerService } from './../common/modules/logger/logger.service';
import { ConfigService } from './../common/modules/config/config.service';
import { UserReturnModelType, UserDocumentType, UserModel } from './models/user.model';
import { Injectable, Inject } from '@nestjs/common';
import { MODEL_USER } from '../constants';

@Injectable()
export class UserRepositoryService {
  constructor(
    private readonly config: ConfigService,
    private readonly logger: LoggerService,
    @Inject(MODEL_USER)
    private readonly model: UserReturnModelType,
  ) { }

  new(data: Partial<UserModel>): UserDocumentType {
    return new this.model(data).initialize();
  }

  async save(team: UserDocumentType): Promise<UserDocumentType> {
    return await team.save();
  }

  async find(filter: any): Promise<UserDocumentType> {
    const result = await this.model.findOne(filter);

    return result && result.initialize();
  }

  async findAll(
    filter: any,
    sort: any = {},
    limit: number | string = 25,
    skip: number | string = 0
  ): Promise<UserDocumentType[]> {
    const result = await this.model.find(filter)
      .sort(sort)
      .limit(Number(limit))
      .skip(Number(skip));

    return result.map((item) => item.initialize());
  }

  async count(filter: any): Promise<number> {
    return await this.model.countDocuments(filter);
  }
}
