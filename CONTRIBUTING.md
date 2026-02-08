# Contributing to CodePapi AI

Thank you for considering contributing to CodePapi AI! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Standards](#code-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing](#testing)
- [Documentation](#documentation)
- [Questions](#questions)

## Code of Conduct

Please review and follow our [Code of Conduct](./CODE_OF_CONDUCT.md). By contributing, you agree to uphold these standards.

## Getting Started

### Prerequisites
- Node.js 18+ or Docker Desktop
- Git
- A GitHub account
- Familiarity with TypeScript/JavaScript

### Fork and Clone

```bash
# Fork on GitHub (click the fork button)

# Clone your fork
git clone https://github.com/YOUR-USERNAME/codepapi-ai.git
cd codepapi-ai

# Add upstream remote
git remote add upstream https://github.com/original-owner/codepapi-ai.git

# Keep your fork updated
git fetch upstream
git merge upstream/main
```

## Development Workflow

### Local Setup

```bash
# Option 1: Docker (Recommended)
docker-compose up -d

# Option 2: Local development
cd backend
npm install
npm run start:dev

# In another terminal
cd frontend
npm install
npm run dev
```

### Create a Branch

```bash
# Update main branch
git fetch upstream
git checkout main
git merge upstream/main

# Create feature branch
git checkout -b feature/your-feature-name

# Branch naming conventions:
# - feature/add-rust-support
# - fix/handle-large-files
# - docs/update-readme
# - refactor/simplify-converter
```

### Make Changes

- Write clean, readable code
- Follow existing code style
- Add comments for complex logic
- Use descriptive variable/function names
- Keep functions small and focused

### Lint Before Committing

```bash
# Run Biome checks
npx @biomejs/biome check --apply .

# This will auto-format your code and show any remaining issues
```

## Code Standards

### TypeScript/JavaScript

#### Style Guidelines
- **Use TypeScript:** Avoid `any` types when possible
- **Naming:** camelCase for variables/functions, PascalCase for classes
- **Constants:** UPPER_SNAKE_CASE for env vars and constants
- **Imports:** Organize alphabetically within each group
- **Line length:** Max 100 characters (Biome enforced)
- **Indentation:** 2 spaces (Biome enforced)

#### Good Examples

```typescript
// ✅ Good: Clear, typed, descriptive
interface CodeTranslation {
  success: boolean;
  code: string;
  language: string;
}

async function translateCode(
  source: string,
  from: string,
  to: string
): Promise<CodeTranslation> {
  // implementation
}

// ❌ Avoid: Vague, any type, unclear intent
async function process(data: any): any {
  // implementation
}
```

#### Comments

```typescript
// ❌ Bad: Explains what the code does (obvious)
// Add 1 to count
count = count + 1;

// ✅ Good: Explains why or what it means
// Increment the conversion counter for analytics
count = count + 1;

// ✅ Good: Complex logic gets a comment block
// Convert language IDs for the AI engine
const languageId = mapLanguageForAI(sourceLang);
```

### React Components

```typescript
// ✅ Good: Props interface, clear component name, proper exports
interface LanguageSelectorProps {
  value: string;
  onChange: (lang: string) => void;
  label: string;
  disabled?: boolean;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  value,
  onChange,
  label,
  disabled,
}) => {
  return (
    // JSX here
  );
};

// ❌ Avoid: No props typing, default exports, unclear names
export default (props) => {
  // JSX here
};
```

## Commit Guidelines

### Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat:` A new feature
- `fix:` A bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, semicolons, etc.)
- `refactor:` Code refactoring without feature changes
- `test:` Adding or updating tests
- `chore:` Build process, dependencies, tools
- `perf:` Performance improvements

### Scope (Optional)
- `converter` — Code conversion logic
- `api` — REST API endpoints
- `ui` — Frontend components
- `docs` — Documentation
- `deps` — Dependencies
- `ci` — CI/CD pipelines

### Subject
- Use imperative mood: "add" not "added" or "adds"
- Don't capitalize first letter
- No period (.) at the end
- Max 50 characters

### Body (Optional)
- Wrap at 72 characters
- Explain **what** and **why**, not **how**
- Separate from subject with a blank line

### Footer (Optional)
- Reference issues: `Closes #123`, `Fixes #456`
- Breaking changes: `BREAKING CHANGE: description`

### Examples

```
feat(converter): add Kotlin language support

Add TypeScript interfaces and conversion logic for Kotlin.
Implement common patterns like null safety and data classes.

Closes #234
```

```
fix(ui): resolve console error on large file uploads

Prevent file size validation from running on non-file inputs.
Add type checking before accessing file properties.

Fixes #189
```

## Pull Request Process

### Before Opening a PR

- [ ] Fork and branch from `main`
- [ ] Make your changes in small, logical commits
- [ ] Run `npx @biomejs/biome check --apply .`
- [ ] Test locally (with Docker or npm)
- [ ] Update documentation if needed
- [ ] No unrelated changes in one PR

### Opening a PR

1. **Title:** Follow commit message format
   ```
   feat(converter): add Ruby language support
   ```

2. **Description:** Explain what and why
   - What does this PR do?
   - Why is this change needed?
   - Any testing done?

3. **Link issues:** Reference related issues if any
4. **Keep it focused:** One feature or fix per PR

### During Review

- Be open to feedback
- Respond to questions promptly
- Make requested changes in new commits
- Keep conversation professional

### After Approval

- Ensure no conflicts
- A maintainer will merge your PR
- Your contribution will be recognized!

## Testing

### Manual Testing
- Test in Docker for consistency
- Try edge cases (empty input, very large files, special characters)
- Test on different browsers if UI changes
- Verify error handling

### Where to Add Tests
- Backend: `backend/src/**/*.spec.ts`
- Frontend: `frontend/src/**/*.spec.ts`

### Test Command
```bash
npm run test        # Run tests
npm run test:watch  # Watch mode
npm run test:cov    # With coverage
```

## Documentation

### README Updates
- Update READMEs if behavior changes
- Add examples for new features
- Keep language technical but clear

### Code Documentation
- Use JSDoc for public functions:
  ```typescript
  /**
   * Translates code from one language to another.
   * @param source - The source code to translate
   * @param from - Source language ID
   * @param to - Target language ID
   * @returns Promise with translated code
   */
  async function translateCode(source: string, from: string, to: string)
  ```

- Comment complex algorithms
- Explain *why*, not *what*

## Questions?

- **GitHub Issues:** For bugs and feature requests
- **GitHub Discussions:** For questions and ideas
- **Email:** [contact@example.com] for other topics

---

**Thank you for contributing to CodePapi AI!** 🎉

Your help improving this hobby project is much appreciated. Whether it's bug fixes, documentation, or new ideas, every contribution matters!
