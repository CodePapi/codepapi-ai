import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ChatOllama } from '@langchain/ollama';

@Injectable()
export class ConverterService {
  private model: ChatOllama;

  constructor() {
    this.model = new ChatOllama({
      baseUrl: process.env.OLLAMA_URL || 'http://localhost:11434',
      model: 'qwen2.5-coder:1.5b', // Lightweight and efficient for code translation
    });
  }

  async convertCode(code: string, from: string, to: string) {
    const prompt = `
      You are a high-performance code translation engine.
      Translate the following ${from} code into ${to}.
      
      RULES:
      - Return ONLY the raw code. 
      - Do not include markdown code blocks (\`\`\`), code fences, backticks that are not part of the original code.
      - Do not include explanations or comments like "Here is your code" unless it was in the original code.
      - Maintain logic and variable names exactly.
      
      SOURCE CODE:
      ${code}
    `;

    try {
      const response = await this.model.invoke(prompt);
      return { 
        success: true, 
        translatedCode: response.content 
      };
    } catch (error) {
        console.error('Error during code conversion:', error);
      throw new InternalServerErrorException('Failed to connect to AI engine');
    }
  }
}