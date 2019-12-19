import { Module } from '@nestjs/common';
import { filesystemProviders } from './filesystem.providers';
import { FilesystemService } from './filesystem.service';

export const FilesystemModuleConfig = {
  imports: [],
  controllers: [],
  providers: [
    FilesystemService,
    ...filesystemProviders,
  ],
  exports: [
    FilesystemService,
    ...filesystemProviders,
  ],
};

@Module(FilesystemModuleConfig)
export class FilesystemModule { }
