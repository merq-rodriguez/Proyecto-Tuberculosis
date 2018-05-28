import { Module, Global } from '@nestjs/common';
import { databaseProviders } from './database.provider';

@Global()
@Module({
  components: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}