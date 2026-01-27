# CLAUDE.md - AI Assistant Guidelines

## Repository Overview

This repository (`ANTHROPIC_API_KEY`) is currently a minimal project placeholder. It contains no source code, build configurations, or dependencies at present.

## Current State

- **Files**: Single `README.md` file
- **Build System**: None configured
- **Dependencies**: None
- **Tests**: None
- **CI/CD**: Not configured

## Security Notice

**CRITICAL**: This repository appears to contain an exposed API key in the README.md file. API keys and other credentials should NEVER be committed to version control. Best practices include:

- Store secrets in environment variables
- Use `.env` files that are listed in `.gitignore`
- Use secret management tools (AWS Secrets Manager, HashiCorp Vault, etc.)
- Rotate any credentials that have been exposed in version control history

## Development Guidelines

When this repository is developed further, follow these conventions:

### File Organization

```
├── src/              # Source code
├── tests/            # Test files
├── docs/             # Documentation
├── .env.example      # Environment variable template (no actual secrets)
├── .gitignore        # Git ignore rules
├── README.md         # Project documentation
└── CLAUDE.md         # AI assistant guidelines
```

### Code Conventions

- Use clear, descriptive variable and function names
- Add comments only where logic isn't self-evident
- Keep functions small and focused on a single responsibility
- Avoid over-engineering - implement only what's needed

### Git Workflow

- Write clear, descriptive commit messages
- Use feature branches for new development
- Never commit secrets, credentials, or API keys
- Keep commits atomic and focused

### Testing

When tests are added:
- Write tests for new functionality
- Maintain test coverage for critical paths
- Run tests before committing

## Commands

No build or test commands are currently configured for this repository.

## For AI Assistants

When working with this repository:

1. **Security First**: Never expose, log, or transmit API keys or credentials
2. **Check State**: Always verify the current project state before making assumptions
3. **Minimal Changes**: Make only the changes necessary to accomplish the task
4. **Documentation**: Update this file when significant structural changes are made to the repository
