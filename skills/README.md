# Skills System - SDLC Management Suite

A comprehensive system for managing the entire Software Development Lifecycle with flow-based workflows, coordinated skills, and persistent state management.

## Overview

The Skills system provides a collection of coordinated commands that work together to manage software development projects from conception to deployment. Each skill addresses a specific aspect of the development process while maintaining state and context across the entire workflow.

## Quick Start Guide

### 1. Start a New Workflow

```bash
/sdlc start feature "User Authentication System"
```

**Natural language examples:**
```bash
/sdlc start 我要做一个用户登录功能
/sdlc start feature 用户认证
/sdlc start I need to add login functionality
```

### 2. Check Current Status

```bash
/sdlc status
```

### 3. Execute Phases

```bash
# Execute next phase automatically
/sdlc next

# Or execute specific phase directly
/sdlc research
/sdlc spec
/sdlc coding
```

### 4. Complete the Workflow

Continue executing `/sdlc next` until all phases complete:

```bash
/sdlc next  # research
/sdlc next  # spec
/sdlc next  # coding
/sdlc next  # test
/sdlc next  # verify
/sdlc next  # secure
/sdlc next  # cr
/sdlc next  # commit
/sdlc next  # pr
```

## Directory Structure

```
skills/
├── README.md              # This file - system documentation
├── sdlc.md               # Main SDLC entry point
├── workflows/            # Workflow definitions
│   ├── feature.md        # Feature development workflow
│   ├── bugfix.md         # Bug fix workflow
│   ├── refactor.md       # Refactoring workflow
│   └── research.md       # Research workflow
├── phases/               # Phase-specific skills
│   ├── research.md       # Research phase
│   ├── spec.md           # Specification phase
│   ├── coding.md         # Coding phase
│   ├── test.md           # Testing phase
│   ├── verify.md         # Verification phase
│   ├── secure.md         # Security phase
│   ├── cr.md             # Code review phase
│   ├── commit.md         # Commit phase
│   ├── pr.md             # Pull request phase
│   └── debug.md          # Debug phase (bugfix)
├── flow/                 # Flow control skills
│   ├── start.md          # Start workflow
│   ├── status.md         # Check status
│   ├── next.md           # Next phase
│   ├── skip.md           # Skip phase
│   ├── phase.md          # Jump to phase
│   └── end.md            # End workflow
└── foundation/           # Shared foundational skills
    ├── doc.md            # Documentation generation
    ├── pencil.md         # Wireframe and UI/UX design
    ├── cache.md          # Architecture knowledge caching
    └── git.md            # Git operations assistance
```

## Available Workflows

### Feature Development

```
research → spec → coding → test → verify → secure → cr → commit → pr → MERGE
```

Use for: New features, functionality additions, user stories

### Bug Fix

```
debug → coding → test → verify → secure → commit → pr → MERGE
```

Use for: Bug reports, error fixes, issue resolution

### Refactor

```
cr → spec → coding → test → verify → secure → cr → commit → pr → MERGE
```

Use for: Code improvements, technical debt, optimization

### Research

```
research → doc → discuss → END
```

Use for: Technical research, technology evaluation, spike stories

## Workflow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                     SDLC WORKFLOW                                │
└─────────────────────────────────────────────────────────────────┘

    ┌──────────┐
    │  START   │
    └────┬─────┘
         │
         ▼
    ┌────────────┐     ┌──────────────┐
    │  PLANNING  │────▶│ Requirements │
    └────┬───────┘     └──────────────┘
         │
         ▼
    ┌────────────┐     ┌──────────────┐     ┌─────────────┐
    │  DESIGN    │────▶│ Architecture │────▶│  Database   │
    └────┬───────┘     └──────────────┘     └─────────────┘
         │
         ▼
    ┌────────────┐     ┌──────────────┐     ┌─────────────┐
    │ DEVELOPMENT│────▶│  Coding      │────▶│  Testing    │
    └────┬───────┘     └──────────────┘     └─────────────┘
         │
         ▼
    ┌────────────┐     ┌──────────────┐     ┌─────────────┐
    │   REVIEW   │────▶│ Code Review  │────▶│  QA         │
    └────┬───────┘     └──────────────┘     └─────────────┘
         │
         ▼
    ┌────────────┐     ┌──────────────┐     ┌─────────────┐
    │ DEPLOYMENT │────▶│ Staging      │────▶│ Production  │
    └────┬───────┘     └──────────────┘     └─────────────┘
         │
         ▼
    ┌────────────┐     ┌──────────────┐
    │ MAINTENANCE│────▶│ Monitoring   │
    └────┬───────┘     └──────────────┘
         │
         ▼
    ┌──────────┐
    │  RETIRE  │
    └──────────┘

───────────────────────────────────────────────────────────────────
                    State Management
───────────────────────────────────────────────────────────────────

Each phase maintains:
  ✓ Requirements specifications
  ✓ Design documents
  ✓ Implementation artifacts
  ✓ Test results
  ✓ Review outcomes
  ✓ Deployment records

State flows sequentially but can iterate:
  PLANNING → DESIGN → DEVELOPMENT → REVIEW → DEPLOYMENT → MAINTENANCE

                            ↖____________↗
                              Feedback Loop
```

## Natural Language Support

All skills support natural language input. You can describe what you want in your own words:

```bash
# Formal
/sdlc start feature "User Authentication System"

# Natural (Chinese)
/sdlc start 我要做一个用户登录功能

# Natural (English)
/sdlc start I need to add login functionality

# Contextual
/sdlc next
# System understands current phase and executes next step

# Flexible
/sdlc test 帮我跑一下测试
/sdlc verify 检查一下是不是符合需求
```

### Intent Detection

The system automatically detects workflow type from natural language:

**Feature indicators:**
- "做一个...", "实现...", "添加...", "新增..."
- "function", "feature", "add", "implement"

**Bugfix indicators:**
- "修复...", "fix...", "bug...", "问题..."
- "error", "failure", "not working"

**Refactor indicators:**
- "重构...", "优化...", "改进..."
- "code quality", "maintainability"

**Research indicators:**
- "调研...", "研究...", "比较..."
- "solution", "technology selection"

## State Management

The system maintains persistent state in `.sdlc/` directory:

### State Structure

```
.sdlc/
├── state.json            # Current workflow state
├── history.json          # Phase execution history
├── config.json           # Configuration (optional)
├── cache/                # Architecture knowledge cache
│   ├── workflow-state.json       # Current workflow state
│   ├── architecture-summary.json # High-level overview (7d TTL)
│   ├── architecture-brief.json   # Component map (3d TTL)
│   ├── architecture-detailed.json # Full analysis (1d TTL)
│   └── architecture-full.json    # Complete analysis (12h TTL)
└── meta/                 # Cache metadata
    ├── cache-metadata.json        # Cache timestamps and metadata
    └── architecture-tracking.json # Track code changes for auto-refresh
```

### State File Example

```json
{
  "workflow": "feature",
  "current_phase": "spec",
  "completed": ["research"],
  "branch": "feature/user-auth",
  "description": "User Authentication System",
  "started_at": "2026-03-08T10:00:00Z",
  "updated_at": "2026-03-08T14:30:00Z",
  "phase_history": [
    { "phase": "research", "completed_at": "2026-03-08T10:30:00Z" }
  ]
}
```

### State Persistence

State is automatically saved when:
- A workflow starts (`/sdlc start`)
- A phase completes (`/sdlc next`)
- A phase is skipped (`/sdlc skip`)
- Branch is created
- Workflow ends (`/sdlc end`)

### State Queries

```bash
# Current status
/sdlc status

# View phase history
/sdlc history

# Check what's next
/sdlc next --dry-run
```

## Output Locations

```
docs/
├── spec/           # Specifications (from /sdlc spec)
├── research/       # Research documents (from /sdlc research)
├── verify/         # Verification reports (from /sdlc verify)
├── pencil/         # Wireframes and designs (from /pencil)
├── arch/           # Architecture cache (from /cache)
└── test/           # Test reports (from /sdlc test)
```

## Quality Assurance Phases

| Phase | Purpose | What it Checks |
|-------|---------|----------------|
| **test** | Does the code work? | Lint, typecheck, format, unit tests, integration tests, E2E |
| **verify** | Is the functionality correct? | Requirement coverage, API matching, feature completeness (vs spec) |
| **secure** | Are there security issues? | Vulnerability scanning, dependency checks, secret detection |
| **cr** | Is the code quality good? | Best practices, architecture, maintainability |

## All Available Skills

### Main Entry Point

| Skill | Description |
|-------|-------------|
| `/sdlc` | Main SDLC coordinator - manages workflows and state |

### Flow Control

| Skill | Description |
|-------|-------------|
| `/sdlc start` | Start a new workflow |
| `/sdlc status` | Show current workflow status |
| `/sdlc next` | Execute next phase in workflow |
| `/sdlc skip` | Skip current phase |
| `/sdlc phase` | Jump to specific phase |
| `/sdlc end` | End current workflow |

### Phase Skills

| Skill | Description |
|-------|-------------|
| `/sdlc research` | Technical research, solution evaluation |
| `/sdlc spec` | Write specifications and design documents |
| `/sdlc coding` | Coding guidance and implementation |
| `/sdlc test` | Test validation (lint + typecheck + format + unit + integ + e2e) |
| `/sdlc verify` | Verify implementation matches spec requirements |
| `/sdlc secure` | Security checks |
| `/sdlc cr` | Code review |
| `/sdlc commit` | Commit code |
| `/sdlc pr` | PR management |
| `/sdlc debug` | Debug issues (bugfix workflow) |

### Foundation Skills

| Skill | Description |
|-------|-------------|
| `/doc` | Documentation generation and management |
| `/pencil` | Wireframe and UI/UX design |
| `/cache` | Multi-level architecture knowledge caching with TTL |
| `/git` | Git operations assistance |

### Multi-Level Architecture Cache

The `/cache` skill provides intelligent architecture caching at different detail levels:

| Level | Description | TTL | Use Case |
|-------|-------------|-----|----------|
| **summary** | Tech stack, main components, directory structure | 7 days | Quick context, onboarding |
| **brief** | Component map, key modules, patterns, dependencies | 3 days | Feature work, bug fixes |
| **detailed** | Full component analysis, data models, APIs, patterns | 1 day | Implementation work |
| **full** | Complete with code patterns, relationships, technical debt | 12 hours | Refactoring, architecture review |

```bash
# Get architecture cache at different levels
/cache get architecture --level=brief
/cache get architecture --level=detailed
/cache get architecture --level=full

# Refresh cache
/cache refresh architecture

# List all cache entries with freshness
/cache list
```

**Auto-refresh**: Cache automatically invalidates based on code changes detected via git commits.

## Common Usage Examples

### Complete Feature Development

```bash
# 1. Start workflow
/sdlc start feature "User Authentication System"

# 2. Execute phases sequentially
/sdlc next  # research
/sdlc next  # spec
/sdlc next  # coding (prompts for manual coding)
/sdlc next  # test (lint + typecheck + unit + integ + e2e)
/sdlc next  # verify (check against spec)
/sdlc next  # secure (security scan)
/sdlc next  # cr (code review)
/sdlc next  # commit
/sdlc next  # pr

# 3. End workflow
/sdlc end
```

### Quick Actions

```bash
# Run tests
/sdlc test

# Verify implementation
/sdlc verify

# Check code quality
/sdlc test lint typecheck

# Security scan
/sdlc secure

# Generate documentation
/doc api User Authentication API
```

### Bug Fix Workflow

```bash
# 1. Start bugfix workflow
/sdlc start bugfix "Login timeout error"

# 2. Debug the issue
/sdlc debug

# 3. Fix the code
/sdlc coding

# 4. Test and verify
/sdlc test
/sdlc verify

# 5. Commit and PR
/sdlc commit "Fix login timeout"
/sdlc pr
```

### Refactoring Workflow

```bash
# 1. Start refactor workflow
/sdlc start refactor "Improve user service architecture"

# 2. Initial code review
/sdlc cr

# 3. Create new specification
/sdlc spec

# 4. Implement refactoring
/sdlc coding

# 5. Test and verify
/sdlc test
/sdlc verify

# 6. Final review and commit
/sdlc cr
/sdlc commit
/sdlc pr
```

### Research Workflow

```bash
# 1. Start research workflow
/sdlc start research "Compare state management solutions"

# 2. Conduct research
/sdlc research

# 3. Document findings
/doc state-management-research

# 4. End workflow
/sdlc end
```

## Branch Management

Auto-create and manage branches based on workflow type:

```bash
# Feature branch
feature/{description}

# Bugfix branch
bugfix/{issue-id-or-description}

# Refactor branch
refactor/{component-name}
```

Example:
```bash
/sdlc start feature "用户认证"
# Creates: feature/user-auth
```

## Best Practices

1. **Always start with `/sdlc start`**: Initializes workflow and state
2. **Use `/sdlc next`**: Progress through phases sequentially for proper flow
3. **Complete each phase**: Each phase generates documentation for traceability
4. **Use verify**: Always run `/sdlc verify` to ensure implementation matches spec
5. **Review before commit**: Complete cr phase before committing
6. **Keep state synchronized**: System auto-saves, but check status regularly
7. **Document decisions**: Use `/doc` to record important decisions
8. **Design before coding**: Use `/pencil` for visual designs before implementation

## Troubleshooting

### State Issues

**Problem**: State not persisting
```
Solution:
1. Check .sdlc/ directory permissions
2. Run /sdlc status to validate state
3. Reinitialize if needed: /sdlc start
```

**Problem**: Lost work
```
Solution:
1. Check /sdlc history
2. View phase history in state file
3. Documents are saved in docs/ directory
4. Export state: /sdlc export
```

### Phase Transition Issues

**Problem**: Cannot advance phase
```
Solution:
1. Check /sdlc status for blockers
2. Complete required tasks in current phase
3. Use /sdlc skip if appropriate
```

**Problem**: Wrong phase
```
Solution:
1. /sdlc phase [correct-phase]
2. Or /sdlc end to start over
```

### Quality Issues

**Problem**: Tests failing
```
Solution:
1. /sdlc test debug
2. Fix issues manually
3. Run /sdlc test again
```

**Problem**: Verification failed
```
Solution:
1. Review /sdlc verify output
2. Check spec document
3. Update implementation or spec
4. Run /sdlc verify again
```

## Advanced Usage

### Custom Workflows

Define custom workflows in `.sdlc/workflows/`:

```yaml
# .sdlc/workflows/custom-release.yml
name: Custom Release
phases:
  - name: pre-deployment
    commands:
      - /sdlc test
      - /sdlc verify
      - /sdlc secure
  - name: build
    commands:
      - /build production
  - name: deploy
    commands:
      - /deploy staging
      - /deploy production
```

### Environment Profiles

Configure different environments:

```json
// .sdlc/config.json
{
  "environments": {
    "development": {
      "url": "http://localhost:3000",
      "database": "dev-db"
    },
    "staging": {
      "url": "https://staging.example.com",
      "database": "staging-db"
    },
    "production": {
      "url": "https://example.com",
      "database": "prod-db"
    }
  }
}
```

### Integration with Git

The system integrates with Git operations:

```bash
# Auto-branch creation
/sdlc start feature "User auth"
# Creates: feature/user-auth

# Commit with phase context
/sdlc commit
# Uses phase-specific commit message template

# PR with workflow context
/sdlc pr
# Includes workflow info in PR description
```

## Migration from Old Skills

| Old Skill | New Location | Notes |
|-----------|--------------|-------|
| `/spec` | `/sdlc spec` | Part of workflow |
| `/pr` | `/sdlc pr` | Part of workflow |
| `/codereview` | `/sdlc cr` | Part of workflow |
| `/git-commit` | `/sdlc commit` | Part of workflow |
| `/research` | `/sdlc research` | Part of workflow |
| `/test-go` | `/sdlc test` | Enhanced with workflow |
| `/codeclean` | `/sdlc test` (lint) | Integrated in test phase |
| `/refactor-go` | `/sdlc cr` | Part of code review |
| `/update-arch` | `/cache` | Foundation skill |

## Architecture

### Design Principles

1. **Flow-Based**: Emphasize connections between phases
2. **Stateful**: Maintain context across sessions
3. **Natural Language**: Support flexible input
4. **Traceable**: Generate documentation for each phase
5. **Coordinated**: Skills work together seamlessly

### Skill Categories

1. **Flow Control**: Manage workflow progression
2. **Phase Skills**: Execute specific development phases
3. **Foundation Skills**: Provide shared capabilities
4. **Workflow Definitions**: Define phase sequences

### State Machine

The system implements a state machine with:
- **States**: Workflow phases
- **Transitions**: Phase progression
- **Events**: User commands
- **Actions**: Phase execution
- **Guards**: Phase completion criteria

## Contributing

To add new skills or modify existing ones:

1. Create skill file in appropriate directory
2. Follow skill naming conventions
3. Include comprehensive help text
4. Add state management if needed
5. Update this README
6. Test thoroughly

## Support

For issues, questions, or contributions:

- Check skill-specific help: `/sdlc help [skill]`
- Review documentation in respective skill files
- Check state: `/sdlc status`
- Validate configuration: `/sdlc validate`

## License

Part of the Vibely project. See project LICENSE for details.

---

**Version**: 1.0.0
**Last Updated**: 2026-03-08
**Maintainer**: Vibely Team
