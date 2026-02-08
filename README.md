# CodePapi AI ⚡

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

We welcome contributions! This is a learning/hobby project, so contributions can range from bug fixes and feature ideas to documentation and testing.

### Important Notes

- **This is experimental code.** Don't expect production-grade stability
- **Limitations are intentional** — helps us learn and improve
- **AI suggestions need review** — this tool augments, not replaces, human developers

### Getting Started

1. **Check existing issues and PRs** to avoid duplicate work
2. **Fork** the repository and clone it locally
3. **Create a feature branch** with a descriptive name:
   ```bash
   git checkout -b feature/add-kotlin-support
   # or
   git checkout -b fix/console-error-on-large-files
   ```

### Development Setup

```bash
# Install dependencies
cd backend && npm install && cd ..
cd frontend && npm install && cd ..

# Start development environment
docker-compose up -d

# Or run services individually with npm
npm run dev  # in both backend/ and frontend/
```

### Code Standards

#### Style & Formatting
- **Linter:** We use **Biome** for all TypeScript/JavaScript code
- **Before every commit, run:**
  ```bash
  npx @biomejs/biome check --apply .
  ```
- **No manual formatting** — let Biome handle it
- **Line length:** Maximum 100 characters (Biome enforces this)

#### Git Commits
- **Commit messages** should be clear and descriptive:
  ```
  ✨ feat: add support for Kotlin language
  🐛 fix: resolve console error on large file uploads
  📝 docs: update contributing guidelines
  ♻️ refactor: simplify code translation logic
  ```
- **Prefix types:** `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `perf`
- **Keep commits atomic** — one logical change per commit
- **Reference issues:** `Closes #123` in commit body when applicable

#### Pull Requests
- **Title:** Use the same format as commits (e.g., `feat: add Kotlin support`)
- **Description:** Explain *why* the change is needed, not just *what*
- **Linked issues:** Reference any related issues (`Fixes #123`)
- **Testing:** Include steps to test your changes
- **Screenshots:** For UI changes, include before/after screenshots
- **No WIP PRs:** Only open PRs when ready for review

### Code Quality Checklist

Before submitting a PR, ensure:

- ✅ Code passes `npm run biome:lint` without warnings
- ✅ All tests pass (if applicable)
- ✅ No console errors or warnings in development
- ✅ Comments explain *why*, not *what* (code should be self-documenting)
- ✅ No commented-out code left behind
- ✅ Variable/function names are descriptive and follow conventions
- ✅ No hardcoded values (use constants/config instead)
- ✅ Security: No credentials, secrets, or sensitive data exposed
- ✅ TypeScript: Avoid `any` types; use proper typing
- ✅ Documentation: Update README/docs if behavior changes

### Adding Features

#### New Languages or Migration Presets
1. Update `frontend/src/constants/languages.ts` with new entries
2. Add corresponding backend logic in `backend/src/converter/converter.service.ts` if needed
3. Test end-to-end with the UI
4. Update `frontend/README.md` if adding complex metadata

#### Bug Fixes
1. Add a test case that reproduces the bug (if possible)
2. Fix the issue
3. Verify the test now passes
4. Check for related issues that might have the same root cause

#### Documentation
1. Keep docs synchronized with code changes
2. Add examples for complex features
3. Update the main README if adding major functionality

### Testing

While formal unit tests are encouraged:
- **Manual testing** is acceptable for UI changes
- **Test in Docker** to ensure consistency across environments
- **Test with the Qwen2.5-Coder model**
- **Document test steps** in your PR

### Review Process

1. **Automated checks** run on all PRs (Biome linting)
2. **Code review:** At least one maintainer must approve
3. **Feedback:** Be open to suggestions and iterate
4. **Approval:** Once approved, you may merge (or request maintainer to merge)
5. **Closed PRs:** If inactive for 30 days, may be closed to keep backlog clean

### Areas We Need Help With

- 🌍 **Translations:** UI language support
- 🧪 **Testing:** Test coverage and edge cases
- 📚 **Documentation:** Guides, tutorials, examples
- 🐛 **Bug fixes:** Active issues on GitHub
- ✨ **Features:** Language support, new modes
- 🎨 **UI/UX:** Design improvements, accessibility

See the [Issues page](https://github.com/codepapi/codepapi-ai/issues) for tasks labeled `good first issue` and `help wanted`.

### Recognition

- All contributors are listed in `CONTRIBUTORS.md`
- Significant contributions may be highlighted in release notes
- Community members can earn roles (Maintainer, Reviewer, etc.)

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

## 🚨 Reporting Issues & Security

### Bug Reports
- **Use the bug report template** provided in GitHub Issues
- **Include reproduction steps** and expected vs. actual behavior
- **Environment info:** OS, Docker version, any custom configs
- **No duplicate reports:** Search existing issues first

### Security Vulnerabilities
- **Don't open public issues** for security vulnerabilities
- **Email us privately:** [security@example.com]
- **Include:** Version, reproduction steps, and potential impact
- **Responsible disclosure:** Allow 48 hours before public disclosure

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

- **Issues:** Report bugs on [GitHub Issues](https://github.com/codepapi/codepapi-ai/issues)
- **Discussions:** Ask questions in [GitHub Discussions](https://github.com/codepapi/codepapi-ai/discussions)
- **Docs:** Full documentation in [README files](./frontend/README.md)

---

<div align="center">

**A learning project exploring local LLMs in development workflows**

[⭐ Star us on GitHub](https://github.com/codepapi/codepapi-ai) • [🐛 Report a Bug](https://github.com/codepapi/codepapi-ai/issues) • [💡 Suggest a Feature](https://github.com/codepapi/codepapi-ai/discussions)

</div>
