# CodePapi Backend

## Overview

NestJS API server that orchestrates local LLM inference via Ollama and LangChain. Provides endpoints for code translation, review, and bug detection.

**Note:** This is part of an experimental hobby project. Code quality and performance optimizations are secondary to learning and experimentation.

## Project Setup

```bash
npm install
```

## Running the Application

```bash
# Development mode
npm run start:dev

# Production mode
npm run start
```

The API runs on `http://localhost:3000`

## Endpoints

- `POST /converter/translate` — Translate code between languages
- `POST /converter/review` — Get AI feedback on code
- `POST /converter/fix` — Get AI bug fixes with diff

All requests expect JSON bodies with `code` and language parameters.

## Architecture

- **Controller:** `converter.controller.ts` — HTTP request handling
- **Service:** `converter.service.ts` — AI prompt orchestration via LangChain
- **Module:** `converter.module.ts` — Dependency injection setup

## Key Dependencies

- `@langchain/ollama` — LLM integration with Ollama
- `@nestjs/core` — Framework
- `@nestjs/common` — Common utilities

## Performance Notes

- AI responses take 10-90+ seconds depending on code size and hardware
- Requests are blocking (no queue system)
- Suitable for local development, not production use
- Single model instance (Qwen2.5-Coder)
