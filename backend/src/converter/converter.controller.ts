import { Controller, Post, Body } from '@nestjs/common';
import { ConverterService } from './converter.service';

@Controller('converter')
export class ConverterController {
  constructor(private readonly converterService: ConverterService) {}

  @Post('translate')
  async translate(
    @Body() data: { code: string; from: string; to: string }
  ) {
    return this.converterService.convertCode(data.code, data.from, data.to);
  }
}