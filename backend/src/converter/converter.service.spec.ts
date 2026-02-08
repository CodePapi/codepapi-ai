import { Test, TestingModule } from '@nestjs/testing';
import { ConverterService } from './converter.service';
import { ChatOllama } from '@langchain/ollama';
import { InternalServerErrorException } from '@nestjs/common';

// Mock the LangChain Ollama module
jest.mock('@langchain/ollama', () => {
  return {
    ChatOllama: jest.fn().mockImplementation(() => {
      return {
        invoke: jest.fn(),
      };
    }),
  };
});

describe('ConverterService', () => {
  let service: ConverterService;
  let mockModel: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConverterService],
    }).compile();

    service = module.get<ConverterService>(ConverterService);
    // Access the private model to mock its invoke method
    mockModel = (service as any).model;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('convertCode', () => {
    it('should return translated code on success', async () => {
      const mockResponse = { content: 'print("hello")' };
      mockModel.invoke.mockResolvedValue(mockResponse);

      const result = await service.convertCode('console.log("hello")', 'js', 'python');

      expect(result).toEqual({
        success: true,
        translatedCode: 'print("hello")',
      });
      expect(mockModel.invoke).toHaveBeenCalledWith(expect.stringContaining('Convert the input from js to python'));
    });
  });

  describe('reviewCode', () => {
    it('should return review content on success', async () => {
      const mockResponse = { content: '- Use const instead of let' };
      mockModel.invoke.mockResolvedValue(mockResponse);

      const result = await service.reviewCode('let x = 10', 'javascript');

      expect(result).toEqual({
        success: true,
        reviewContent: '- Use const instead of let',
      });
      expect(mockModel.invoke).toHaveBeenCalledWith(expect.stringContaining('Review the following javascript code'));
    });
  });

  describe('fixBugs', () => {
    it('should return fixed code and explanation', async () => {
      const mockResponse = { content: 'Fixed Code\nExplanation: removed error' };
      mockModel.invoke.mockResolvedValue(mockResponse);

      const result = await service.fixBugs('erroneous code', 'typescript');

      expect(result).toEqual({
        success: true,
        fixedCode: 'Fixed Code\nExplanation: removed error',
      });
    });
  });

  describe('executeInvoke (Error Handling)', () => {
    it('should throw InternalServerErrorException if the AI model fails', async () => {
      mockModel.invoke.mockRejectedValue(new Error('Connection refused'));

      await expect(service.convertCode('...', 'js', 'py')).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});