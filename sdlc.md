# /sdlc

Software Development Lifecycle management with intelligent intent detection and routing.

## Usage

```bash
/sdlc [natural language request]  # Smart mode - AI detects intent
/sdlc [command] [args]             # Explicit command
```

---

# Routing Tables

> For AI execution: match input against Cmd (exact) first, then Intent keywords.
> Always show: `🎯 Detected: <intent>  → Executing: <skill>`

## Actions

| Skill             | File                 | Cmd        | Intent keywords                                 |
| ----------------- | -------------------- | ---------- | ----------------------------------------------- |
| action:guard      | action/guard.md      | guard      | safety, before work                             |
| action:plan       | action/plan.md       | plan       | plan, design plan, 规划                         |
| action:understand | action/understand.md | understand | understand, analyze architecture, build context |
| action:cr         | action/cr.md         | cr         | review, check, audit, find issues, 检查         |
| action:spec       | action/spec.md       | spec       | spec, specification, write spec, 规范           |
| action:test       | action/test.md       | test       | test, run tests, 测试                           |
| action:commit     | action/commit.md     | commit     | commit, save changes, 提交                      |
| action:pr         | action/pr.md         | pr         | pull request, 提交pr                            |
| action:debug      | action/debug.md      | debug      | debug, diagnose                                 |
| action:lint       | action/lint.md       | lint       | lint, fix style, check style                    |
| action:simplify   | action/simplify.md   | simplify   | simplify, clean up code, 简化                   |
| action:regression | action/regression.md | regression | regression, check regressions                   |
| action:research   | action/research.md   | research   | research, investigate, compare, 研究            |
| action:discuss    | action/discuss.md    | discuss    | discuss, talk about                             |
| action:handoff    | action/handoff.md    | handoff    | delegate, handoff                               |
| action:secure     | action/secure.md     | secure     | security, secure                                |
| action:harness    | action/harness.md    | harness    | harness, verification                           |
| action:validate   | action/validate.md   | validate   | validate                                        |
| feedback          | action/feedback.md   | feedback   | feedback, score, improve                        |

## workflow

| Skill             | File                 | Intent keywords                           | Pipeline                                                          |
| ----------------- | -------------------- | ----------------------------------------- | ----------------------------------------------------------------- |
| workflow:bugfix   | workflow/bugfix.md   | fix, bug, issue, error, 修复              | understand→debug→coding→test→validate→secure→commit→pr            |
| workflow:feature  | workflow/feature.md  | add, new feature, implement, 添加, 新功能 | understand→research→spec→coding→test→validate→secure→cr→commit→pr |
| workflow:refactor | workflow/refactor.md | refactor, clean up, 重构                  | understand→spec→coding→test→commit→pr                             |
| workflow:research | workflow/research.md | research, investigate, 研究               | understand→research→doc→discuss→END                               |
| workflow:minor    | workflow/minor.md    | minor, small change, 小改动               | coding→test→commit                                                |

---

# Key Behaviors

- `explore/explain/how does` → read and explain inline, no skill invoked
- `understand/analyze architecture` → `action:understand` (creates `.sdlc/arch/` cache)
- `review/check/find issues` → `action:cr` (creates `*.cr.md`)

## Output Structure

```
.sdlc/
├── docs/      # category-feature-date.type.md
├── harness/   # verification harnesses
└── arch/      # architecture cache
```

**IMPORTANT:** `.sdlc` folder should be placed under the user's coding project path.
