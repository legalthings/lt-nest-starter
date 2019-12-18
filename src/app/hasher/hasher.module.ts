import { Module } from '@nestjs/common';
import { hasherProviders } from './hasher.providers';
import { HasherService } from './hasher.service';
import { CommonModule } from '../common/common.module';

export const HasherModuleConfig = {
  imports: [CommonModule],
  controllers: [],
  providers: [
    ...hasherProviders,
    HasherService,
  ],
  exports: [
    ...hasherProviders,
    HasherService,
  ],
};

@Module(HasherModuleConfig)
export class HasherModule { }
