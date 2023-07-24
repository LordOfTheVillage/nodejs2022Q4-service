import { Global, Module } from '@nestjs/common';
import { StoreService } from './services/store.service';

// @Global()
@Module({
  providers: [StoreService],
  exports: [StoreService],
})
export class StoreModule {}
