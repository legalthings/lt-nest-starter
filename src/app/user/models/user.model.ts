import { prop, DocumentType, ReturnModelType } from '@typegoose/typegoose';
import { UserRoleEnum } from '../enums/role.enum';

export type UserDocumentType = DocumentType<UserModel>;
export type UserReturnModelType = ReturnModelType<typeof UserModel>;

export class UserModel {
  @prop({ default: '' })
  readonly first_name: string;

  @prop({ default: '' })
  readonly last_name: string;

  @prop({ required: true, lowercase: true })
  readonly email: string;

  @prop()
  readonly password?: string;

  @prop({ required: true, default: [UserRoleEnum.User] })
  readonly roles: string[];

  @prop({ default: 0 })
  readonly login_attempts: number;

  initialize(this: Mod.Writeable<UserDocumentType>): UserDocumentType {
    return this;
  }

  is(this: Mod.Writeable<UserDocumentType>, user: UserDocumentType | string): boolean {
    const current = (String)(this._id);
    return current === user as string ||
      current === (String)((user as UserDocumentType)._id);
  }

  getName() {
    return `${this.first_name} ${this.last_name}`;
  }

  setPassword(this: Mod.Writeable<UserModel>, password: string) {
    this.password = password;
  }

  attemptLogin(this: Mod.Writeable<UserModel>): boolean {
    return ++this.login_attempts > 3;
  }

  clearLoginAttempts(this: Mod.Writeable<UserModel>): void {
    this.login_attempts = 0;
  }

  addRole(this: Mod.Writeable<UserModel>, roles: UserRoleEnum[]) {
    this.roles = Array.from(new Set([...this.roles, ...roles]));
  }

  hasRole(roles: UserRoleEnum[]) {
    return roles.find((role) => this.roles.includes(role));
  }

  setValues(this: Mod.Writeable<UserModel>, user: Partial<UserModel>) {
    const data = Object.assign({}, user) as Mod.Writeable<UserModel>;

    delete data.password;

    Object.assign(this, data);
  }

  toJSON() {
    const data = Object.assign({}, (this as any)._doc) as Mod.Writeable<UserDocumentType>;

    data.id = data._id;
    delete data._id;
    delete data.password;
    delete data.login_attempts;

    return data;
  }
}
