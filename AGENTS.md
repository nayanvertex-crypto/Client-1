# Project Agents

This document describes the AI agents used in the development process.

## @judge Agent

The @judge agent evaluates code changes against security standards:
- OWASP Top 10 vulnerabilities
- ReDoS (Regular Expression Denial of Service) patterns
- Termux compatibility issues
- Code quality and best practices

## @verdict Agent

The @verdict agent reviews the verification log and @judge report to:
- Determine if changes are approved or rejected
- Identify blocking issues
- Provide final approval for deployment

## @architect Agent

The @architect agent designs:
- Project structure and directory layout
- API boundaries and data flow
- System architecture and patterns

## @general Agent

The @general agent executes multi-step tasks:
- Code implementation
- Testing and verification
- Documentation updates
