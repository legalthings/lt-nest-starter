import { getModelForClass } from '@typegoose/typegoose';
import mongoose from 'mongoose';
import { MODEL_USER } from '../constants';
import { DB_DEFAULT_CONNECTION } from './../common/constants';
import { UserModel } from './models/user.model';

export const userProviders = [
  {
    provide: MODEL_USER,
    useFactory: (connection: mongoose.Connection) => {
      return getModelForClass(UserModel, {
        existingConnection: connection,
        schemaOptions: {
          collection: 'users',
          read: 'nearest',
          skipVersioning: true,
          versionKey: false,
        },
      });
    },
    inject: [DB_DEFAULT_CONNECTION],
  },
];
