# /sdlc

Software Development Lifecycle management.

## Usage

```bash
/sdlc [command] [args]
```

## Quick Start

```bash
# Recommended approach: Start with understand and spec
/sdlc understand       # Build context, create architecture cache
/sdlc spec "Describe change"  # Write specification

# Then proceed with implementation
/sdlc coding           # Write code based on spec
/sdlc test             # Run tests
/sdlc commit           # Commit changes

# Or use a workflow (includes understand and spec by default)
/sdlc start quick "Hotfix login bug"
/sdlc next
```

> **Important**: Always run `/sdlc understand` and `/sdlc spec` before coding. This prevents:
> - Making changes without understanding existing code
> - Implementing features that don't match requirements
> - Introducing bugs due to missing context
> - Wasting time on rework caused by misunderstandings

## Key Principle

**Each phase works independently.** No workflow required.

## Available Commands

| Command | Description |
|---------|-------------|
| `/sdlc start <type> [description]` | Start a workflow |
| `/sdlc status` | Show status |
| `/sdlc next` | Next phase |
| `/sdlc skip [phase]` | Skip current phase |
| `/sdlc phase <name>` | Jump to phase |
| `/sdlc end` | End workflow |
| `/archive [scope] [pattern]` | Archive old docs |

### Workflow Types

| Type | Description | Workflow |
|------|-------------|----------|
| `quick` | Small changes | **understand → spec → coding → test → commit → pr** |
| `feature` | New features | **understand → research → spec → coding → test → verify → commit → pr** |
| `bugfix` | Bug fixes | **understand → debug → coding → test → verify → commit → pr** |
| `research` | Research | understand → research → doc → END |

> **Best Practice**: Always start with `understand` and `spec` phases to avoid jumping into coding without sufficient context. Even for small changes, taking time to understand the codebase and write a brief spec prevents costly mistakes.

### Phase Commands

```bash
/sdlc coding [desc]    # Write code
/sdlc test [type]      # Run tests (lint + unit + e2e)
/sdlc verify [spec]    # Check vs spec
/sdlc commit [msg]     # Commit changes
/sdlc pr [action]      # Create/manage PR
/sdlc understand       # Build context
/sdlc research [topic] # Research solutions
/sdlc spec [name]      # Write spec
/sdlc debug [issue]    # Debug bugs
```

## Workflows

```
QUICK:    understand → spec → coding → test → commit → pr
FEATURE:  understand → research → spec → coding → test → verify → commit → pr
BUGFIX:   understand → debug → coding → test → verify → commit → pr
RESEARCH: understand → research → doc → END
```

> **Default Recommendation**: Start every workflow with `/sdlc understand` followed by `/sdlc spec`. This ensures you understand the existing codebase and have a clear plan before writing code.

## Examples

```bash
# Recommended: Start with understand and spec
/sdlc understand
/sdlc spec "Fix typo in header"

# Or use quick workflow (includes understand + spec)
/sdlc start quick "Fix typo"
/sdlc next  # goes: understand → spec → coding → test → commit → pr

# Individual phases (after understand + spec)
/sdlc test lint
/sdlc verify spec/auth.md
/sdlc commit "fix: login bug"

# Jump around (only if you've already done understand + spec)
/sdlc phase commit
/sdlc skip verify
```

## State Tracking (Optional)

State stored in `.sdlc/state.json`. Use `/sdlc start` to enable.

```bash
/sdlc status    # Show progress
/sdlc next      # Next phase
/sdlc skip      # Skip current
/sdlc phase X   # Jump to phase
/sdlc end       # End workflow
```

## Quality Checks

| Phase | Checks |
|-------|--------|
| `test` | Lint, typecheck, unit, e2e |
| `verify` | Spec compliance |
| `debug` | Bug analysis |

## Natural Language

```bash
/sdlc start 修复登录bug  # Detects: bugfix
/sdlc start add user api  # Detects: feature
```

## Output Locations

```
docs/
├── spec/       # Specs
├── research/   # Research docs
├── verify/     # Verification reports
└── archive/ # Archived docs

.sdlc/state.json  # Workflow state
```

## Output Format

```
═══ SDLC Status ═══

Workflow: quick
Phase:    coding
Next:     test

Branch: quick/fix-typo
─────────────────────
/sdlc next to continue
```

## Best Practices

1. **Always start with `/sdlc understand`** - Build context and create architecture cache
2. **Always write specs with `/sdlc spec`** - Even for small changes, document what you're doing
3. **Use workflows for tracking** - Multi-step tasks benefit from state tracking
4. **Skip freely but with caution** - You can skip phases, but understand + spec should stay
5. **`/sdlc verify` ensures implementation matches spec** - Quality check before committing

### Why Always Start with Understand + Spec?

| Without Understand + Spec | With Understand + Spec |
|--------------------------|----------------------|
| Jump into code blindly | Understand existing patterns first |
| Guess at requirements | Define what success looks like |
| Create technical debt | Build on architecture cache |
| Risk breaking things | Identify integration points early |
| Rework and revisions | Get it right the first time |

## Migration

The SDLC system now includes unified commands that work both standalone and within workflows.

| Old Command | New Command | Notes |
|-------------|-------------|-------|
| `/spec` | `/sdlc spec` | Specification writing |
| `/pr` | `/pr` or `/sdlc pr` | **Standalone available** - no workflow required |
| `/git-commit` | `/commit` or `/sdlc commit` | **Standalone available** - no workflow required |
| `/codereview` | `/sdlc cr` | Code review |

### Key Changes

**`/commit` and `/pr` are now standalone:**
- Use `/commit` or `/pr` anytime without starting an SDLC workflow
- When used in SDLC workflow (`/sdlc commit`, `/sdlc pr`), they include additional checks and state updates
- Single source of truth in `skills/phases/commit.md` and `skills/phases/pr.md`

**Example:**
```bash
# Standalone use (no workflow)
/commit "feat: add user auth"
/pr

# SDLC workflow use (with checks)
/sdlc start quick "Add auth"
/sdlc commit  # Runs pre-commit checks first
/sdlc pr      # Includes review requirements
```
