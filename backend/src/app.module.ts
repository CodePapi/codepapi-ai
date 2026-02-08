import { Module } from '@nestjs/common';
import { ConverterModule } from './converter/converter.module';

@Module({
  imports: [ConverterModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
