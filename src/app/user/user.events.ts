import { UserDocumentType } from './models/user.model';

export interface UserEventsReturnType {
  UserCreated: UserDocumentType;
  UserUpdated: UserDocumentType;
}

export const UserEvents: { [P in keyof UserEventsReturnType]: P } = {
  UserCreated: 'UserCreated',
  UserUpdated: 'UserUpdated',
};
