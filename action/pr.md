# /pr

Generate a pull request title and description focused on **why** the change exists, not what files changed.

## Usage

```
/pr [base-branch]
```

## Process

### 1. Resolve Base Branch

Follow this priority order — stop at the first match:

#### Priority 1 — Explicit arg

If user provided a base (e.g. `/pr main`, `/pr develop`), use it directly. Skip all detection.

#### Priority 2 — Auto-detect from upstream tracking

If no arg, infer the base from the current branch's upstream:

```bash
git rev-parse --abbrev-ref HEAD@{upstream} 2>/dev/null
```

**If the upstream resolves to a well-known base** (`origin/main`, `origin/master`, `origin/develop`), use it directly without asking. This covers >90% of cases.

**Rules:**
- Use the remote tracking ref as-is (e.g. `origin/main`), not the local branch — it reflects the actual merge target.
- Do NOT fetch — use the locally cached tracking ref. Fetching can disrupt fork structure and produce incorrect diffs.

#### Priority 3 — Interactive selection (ambiguous cases only)

Only ask the user when:
- The branch has **no upstream** configured, OR
- The upstream is a **non-standard branch** (not `origin/main`, `origin/master`, `origin/develop`) — this suggests a stacked/dependent branch where the base is ambiguous

When asking, run:
```bash
git branch -vv --sort=-committerdate | head -10
```

Present candidates with their upstream tracking status. Once user selects, proceed immediately.

### 2. Get the Diff

```bash
git log <base>..HEAD --oneline
git diff <base>..HEAD --stat
git diff <base>..HEAD
```

### 3. Understand the Purpose

Before writing anything, answer:
- **Why?** What was broken, missing, or painful?
- **So what?** What behavior changes for users/developers?
- **Now what?** What can they do now that they couldn't before?

Describe the outcome, not the implementation. If you catch yourself writing "Added X class" or "Modified Y file", stop and reframe around the user/developer impact.

### 4. Title

Format: `<prefix>(<scope>): <outcome>`

Prefixes: `feat` `bugfix` `refactor` `perf` `doc` `test` `chore`

Rules: lowercase, under 72 chars, describe outcome not action.

### 5. Description

Organize the description by **business or functional themes**, not by generic
importance buckets such as `Major` / `Minor`. Those labels hide the actual
shape of the change and force readers to infer what each bullet is about.

Each key change must use this form:

```markdown
- **Theme**: Describe the problem solved, the behavior change, and why it matters.
```

Choose concrete themes from the diff, such as a user workflow, lifecycle,
compatibility boundary, migration, safety guarantee, or developer experience.
Do not use file names, class names, or vague labels such as "Improvements",
"Miscellaneous", "Major", or "Minor" as themes.

Use `Key Changes` for everything that contributes directly to the PR's purpose.
If the diff also contains genuinely incidental work completed along the way,
append an optional `Minor` section after `Key Changes`. Omit the section when
there are no incidental changes; never invent or demote content just to fill it.

Treat the structure below as a starting point, not a rigid contract. Adapt the
headings and order to the change so the description answers the reviewer's real
questions with the least noise. Never output an empty or irrelevant section.

```markdown
## Summary
[1–2 sentences: what problem existed and what this solves]

## Key Changes

- **[Business or functional theme]**: [What behavior changes and why it matters]
- **[Business or functional theme]**: [What users or developers can now do]
- **[Compatibility, migration, or safety theme]**: [Technical guarantee that supports the outcome]
```

Only when incidental changes exist, append:

```markdown
## Minor

- **[Supporting theme]**: [Small cleanup, refactor, documentation, or test change made along the way]
```

`Minor` must not contain core behavior, required migration work, compatibility
guarantees, or safety protections. Those belong under their functional themes
in `Key Changes`, even when their implementation is small.

If the change leaves follow-up work, known limitations, rollout concerns, or
anything reviewers and operators must pay special attention to, add a `Notes`
section. State the consequence and next action when known; do not hide these
items inside `Minor`.

```markdown
## Notes

- **[Known limitation, follow-up, or attention point]**: [Impact, current status, and next action]
```

Add other sections when they make the PR easier to evaluate, such as
`Migration`, `Compatibility`, `Testing`, `Rollout`, `Risks`, or `Screenshots`.
Use the clearest domain-specific heading instead of forcing distinct concerns
into `Key Changes`, `Minor`, or `Notes`. The examples are guidance, not an
exhaustive list or required template.

Before outputting, verify:

- The summary explains the motivating problem and resolved outcome.
- Every bullet starts with a specific bold theme followed by a colon.
- Themes describe business capabilities or functional boundaries, not priority.
- Related changes are grouped under one theme instead of scattered across bullets.
- `Minor` appears only for genuinely incidental work and is omitted otherwise.
- No core outcome, migration, compatibility, or safety guarantee is placed in `Minor`.
- Outstanding work and special attention points are explicit in `Notes` when present.
- Additional sections are included only when they help reviewers evaluate the change.
- The final structure follows the change rather than mechanically copying the example.
- Technical details appear only when they explain behavior, compatibility, migration, or safety.
- A reviewer can scan only the bold themes and understand the shape of the PR.

### 6. Output

```
## Pull Request Ready

**Base**: <base> → **HEAD**: <branch>  |  N commits

**Title**
<title>

**Description**
<description block>

---

**Create PR:**
- GitHub: https://github.com/<owner>/<repo>/compare/<base>...<head>
- CLI: `gh pr create --title "<title>" --base <base>`  (paste Description above as body)
```

Resolve `<owner>`, `<repo>`, `<head>` from `git remote get-url origin`. Never embed the full body in the CLI command.

## Related Skills

- `/commit` — Commits must exist before creating PR
- `/cr` — Code review before PR review

---

**Version**: 1.4.0 | **Updated**: 2026-07-15
