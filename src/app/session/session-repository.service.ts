import { Injectable, Inject } from '@nestjs/common';
import { MODEL_SESSION } from '../constants';
import { SessionModel, SessionDocumentType, SessionReturnModelType } from './models/session.model';

@Injectable()
export class SessionRepositoryService {
  constructor(
    @Inject(MODEL_SESSION)
    private readonly model: SessionReturnModelType,
  ) { }

  new(data: Partial<SessionModel>): SessionDocumentType {
    return new this.model(data).initialize();
  }

  async save(session: SessionDocumentType): Promise<SessionDocumentType> {
    return (await session.save())
      .populate('user')
      .execPopulate();
  }

  async delete(filter: any): Promise<boolean> {
    const result = await this.model.deleteOne(filter);
    return Boolean(result.ok);
  }

  async find(filter: any): Promise<SessionDocumentType> {
    const result = await this.model.findOne(filter)
      .populate('user');

    return result && result.initialize();
  }

  async findAll(
    filter: any,
    sort: any = {},
    limit: number | string = 25,
    skip: number | string = 0
  ): Promise<SessionDocumentType[]> {
    const result = await this.model.find(filter)
      .populate('user')
      .sort(sort)
      .limit(Number(limit))
      .skip(Number(skip));

    return result.map((item) => item.initialize());
  }

  async count(filter: any): Promise<number> {
    return await this.model.countDocuments(filter);
  }
}
