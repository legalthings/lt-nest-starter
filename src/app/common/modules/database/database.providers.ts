import { DB_DEFAULT_CONNECTION } from './../../constants';
import { DatabaseService } from './database.service';

export const databaseProviders = [
  {
    provide: DB_DEFAULT_CONNECTION,
    useFactory: (database: DatabaseService) => database.connect(),
    inject: [DatabaseService],
  },
];
