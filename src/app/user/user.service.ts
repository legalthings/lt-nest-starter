import { UpdateUserPayload } from './api/update-user.api';
import { AddUserPayload } from './api/add-user.api';
import { UserRepositoryService } from './user-repository.service';
import { EmitterService } from './../common/modules/emitter/emitter.service';
import { LoggerService } from './../common/modules/logger/logger.service';
import { ConfigService } from './../common/modules/config/config.service';
import { Injectable } from '@nestjs/common';
import { HasherService } from '../hasher/hasher.service';
import { UserEvents, UserEventsReturnType } from './user.events';
import { UserDocumentType, UserModel } from './models/user.model';
import { ObjectId } from 'bson';

@Injectable()
export class UserService {
  constructor(
    private readonly config: ConfigService,
    private readonly logger: LoggerService,
    private readonly hasher: HasherService,
    private readonly emitter: EmitterService<UserEventsReturnType>,
    private readonly userRepository: UserRepositoryService,
  ) { }

  async saveUser(user: UserDocumentType): Promise<UserDocumentType> {
    return await this.userRepository.save(user);
  }

  getUserById(id: string): Promise<UserDocumentType | null> {
    return this.userRepository.find({ _id: id });
  }

  getUserByEmail(email: string): Promise<UserDocumentType | null> {
    return this.userRepository.find({ email });
  }

  getUserByIdOrEmail(id: string): Promise<UserDocumentType | null> {
    if (ObjectId.isValid(id)) {
      return this.getUserById(id);
    }

    return this.getUserByEmail(id);
  }

  async addUser(data: AddUserPayload): Promise<UserDocumentType> {
    const user = await this.userRepository.new(data);
    await this.setPassword(user, data.password);

    const saved = await this.userRepository.save(user);

    this.emitter.emit(UserEvents.UserCreated, saved);

    return saved;
  }

  async updateUser(user: UserDocumentType, data: UpdateUserPayload): Promise<UserDocumentType> {
    user.setValues(data as UserModel);
    await this.setPassword(user, data.password);

    this.emitter.emit(UserEvents.UserUpdated, user);

    return await this.userRepository.save(user);
  }

  async setPassword(user: UserDocumentType, password: string) {
    if (password) {
      user.setPassword(await this.hasher.hash(password));
    }
  }

  async verifyPassword(user: UserDocumentType, password: string): Promise<boolean> {
    return this.hasher.verify(password, user.password);
  }
}
