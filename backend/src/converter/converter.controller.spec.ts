import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { ConverterController } from './converter.controller';
import { ConverterService } from './converter.service';

describe('ConverterController', () => {
  let app: INestApplication;
  // Create a mock object for the service
  const mockConverterService = {
    convertCode: jest.fn(),
    reviewCode: jest.fn(),
    fixBugs: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConverterController],
      providers: [
        {
          provide: ConverterService,
          useValue: mockConverterService,
        },
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /converter/translate', () => {
    it('should call convertCode and return the result', async () => {
      const payload = { code: 'console.log(1)', from: 'js', to: 'py' };
      const expectedResponse = { success: true, translatedCode: 'print(1)' };

      mockConverterService.convertCode.mockResolvedValue(expectedResponse);

      return request(app.getHttpServer())
        .post('/converter/translate')
        .send(payload)
        .expect(201)
        .expect(expectedResponse);
    });
  });

  describe('POST /converter/review', () => {
    it('should call reviewCode and return analysis', async () => {
      const payload = { code: 'const x = 1', lang: 'javascript' };
      const expectedResponse = { success: true, reviewContent: 'Looks good!' };

      mockConverterService.reviewCode.mockResolvedValue(expectedResponse);

      return request(app.getHttpServer())
        .post('/converter/review')
        .send(payload)
        .expect(201)
        .expect(expectedResponse);
    });
  });

  describe('POST /converter/fix', () => {
    it('should call fixBugs and return fixed code', async () => {
      const payload = { code: 'prnt(1)', lang: 'python' };
      const expectedResponse = { success: true, fixedCode: 'print(1)' };

      mockConverterService.fixBugs.mockResolvedValue(expectedResponse);

      return request(app.getHttpServer())
        .post('/converter/fix')
        .send(payload)
        .expect(201)
        .expect(expectedResponse);
    });
  });
});
