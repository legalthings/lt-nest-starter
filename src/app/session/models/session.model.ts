import { UserModel } from './../../user/models/user.model';
import { prop, DocumentType, ReturnModelType, Ref } from '@typegoose/typegoose';
import nanoid from 'nanoid';

export type SessionDocumentType = DocumentType<SessionModel>;
export type SessionReturnModelType = ReturnModelType<typeof SessionModel>;

export class SessionModel {
  @prop({ default: nanoid })
  readonly _id: string;

  @prop({ required: true, default: Date.now, expires: '24h' })
  readonly created: Date;

  @prop({ required: true, ref: UserModel })
  readonly user: Ref<UserModel>;

  initialize(this: Mod.Writeable<SessionDocumentType>): SessionDocumentType {
    return this;
  }

  toJSON() {
    const data = Object.assign({}, (this as any)._doc) as Mod.Writeable<SessionDocumentType>;

    data.id = data._id;
    delete data._id;

    return data;
  }
}
