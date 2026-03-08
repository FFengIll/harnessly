# Foundation Skills

This directory contains the foundational skills that support the SDLC workflow. These skills can be called at any time during the development process.

## Available Skills

| Skill | Purpose | Documentation |
|-------|---------|---------------|
| **discuss** | Interactive technical discussion | [discuss.md](./discuss.md) |
| **doc** | Documentation generation and management | [doc.md](./doc.md) |
| **pencil** | Wireframe and UI/UX design | [pencil.md](./pencil.md) |
| **cache** | Architecture knowledge caching | [cache.md](./cache.md) |
| **git** | Git operations assistance | [git.md](./git.md) |

## Usage

Foundation skills are available as standalone commands:

```bash
/discuss [topic description]
/doc [type] [target]
/pencil [design description]
/cache [scope] [action]
/git [action] [options]
```

## Integration with SDLC

These foundation skills are designed to work seamlessly with the SDLC workflow:

- **During research**: Use `/cache` to read architecture knowledge
- **During spec**: Use `/pencil` to create wireframes, `/doc` to generate API docs
- **During coding**: Use `/git` for branch management and commits
- **During any phase**: Use `/doc` to update documentation

**Note**: `/discuss` can be used independently anytime for technical discussions, exploration, and decision-making - it's not tied to any specific phase.

## Design Reference

These skills were created based on the SDLC v3.2 design document:
`/Users/yz/Project/feng-project/vibely/docs/pencil/2026-03-08-sdlc-v3.2-flow.md`

## File Structure

```
skills/foundation/
├── README.md           # This file
├── discuss.md          # Technical discussion skill
├── doc.md              # Documentation skill
├── pencil.md           # Wireframe design skill
├── cache.md            # Architecture caching skill
└── git.md              # Git operations skill
```

## Dependencies

Foundation skills may depend on each other:
- **discuss** depends on: cache, doc, git
- **doc** depends on: cache, pencil
- **pencil** depends on: doc, cache
- **cache** depends on: doc, git
- **git** depends on: cache, doc

## Version

**Created**: 2026-03-08
**SDLC Version**: 3.2 (Flow-Based)
