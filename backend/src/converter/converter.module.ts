import { Module } from '@nestjs/common';
import { ConverterController } from './converter.controller';
import { ConverterService } from './converter.service';

@Module({
  providers: [ConverterService],
  controllers: [ConverterController],
})
export class ConverterModule {}
