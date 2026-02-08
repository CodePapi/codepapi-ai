# Contributing

Have an idea? Found a bug? Want to improve something? Cool, let's do it!

## Setup

```bash
# Clone and setup
git clone https://github.com/codepapi/codepapi-ai.git
cd codepapi-ai

# Start with Docker (easiest)
docker-compose up -d

# Or local dev
cd backend && npm install && npm run start:dev  # Terminal 1
cd frontend && npm install && npm run dev       # Terminal 2
```

## Making Changes

- Write code however feels right
- Use TypeScript when possible
- Format before pushing:
  ```bash
  npx @biomejs/biome check --apply .
  ```

## Committing

Just write clear commit messages. Something like:
- `add Rust support`
- `fix upload bug`  
- `update docs`

## Submitting

1. Fork the repo
2. Make your changes
3. Push and open a PR
4. That's it! 

I'll review when I can. No pressure, it's a hobby project.

## Ideas

Want to contribute but not sure what? Some things that'd be cool:
- New language support
- Performance improvements
- Better error messages
- Documentation
- Bug fixes
- UI improvements

Just open an issue or PR with your idea!

## Questions?

Ask in GitHub Discussions or open an issue. Happy coding!
