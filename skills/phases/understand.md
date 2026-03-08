# Understand Phase Skill

Understands the current codebase, architecture, and implementation patterns to build context before making changes.

## Usage

```
/sdlc understand [scope]
```

## Description

The understand phase skill builds comprehensive knowledge of the existing codebase. Unlike `research` (which explores external technologies and solutions), `understand` focuses on **internal code comprehension** - mapping architecture, understanding patterns, identifying dependencies, and documenting how the system currently works.

### When to Use

- **Onboarding**: When joining a project or working with unfamiliar code
- **Before changes**: Before implementing features, fixing bugs, or refactoring
- **Context building**: When you need to understand "how this works currently"
- **Architecture discovery**: When exploring how components are connected
- **Impact analysis**: Before modifying code, understand what depends on it

### What It Does

- Maps project structure and key components
- Identifies tech stack, frameworks, and dependencies
- Analyzes code patterns and conventions
- Documents module relationships and data flow
- Identifies potential issues or technical debt
- Creates architecture understanding documentation

## Process

1. **Project Mapping**
   - Explore directory structure and organization
   - Identify entry points and key modules
   - Map component hierarchies and relationships
   - Document configuration and environment setup

2. **Tech Stack Analysis**
   - Identify frameworks, libraries, and tools
   - Note package.json dependencies and versions
   - Recognize build tools and development setup
   - Understand deployment and infrastructure

3. **Code Pattern Discovery**
   - Identify coding conventions and patterns
   - Note architectural patterns (MVC, microservices, etc.)
   - Understand state management and data flow
   - Document error handling and validation approaches

4. **Relationship Mapping**
   - Trace how components interact
   - Identify data flow and API boundaries
   - Map dependencies between modules
   - Note external integrations

5. **Documentation**
   - Create understanding report in `docs/understand/`
   - Include diagrams (via /pencil) if helpful
   - Note areas of complexity or technical debt
   - Document questions or areas needing clarification

## Scope Options

```
/sdlc understand                # Understand entire project
/sdlc understand src/auth       # Understand specific module
/sdlc understand backend        # Understand backend area
/sdlc understand --deep         # Deeper analysis with more detail
```

## Output Format

The understand skill produces a structured understanding document:

### Understanding Summary

**Project:** [Project Name]

**Scope:** [Full project or specific module]

**Date:** [YYYY-MM-DD]

---

## Overview

[Brief description of what this codebase/module does and its main purpose]

---

## Architecture

### High-Level Structure

```
[Directory tree or component diagram]
```

### Key Components

| Component | Purpose | Location |
|-----------|---------|----------|
| [Component 1] | [What it does] | [path/to/component] |
| [Component 2] | [What it does] | [path/to/component] |

### Data Flow

```
[Description of how data flows through the system]
```

---

## Tech Stack

### Frontend
- [Framework] - [Version]
- [UI Library] - [Version]
- [State Management] - [Approach]

### Backend
- [Runtime] - [Version]
- [Framework] - [Version]
- [Database] - [Version]

### Tools & Infrastructure
- [Build tool] - [Purpose]
- [Testing framework] - [Purpose]
- [Deployment] - [Platform]

---

## Code Patterns

### Architectural Patterns
- [Pattern 1]: [Description]
- [Pattern 2]: [Description]

### Coding Conventions
- [Convention 1]: [How code is organized]
- [Convention 2]: [Naming patterns, file structure, etc.]

### Key Patterns
| Pattern | Where Used | Notes |
|---------|------------|-------|
| [Pattern name] | [Location] | [Description] |

---

## Module Relationships

```
[Diagram or description of how modules connect]

Module A → Module B → Module C
     ↓           ↓
   Module D   Module E
```

### Dependencies

| Module | Depends On | Purpose |
|--------|------------|---------|
| [Module A] | [Module B, C] | [Why] |

---

## Entry Points

### Main Entry Points
- [Entry point 1]: [path] - [What it initiates]
- [Entry point 2]: [path] - [What it initiates]

### API Endpoints (if applicable)
- [Method] [path]: [Purpose]
- [Method] [path]: [Purpose]

---

## Configuration

### Environment Variables
- `[VAR_NAME]`: [Purpose]
- `[VAR_NAME]`: [Purpose]

### Configuration Files
- [file]: [Purpose]

---

## Areas of Note

### Complexity
- [Area 1]: [What makes it complex]
- [Area 2]: [What makes it complex]

### Technical Debt
- [Debt 1]: [Description]
- [Debt 2]: [Description]

### Potential Issues
- [Issue 1]: [Description]
- [Issue 2]: [Description]

---

## Questions & Unknowns

- [Question 1]: [What needs clarification]
- [Question 2]: [What needs clarification]

---

## Completion Checklist

- [ ] Project structure mapped
- [ ] Key components identified
- [ ] Tech stack documented
- [ ] Code patterns noted
- [ ] Module relationships understood
- [ ] Entry points identified
- [ ] Configuration understood
- [ ] Areas of complexity noted
- [ ] Document saved to `docs/understand/`

## Examples

### Example 1: Full Project Understanding

```
/sdlc understand
```

Would produce a comprehensive document covering:
- Overall architecture and structure
- All major components and their relationships
- Complete tech stack
- Code patterns and conventions
- Configuration and deployment setup

### Example 2: Module Understanding

```
/sdlc understand src/auth
```

Would focus on:
- Auth module structure
- Authentication flow
- How auth integrates with rest of app
- Auth-related configurations
- Dependencies and data flow

### Example 3: Before Bug Fix

```
/sdlc understand src/payment
# Then investigate why payments fail
```

Builds context before diving into debugging.

## Integration in Workflows

### Feature Development
```
understand → research → spec → coding → test → verify → secure → cr → commit → pr
```

### Bug Fix
```
understand → debug → coding → test → verify → secure → commit → pr
```

### Refactor
```
understand → cr → spec → coding → test → verify → secure → cr → commit → pr
```

### Onboarding / Context Building
```
understand → doc → [discuss]
```

## Related Skills

- **/research** - External technology and solution research
- **/debug** - Problem diagnosis (after understanding context)
- **/cr** - Code review and quality assessment
- **/cache** - Cache and update architecture knowledge
- **/pencil** - Create diagrams to visualize architecture
- **/doc** - Generate documentation from understanding

## Tips

- Use `understand` as your first step when working with unfamiliar code
- Combine with `/pencil` to create visual architecture diagrams
- Save understanding docs to `docs/understand/` for team reference
- Re-run understand after significant changes to update documentation
- Use specific scope for large codebases to avoid overwhelming output
- Notes on technical debt help prioritize refactor work

## Output Location

```
docs/understand/YYYYMMDD-[scope]-understanding.md
```

Examples:
- `docs/understand/20260308-full-project-understanding.md`
- `docs/understand/20260308-auth-module-understanding.md`
- `docs/understand/20260308-payment-system-understanding.md`
