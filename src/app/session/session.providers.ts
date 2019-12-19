import { getModelForClass } from '@typegoose/typegoose';
import { MODEL_SESSION } from '../constants';
import { DB_DEFAULT_CONNECTION } from './../common/constants';
import { SessionModel } from './models/session.model';
import mongoose from 'mongoose';

export const sessionProviders = [
  {
    provide: MODEL_SESSION,
    useFactory: (connection: mongoose.Connection) => {
      return getModelForClass(SessionModel, {
        existingConnection: connection,
        schemaOptions: {
          collection: 'sessions',
          read: 'nearest',
          skipVersioning: true,
          versionKey: false,
        },
      });
    },
    inject: [DB_DEFAULT_CONNECTION],
  },
];
