# /sdlc

Software Development Lifecycle management.

## Usage

```bash
/sdlc [command] [args]
```

## Quick Start

```bash
# Most common: run individual phases
/sdlc test
/sdlc verify
/sdlc commit
/sdlc pr

# Or use a workflow
/sdlc start quick "Hotfix login bug"
/sdlc next
```

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

### Workflow Types

| Type | Description | Workflow |
|------|-------------|----------|
| `quick` | Small changes | **coding → test → commit → pr** |
| `feature` | New features | understand → research → spec → coding → test → verify → commit → pr |
| `bugfix` | Bug fixes | understand → debug → coding → test → verify → commit → pr |
| `research` | Research | understand → research → doc → END |

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
QUICK:    coding → test → commit → pr
FEATURE:  understand → research → spec → coding → test → verify → commit → pr
BUGFIX:   understand → debug → coding → test → verify → commit → pr
RESEARCH: understand → research → doc → END
```

## Examples

```bash
# Quick fix - fastest path
/sdlc start quick "Fix typo"
/sdlc next  # goes: coding → test → commit → pr

# Individual phases
/sdlc test lint
/sdlc verify spec/auth.md
/sdlc commit "fix: login bug"

# Jump around
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
├── spec/      # Specs
├── research/  # Research docs
└── verify/    # Verification reports

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

1. Use phases independently when you know what you need
2. Use workflows for tracking multi-step tasks
3. Skip freely - you know what you're doing
4. `/sdlc verify` ensures implementation matches spec

## Migration

| Old | New |
|-----|-----|
| `/spec` | `/sdlc spec` |
| `/pr` | `/sdlc pr` |
| `/codereview` | `/sdlc cr` |
| `/git-commit` | `/sdlc commit` |
