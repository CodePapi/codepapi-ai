import { Controller, Post, Body } from '@nestjs/common';
import { ConverterService } from './converter.service';

@Controller('converter')
export class ConverterController {
  constructor(private readonly converterService: ConverterService) {}

  @Post('translate')
  async translate(@Body() data: { code: string; from: string; to: string }) {
    return this.converterService.convertCode(data.code, data.from, data.to);
  }

  @Post('review')
  async review(@Body() data: { code: string; lang: string }) {
    return this.converterService.reviewCode(data.code, data.lang);
  }

  @Post('fix')
  async fix(@Body() data: { code: string; lang: string }) {
    return this.converterService.fixBugs(data.code, data.lang);
  }
}