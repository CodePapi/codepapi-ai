import { ChatOllama } from '@langchain/ollama';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class ConverterService {
  private model: ChatOllama;

  constructor() {
    this.model = new ChatOllama({
      baseUrl: process.env.OLLAMA_URL || 'http://localhost:11434',
      model: 'phi3:mini',
    });
  }

  // --- 1. CODE TRANSLATION ---
  async convertCode(code: string, from: string, to: string) {
    const prompt = `
    You are an expert software architect specializing in code translation.
    Task: Convert the input from ${from} to ${to}.

    RULES:
    - Return ONLY raw code.
    - No markdown blocks.
    - Maintain variable names and logic flow.

    SOURCE CODE:
    ${code}
  `;
    return this.executeInvoke(prompt, 'translatedCode');
  }

  // --- 2. CODE REVIEWER ---
  async reviewCode(code: string, lang: string) {
    const prompt = `
      You are a Senior Software Engineer. Review the following ${lang} code.
      Check for: Performance, Security vulnerabilities, and Best Practices.
      RULES:
      - Provide a concise list of improvements.
      - Use professional, constructive language.
      - Use Markdown for formatting.
      CODE:
      ${code}
    `;
    return this.executeInvoke(prompt, 'reviewContent');
  }

  // --- 3. BUG FIXER ---
  async fixBugs(code: string, lang: string) {
    const prompt = `
      You are a debugging expert. Analyze and fix the bugs in this ${lang} code.
      RULES:
      - Return the fixed code first.
      - Follow the code with a brief "Explanation of Fixes" section.
      - Do not use markdown fences for the code part.
      CODE:
      ${code}
    `;
    return this.executeInvoke(prompt, 'fixedCode');
  }

  // Private helper to avoid repeating try/catch blocks
  private async executeInvoke(prompt: string, key: string) {
    try {
      const response = await this.model.invoke(prompt);
      return {
        success: true,
        [key]: response.content,
      };
    } catch (error) {
      console.error('AI Service Error:', error);
      throw new InternalServerErrorException('Failed to connect to AI engine');
    }
  }
}
