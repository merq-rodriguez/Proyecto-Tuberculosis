import { IConnection, createPool, IConnectionConfig } from 'mysql';
import { Config } from '../../config/config';

export const databaseProviders = [
  {
    provide: 'DbConnection',
    useFactory: async (): Promise<IConnection> => {
      return await createPool(Config.DB as IConnectionConfig);
    }
  }
];