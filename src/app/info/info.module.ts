import { Module } from '@nestjs/common';
import { InfoController } from './info.controller';
import { InfoService } from './info.service';
import { CommonModule } from '../common/common.module';

export const InfoModuleConfig = {
  imports: [CommonModule],
  controllers: [InfoController],
  providers: [InfoService],
};

@Module(InfoModuleConfig)
export class InfoModule { }
