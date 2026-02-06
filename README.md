```markdown
# CodePapi AI ⚡

**CodePapi AI** is a professional, privacy-focused developer utility that brings the power of LLMs to your local workflow. Translate code from any language to another, migrate frameworks, reviews codes, and debug logic—all without your data ever leaving your machine.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Ollama](https://img.shields.io/badge/AI-Ollama-orange.svg)
![React](https://img.shields.io/badge/Frontend-React-61DAFB.svg)
![NestJS](https://img.shields.io/badge/Backend-NestJS-E0234E.svg)
![Biome](https://img.shields.io/badge/Linter-Biome-60a5fa.svg)

---

## 📺 Demo

https://github.com/user-attachments/assets/00000000-0000-0000-0000-000000000000

---

## ✨ Features

- 🔄 **Smart Translation**: Seamlessly convert code between 10+ languages (Go, Rust, Python, TS, etc., flexible enough to support more languages).
- 🚀 **Migration Engine**: Expert-level presets for:
    - React Class Components ➡️ Functional Components
    - JavaScript ➡️ TypeScript
    - CSS ➡️ Tailwind CSS
    - React ➡️ Vue
- 🔍 **Deep Code Review**: AI-driven analysis of performance, security, and best practices.
- 🐞 **Interactive Bug Fixer**: Side-by-side **Diff View** highlighting exactly what the AI changed to fix your logic.
- 🔒 **Air-Gapped Privacy**: Powered by `phi3:mini` running locally via **Ollama**.

---

## 🚀 Quick Start

### 1. Prerequisites
- [Docker & Docker Compose](https://docs.docker.com/get-docker/)

### 2. Setup & Installation
```bash
# Clone the repository
git clone [https://github.com/yourusername/codepapi-ai.git](https://github.com/yourusername/codepapi-ai.git)
cd codepapi-ai

# Start the entire stack (AI + Backend + Frontend)
docker-compose up -d

```

### 3. Usage

* **Frontend**: Open [http://localhost](https://www.google.com/search?q=http://localhost)
* **API**: Accessible at [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000)

*Note: The first startup pulls the Phi-3 Mini model (approx 2.3GB). Please ensure you have a stable internet connection.*

---

## 🛠 Tech Stack

| Component | Technology |
| --- | --- |
| **AI Engine** | [Ollama](https://ollama.ai/) (phi3:mini) |
| **Orchestration** | LangChain.js |
| **Backend** | NestJS (Node.js) |
| **Frontend** | React, TailwindCSS, Lucide |
| **Editor** | Monaco Editor (VS Code Engine) |
| **Tooling** | Biome (Linting & Formatting) |

---

## 🤝 Contributing

We use **Biome** for lightning-fast linting and formatting. Please run the following before submitting a Pull Request:

```bash
# Check and apply fixes
npx @biomejs/biome check --apply .

```

 **Adding Languages:** To add new programming languages or migration presets used by the UI, see the frontend documentation: `frontend/README.md` (section "Adding More Languages"). Edit `frontend/src/constants/languages.ts` to add entries.

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

Created with ❤️ by [Your Name]

```

---

### 🔧 Step 4: The Biome Configuration (`biome.json`)
Run `npx @biomejs/biome init` in your project root. It will create this file. Here is a solid configuration for your project:

```json
{
	"$schema": "https://biomejs.dev/schemas/1.8.3/schema.json",
	"organizeImports": {
		"enabled": true
	},
	"linter": {
		"enabled": true,
		"rules": {
			"recommended": true,
			"complexity": {
				"noForeach": "off"
			}
		}
	},
	"formatter": {
		"enabled": true,
		"indentStyle": "space",
		"indentWidth": 2,
		"lineWidth": 100
	}
}

```
