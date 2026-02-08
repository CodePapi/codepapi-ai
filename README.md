# CodePapi AI ⚡
<img width="2960" height="1532" alt="image" src="https://github.com/user-attachments/assets/188fe9c2-60eb-4a0a-a3bb-39ad06186141" />

> **A local AI-powered code companion.** Keep your code on your machine while exploring code translation, reviews, and debugging with LLMs. A learning project exploring local AI integration in developer workflows.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-experimental-yellow.svg)
![Ollama](https://img.shields.io/badge/AI-Ollama-orange.svg)
![React](https://img.shields.io/badge/Frontend-React-61DAFB.svg)
![NestJS](https://img.shields.io/badge/Backend-NestJS-E0234E.svg)

---

## What is CodePapi AI?

CodePapi AI is an experimental, open-source project that brings Large Language Models (LLMs) to your local development environment. Translate code between languages, get AI-powered code reviews, and explore debugging workflows—all without sending your code to external services.

**Note:** This is a hobby/learning project. While functional, it's not optimized for production use. Performance depends heavily on your hardware and model choice. Expect AI responses to take 10-60+ seconds depending on code size and hardware.

### Why CodePapi AI?

✅ **Private** — Your code stays on your machine (no cloud uploads)  
✅ **Open-Source** — Inspect the full codebase  
✅ **Free** — MIT licensed, no subscriptions  
✅ **Learning Tool** — Explore local LLM integration in practice  

---

## ✨ Features

#### 🔄 Code Translation
Convert code between supported languages: JavaScript, TypeScript, Python, Go, Rust, Java, C++, PHP, Ruby, Swift, and C#. Quality depends on model accuracy and code complexity.

#### 🔍 Code Review
Get AI-generated feedback on:
- Performance optimization ideas
- Potential security issues
- Code quality observations
- Best practice suggestions

**Note:** AI suggestions should be reviewed carefully and aren't a substitute for human code review.

#### 🐞 Bug Detection
The **Diff View** shows AI-suggested fixes side-by-side with original code. Always test fixes before committing.

#### 🔒 Local Privacy
Code processing happens locally using Qwen2.5-Coder via Ollama—nothing leaves your machine.

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- [Docker & Docker Compose](https://docs.docker.com/get-docker/) (easiest way to get started)
- Alternatively: Node.js 18+ and Ollama running locally

### Installation (Docker)

```bash
# Clone the repository
git clone https://github.com/codepapi/codepapi-ai.git
cd codepapi-ai

# Start the entire stack with one command
docker-compose up -d
```

### First Launch Setup

> ⚠️ **First Run:** The first startup downloads the AI model (~1.5GB). Ensure stable internet and available disk space.

After starting the containers, pull the required model:

```bash
docker exec ollama ollama pull qwen2.5-coder:1.5b
```

**Initial Request Times:** Expect 10-90 seconds for initial responses depending on:
- Your CPU/GPU specs
- Code size
- Available system memory
- Background processes

Once the models are downloaded and containers are running:
- **🖥️ Frontend:** Open http://localhost in your browser
- **🔌 API:** Backend runs at http://localhost:3000
- **🤖 AI Engine:** Ollama API available at http://localhost:11434

---

## 💻 How to Use

1. Paste or type code into the left editor
2. Select a source language
3. Choose an action:
   - **Translate:** Pick a target language
   - **Review:** Get feedback on code
   - **Check Bugs:** See suggested fixes
4. Click "Run AI" and wait for results
5. Copy or review the output

**Tips:**
- Smaller code snippets get faster responses
- Review AI suggestions before using them in production
- Results vary based on code complexity and quality

---

## 🎬 Demo

Check out the project in action: [Watch on YouTube](https://youtu.be/-_i7vOgbwoM)

---

## 🛠 Tech Stack

| Component | Technology | Purpose |
| --- | --- | --- |
| **AI Engine** | [Ollama](https://ollama.ai/) + Qwen2.5-Coder | Local LLM inference |
| **Orchestration** | LangChain.js | AI workflow management |
| **Backend** | NestJS (Node.js) | REST API & business logic |
| **Frontend** | React + TailwindCSS + Lucide | Modern, responsive UI |
| **Editor** | Monaco Editor | VS Code-powered code editing |
| **Quality** | Biome | Fast linting & formatting |

---

## 🧑‍💻 Development

### Adding New Languages

Want to support more programming languages? It's easy!

See the **[Frontend Documentation](./frontend/README.md)** for detailed instructions on adding languages to `frontend/src/constants/languages.ts`.

### Code Quality

We use **Biome** for linting and formatting. Before submitting a PR, run:

```bash
npm run biome:lint    # Check for issues
npx @biomejs/biome check --apply .  # Auto-fix issues
```

### Project Structure

```
codepapi-ai/
├── backend/              # NestJS API server
│   └── src/converter/   # Code conversion logic
├── frontend/            # React UI application
│   └── src/constants/   # Language definitions
├── docker-compose.yml   # Full stack orchestration
└── README.md           # This file
```

---

## 📋 Code of Conduct

We are committed to providing a welcoming and inclusive environment for all contributors. Please read and follow our [Code of Conduct](./CODE_OF_CONDUCT.md):

- **Respect:** Treat all community members with respect and dignity
- **Inclusion:** Welcome contributors of all backgrounds and experience levels
- **Professionalism:** Keep discussions constructive and focused on the project
- **Accountability:** If you witness or experience misconduct, report it responsibly

Violations will not be tolerated and may result in removal from the project.

---

## 🤝 Contributing Guidelines

This is a hobby project, so keep it relaxed. Have ideas? Found a bug? Want to improve something?

- **See [CONTRIBUTING.md](./CONTRIBUTING.md)** for details on setup and submitting changes
- **Be nice:** See [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) — just basic respect

No strict requirements, no bureaucracy. Just open a PR or issue and let's build together!

---

## 🤖 Responsible AI Ethics

As an experimental AI project, CodePapi AI follows responsible practices:

### Privacy
- **No telemetry:** We don't collect usage analytics
- **Local processing:** All code stays on your machine
- **No training:** Your code never trains models

### Transparency
- **Open source:** Full code inspection available
- **Clear limitations:** We're honest about what works and what doesn't
- **No magic:** It's an AI assistant, not a replacement for human judgment

### Use Responsibly
- Review all AI suggestions before implementing
- Don't rely solely on AI output for security-critical code
- Test thoroughly in your environment
- Report security issues privately

---

## 🚨 Limitations & Known Issues

This is an experimental project with real limitations:

- **Speed:** Not fast. Responses take 10-90+ seconds per request
- **Quality:** AI output varies. Some translations work well, others need manual fixes
- **Hardware-dependent:** Performance heavily depends on your CPU/GPU and available RAM
- **Model limitations:** Qwen2.5-Coder is a smaller model; results aren't comparable to larger proprietary models
- **Error handling:** Limited error checking and validation
- **Production use:** Not suitable for mission-critical workflows without thorough testing

## � Support & Feedback

Found a bug? Have a cool idea? Just want to chat about it?

- **Issues:** Report bugs or request features
- **Discussions:** Ask questions, share ideas, get help
- **See [CONTRIBUTING.md](./CONTRIBUTING.md)** if you want to contribute code

## 🚨 Security

Found a security vulnerability? Please email [oshiesam@gmail.com] with:
- Description of the issue
- Steps to reproduce
- Potential impact

Please allow 48 hours before public disclosure.

See `frontend/README.md` for detailed customization guides.

---

## ⚠️ System Requirements

- **Docker & Docker Compose** (recommended) or
- **Node.js 18+** + **Ollama** (for local development)
- **Minimum 2GB RAM** recommended (Qwen2.5-Coder model size)
- **Stable internet** for initial model download
- **macOS, Linux, or Windows** (with WSL2)

---

## 📚 Documentation

- [Frontend Guide](./frontend/README.md) — UI customization and adding languages
- [Backend Guide](./backend/README.md) — API development and extending converters
- [Docker Compose Configuration](./docker-compose.yml) — Service orchestration

---

## 📄 License

Distributed under the **MIT License**. See [LICENSE](./LICENSE) for details.

---

## 💬 Support

- **Report bugs:** GitHub Issues
- **Ask questions:** GitHub Discussions  
- **Documentation:** [CONTRIBUTING.md](./CONTRIBUTING.md), [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md)

---

<div align="center">

**A learning project exploring local LLMs in development workflows**

[⭐ GitHub](https://github.com/codepapi/codepapi-ai) • [🐛 Issues](https://github.com/codepapi/codepapi-ai/issues) • [💬 Discussions](https://github.com/codepapi/codepapi-ai/discussions)

</div>
