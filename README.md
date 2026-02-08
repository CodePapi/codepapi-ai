# CodePapi AI ⚡

> **Transform your code instantly with local AI power.** No cloud, no data leaks—just blazing-fast code translation, migration, and debugging on your machine.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Ollama](https://img.shields.io/badge/AI-Ollama-orange.svg)
![React](https://img.shields.io/badge/Frontend-React-61DAFB.svg)
![NestJS](https://img.shields.io/badge/Backend-NestJS-E0234E.svg)
![Biome](https://img.shields.io/badge/Linter-Biome-60a5fa.svg)

---

## What is CodePapi AI?

CodePapi AI is a professional, privacy-focused developer tool that brings the power of Large Language Models (LLMs) directly to your local development workflow. Whether you're translating code between languages, migrating frameworks, reviewing for security issues, or debugging complex logic—all your code stays on your machine.

### Why CodePapi AI?

✅ **100% Private** — Your code never leaves your machine  
✅ **Lightning Fast** — Runs locally on your hardware  
✅ **Free** — MIT licensed, fully open-source  
✅ **Extensible** — Add languages, frameworks, and custom prompts easily  

---

## ✨ Core Features

#### 🔄 Smart Code Translation
Effortlessly convert code between 10+ languages including JavaScript, TypeScript, Python, Go, Rust, Java, and more. The system is flexible enough to support any language you add.

#### 🚀 Framework Migration Engine
Pre-built, expert-level migration presets for common transformations:
- React Class Components → React Functional Components (with Hooks)
- JavaScript → TypeScript
- CSS → Tailwind CSS
- React → Vue.js

#### 🔍 Deep Code Review
Get AI-driven analysis of your code covering:
- Performance optimization opportunities
- Security vulnerabilities
- Best practice violations
- Code quality improvements

#### 🐞 Interactive Bug Fixer
Fix bugs with confidence. The **Diff View** shows exactly what the AI changed, side-by-side comparison so you understand every modification before accepting.

#### 🔒 Air-Gapped Privacy
Powered by **Qwen2.5-Coder** (1.5GB model) running locally through **Ollama**. Your code never touches the internet.

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

> ⚠️ **Important:** The first startup requires downloading AI models. Ensure you have a stable internet connection.

After starting the containers, pull the required models:

```bash
# Pull Qwen2.5 Coder (primary model, ~1.5GB)
docker exec ollama ollama pull qwen2.5-coder:1.5b

# Pull Phi-3 Mini (optional, ~2.3GB alternative model)
docker exec ollama ollama pull phi3:mini
```

Once the models are downloaded and containers are running:
- **🖥️ Frontend:** Open http://localhost in your browser
- **🔌 API:** Backend runs at http://localhost:3000
- **🤖 AI Engine:** Ollama API available at http://localhost:11434

---

## 💻 How to Use

1. **Paste or type your code** into the left editor
2. **Select a source language/framework** from the dropdown
3. **Choose your action:**
   - **Translate:** Pick a target language
   - **Review:** Get AI analysis (no target needed)
   - **Check Bugs:** See a diff view of fixes
4. **Click "Run AI"** and watch the magic happen
5. **Copy the result** or download your transformed code

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

Want to support more programming languages or migration presets? It's easy!

See the **[Frontend Documentation](./frontend/README.md)** for detailed instructions on adding languages to `frontend/src/constants/languages.ts`.

### Code Quality

We use **Biome** for lightning-fast linting and formatting. Before submitting a PR, run:

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
│   └── src/constants/   # Language & migration definitions
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

We welcome contributions from the community! Whether it's bug fixes, features, documentation, or translations, your help makes CodePapi AI better.

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
- **Test with the Qwen2.5-Coder model** (not a different LLM)
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
- ✨ **Features:** Language support, migration presets, new modes
- 🎨 **UI/UX:** Design improvements, accessibility

See the [Issues page](https://github.com/yourusername/codepapi-ai/issues) for tasks labeled `good first issue` and `help wanted`.

### Recognition

- All contributors are listed in `CONTRIBUTORS.md`
- Significant contributions may be highlighted in release notes
- Community members can earn roles (Maintainer, Reviewer, etc.)

---

## 🤖 Responsible AI Ethics

As an AI-powered tool, CodePapi AI follows these ethical principles:

### Privacy First
- **No telemetry:** We don't track usage or collect analytics
- **Local processing:** All code processing happens on your machine
- **No training data:** Your code is never used to train or improve models
- **GDPR compliant:** Full control over your data

### Transparency
- **Open source:** Full code transparency — inspect everything
- **Model disclosure:** We explicitly state which LLM is used (Phi-3 Mini)
- **Limitations:** We're honest about what the AI can and cannot do
- **Attribution:** AI improvements are documented and credited

### Responsible Use Guidelines

**Do:**
- ✅ Use CodePapi AI for legitimate code improvement
- ✅ Review AI suggestions before implementing
- ✅ Report security issues responsibly
- ✅ Contribute improvements back to the community

**Don't:**
- ❌ Use for malicious code generation
- ❌ Bypass security reviews using AI
- ❌ Rely solely on AI without code review
- ❌ Claim AI-generated code as entirely your own without attribution

### Security Considerations
- Always review code generated by AI before committing
- Run security scanners on translated/migrated code
- Test thoroughly in safe environments first
- Report any security concerns to [security@example.com]

---

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

- **Issues:** Report bugs on [GitHub Issues](https://github.com/yourusername/codepapi-ai/issues)
- **Discussions:** Ask questions in [GitHub Discussions](https://github.com/yourusername/codepapi-ai/discussions)
- **Docs:** Full documentation in [README files](./frontend/README.md)

---

<div align="center">

**Made with ❤️ for developers who value privacy and speed**

[⭐ Star us on GitHub](https://github.com/yourusername/codepapi-ai) • [🐛 Report a Bug](https://github.com/yourusername/codepapi-ai/issues) • [💡 Suggest a Feature](https://github.com/yourusername/codepapi-ai/discussions)

</div>
