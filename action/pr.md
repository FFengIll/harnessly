# /pr

Prepare a pull request handoff for **human submission**: a title, a description,
and a clickable GitHub link. Focus on **why** the change exists, not what files
changed.

## Usage

```
/pr [base-branch]
```

## Execution Boundary

- **Read-only**: may inspect local git history, diffs, branch tracking, and
  remote URLs.
- **NEVER perform remote writes**: no `git push`, no `gh pr create`, no API or
  connector call that creates, updates, merges, closes, or otherwise mutates a
  PR.
- Phrases like "write a PR", "prepare a PR", "PR this change" do **not**
  authorize publishing. Remote publishing is a separate, explicitly invoked
  workflow.
- If the branch is not on the remote, still emit the compare link and state
  that the user must publish the branch first.

## Process

### 1. Resolve Base Branch

Priority order — stop at the first match:

1. **Explicit arg** (e.g. `/pr main`, `/pr develop`): use it directly, skip
   detection.
2. **Upstream tracking**: `git rev-parse --abbrev-ref HEAD@{upstream}`.
   - If it resolves to a well-known base (`origin/main`, `origin/master`,
     `origin/develop`), use it without asking.
   - Use the remote tracking ref as-is (`origin/main`), not the local branch —
     it reflects the actual merge target.
   - Do **not** fetch — the locally cached ref is intentional; fetching can
     disrupt fork structure and produce incorrect diffs.
3. **Ask the user** — only when the branch has no upstream, or the upstream is
   non-standard (suggests a stacked branch with an ambiguous base). Show
   candidates via `git branch -vv --sort=-committerdate | head -10`, then
   proceed immediately after selection.

### 2. Inspect the Change

```bash
git log <base>..HEAD --oneline
git diff <base>..HEAD --stat
git diff <base>..HEAD
```

Before writing anything, answer:

- **Why?** What was broken, missing, or painful?
- **So what?** What behavior changes for users/developers?
- **Now what?** What can they do now that they couldn't before?

Describe the outcome, not the implementation — never "Added X class" or
"Modified Y file".

### 3. Title

- Format: `<prefix>(<scope>): <outcome>`
- Prefixes: `feat` `bugfix` `refactor` `perf` `doc` `test` `chore`
- Lowercase, under 72 chars, outcome not action.

### 4. Description

**Length budget — hard caps, not suggestions.** Default to the floor of each
range; only approach the cap when the diff genuinely demands it. When over
budget, **cut bullets, don't compress wording** — merging two points into one
dense line still fails the budget.

| Diff size | Summary | Key Changes | Optional sections | Total |
|---|---|---|---|---|
| Small (< ~100 lines or 1–2 commits) | 1 sentence | ≤ 3 bullets | none | ≤ 8 lines |
| Medium | ≤ 2 sentences | ≤ 5 bullets | ≤ 1 section, ≤ 2 bullets | ≤ 15 lines |
| Large (multi-feature / migration) | ≤ 2 sentences | ≤ 7 bullets | ≤ 2 sections, ≤ 3 bullets each | ≤ 25 lines |

- One bullet = one line after wrapping (~15 words after the colon). A bullet
  that wraps to 3+ lines is a paragraph — rewrite or split.
- The budget is the **default output**. Only exceed it when the user
  explicitly asks for a detailed description in this invocation.

Base structure — adapt headings and order to the change; never emit an empty
or irrelevant section:

```markdown
## Summary
[1–2 sentences: the motivating problem and the resolved outcome]

## Key Changes

- **[Business or functional theme]**: [behavior change and why it matters]
```

Optional sections:

- `## Minor` — genuinely incidental work done along the way (small cleanups,
  docs, tests). Never core behavior, migrations, compatibility guarantees, or
  safety protections — those stay in `Key Changes` even when small. Omit when
  empty; never invent or demote content to fill it.
- `## Notes` — only what reviewers/operators must act on or watch: limitations,
  follow-ups, rollout concerns. State the consequence and next action.
- Other domain headings (`Migration`, `Compatibility`, `Testing`, `Rollout`,
  `Risks`, `Screenshots`, …) when they make the PR easier to evaluate.

Theme rules:

- Themes are concrete functional boundaries: a user workflow, lifecycle,
  compatibility boundary, migration, safety guarantee, developer experience.
- Never use file names, class names, or vague labels ("Improvements",
  "Miscellaneous", "Major", "Minor") as themes.

Bullet rules:

- One key change = one bullet: `- **Theme**: the behavior change, in one
  clause.`
- Add a second clause only when it changes the meaning (a *why*, a *so-what*,
  or a *before/after*). If a third clause is needed, split into two bullets.
- Example, same change:
  - Verbose: `- **Tool-call ID fidelity**: Responses→Anthropic now emits the
    upstream call_id as the tool-use id so that multi-turn tool calls
    round-trip the call identifier clients send rather than the synthetic item
    id, which fixes broken tool-result correlation.`
  - Concise: `- **Tool-call ID fidelity**: Responses→Anthropic tool-use now
    carries the upstream \`call_id\`, fixing multi-turn tool-result
    correlation.`

Brevity gate — check before output:

- **Within budget.** Count lines against the table above; if over, delete the
  weakest bullets until it fits. Deleting is the fix — not tighter wording.
- **One fact, one place.** Nothing repeats across title / Summary / bullets /
  Notes. The Summary adds what the title cannot carry (the *why*); Notes never
  echo `Key Changes`.
- **Each bullet earns its line.** No re-explanations, no "this is safe"
  reassurances, no hedges; two bullets must not say the same thing at
  different altitudes.
- **Pick the shorter phrasing** when two carry equal information.
- **Scannable.** Reading only the bold themes reveals the shape of the PR.

### 5. Output

- Emit the handoff as a **single copyable Markdown block**: open with a
  3-backtick ```` ```markdown ```` fence, close with 3 backticks. Content:
  title + description only — what the user pastes into the PR form.
- Place the GitHub link **outside and after** the block as a normal Markdown
  link (a URL inside a code block is not clickable).
- Resolve `<owner>`, `<repo>`, `<head>` from `git remote get-url origin`. Do
  not output commands that create, update, or publish a PR.

Exact shape to emit (wrapped here in a 4-backtick fence so the inner fence
renders as literal guidance):

````
```markdown
## Pull Request Handoff

**Base**: <base> → **HEAD**: <branch>  |  N commits

**Title**
<title>

**Description**
<description block>
```
````

---

**Submit manually:**
- GitHub: https://github.com/<owner>/<repo>/compare/<base>...<head>?expand=1

---

**Version**: 2.1.0 | **Updated**: 2026-08-07
