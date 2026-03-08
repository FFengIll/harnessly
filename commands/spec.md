/spec is a command that reads a given spec file (if provided) and understands the user request to complete tasks within the current project.

## Guideline
- Spec Documentation
  - Understand user intent first and design before taking action. Always write the spec, along with related understanding and design, into ./docs/spec/datetime-title.md, e.g., ./docs/spec/20260105-new-year-spec-name.md.
  - Since architecture information is cached, read it if possible to assist (cache glob path is `./docs/arch/*-arch.md`). Recommend using architecture info cache to reduce code searching and reading.
  - DO NOT make spec documents too long and verbose; keep specs key-focused and guiding-oriented. Pay attention to model definitions and file/module/function abstractions for design.
- For Frontend
  - Use the same tech stack, components, theme, and design patterns.
  - Understand user intent and implement good design to complete the task.
  - Replacement solutions are allowed for locale and text.
- For Backend
  - Pay attention to current file structure and list directories with limited depth.
  - Write necessary tests for your work following the corresponding programming language conventions.
  - Since backend work can be time-consuming and may be limited by network, handle special test cases carefully.

## Architecture Cache

Since each spec may need to understand the project, cache architecture understanding and reuse it when possible.

### Cache Structure

Architecture caches are stored in `./docs/arch/` with multi-level granularity:

```
docs/arch/
├── overview-arch.md              # Project-level (7d TTL)
├── [module]-arch.md              # Module-level (3d TTL)
├── [module]/[sub]-arch.md        # Component-level (1d TTL)
└── cache-metadata.json           # Cache metadata
```

### Reading Cache

**Priority Order (most specific first):**
1. Component: `docs/arch/[module]/[sub]-arch.md`
2. Module: `docs/arch/[module]-arch.md`
3. Project: `docs/arch/overview-arch.md`

**Example:**
```bash
# For auth module work, check in order:
docs/arch/auth/login/oauth-arch.md  # Most specific
docs/arch/auth/login-arch.md
docs/arch/auth-arch.md
docs/arch/overview-arch.md         # Fallback
```

### Cache Freshness

Check if cache is still valid (TTL as reference):
- **Project level**: ~30 days
- **Module level**: ~14 days
- **Component level**: ~7 days
- **Detailed level**: ~3 days

> **Note**: TTL values are reference guidelines only. Actual cache freshness depends on code changes.

If cache is expired or missing, regenerate using `/sdlc understand [scope]`.

### Writing Cache

When analyzing codebase for spec:
1. Generate appropriate cache level
2. Save with timestamp: `[YYYYMMDD]-[scope]-arch.md`
3. Update `cache-metadata.json`
4. Include hash for change detection

### Benefits

- **Reduce code reading**: Use cached architecture info
- **Faster spec creation**: Skip redundant analysis
- **Consistent context**: Share architecture understanding across specs
- **Smart invalidation**: Auto-refresh when code changes

**See also**: `docs/arch/ARCH_CACHE_SYSTEM.md` for full documentation

## IMPORTANT
You can use the `askUserQuestion` tool to communicate with the user, or let the user `choose` for discussion.
You can use the `pencil` skill to show design to user in text-base graph.