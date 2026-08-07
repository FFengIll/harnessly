# /pr

Prepare a pull request handoff for **human submission**: a title, description,
and clickable GitHub link. Focus the content on **why** the change exists, not
what files changed.

## Usage

```
/pr [base-branch]
```

## Execution Boundary

This skill prepares PR materials for the user to submit manually. Mentioning
"PR" means writing the PR title and content and providing a clickable submission
link — it does not authorize publishing automation.

This skill may perform read-only inspection of local Git history, diffs, branch
tracking, and remote URLs.

**NEVER perform remote writes:**

- Do not push a branch.
- Do not run `gh pr create`.
- Do not call an API or connector to create or update a pull request.
- Do not submit, publish, merge, close, or otherwise mutate a pull request.
- Do not infer permission for any of these actions from phrases such as
  "write a PR", "prepare a PR", or "PR this change".

If the branch is not available on the remote, still provide the intended GitHub
compare/create link and clearly state that the user must publish the branch
before the link can create a PR. Remote publishing belongs to a separate,
explicitly invoked publishing workflow.

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

Be **reasonably concise, not exhaustive**. Say what changed and why it
matters; do not catalogue every nuance the diff touches. The same point
reworded across the title, Summary, a Key Changes bullet, and Notes is
padding, not detail. Rules:

- **One fact, one place.** If the title states it, the Summary must not
  re-explain it — only add what the title cannot carry (the *why*).
- **Each bullet earns its line.** Before writing a bullet, ask whether the point
  is already made elsewhere; if so, cut it. Two bullets must not say the same
  thing at different altitudes.
- **Summary ≠ title reworded.** It states the motivating problem and the
  resolved outcome in 1–2 sentences — not a paraphrase of the title.
- **Notes ≠ Key Changes echoed.** Notes hold only what a reviewer must act on
  or watch out for. Do not restate that a change is safe when a Key Changes
  bullet already implies it.
- **Pick the shorter phrasing** when two carry equal information.

Each key change is one bullet. **Reasonably concise, not exhaustive.**

```markdown
- **Theme**: The behavior change, in one clause.
```

Write one clause per bullet. Add a second clause only when it changes the
meaning (a *why*, a *so-what*, or a *before/after*); never stack all three.
If a bullet needs a third clause to make sense, split it into two bullets.
Prefer the phrasing that carries the same information in fewer words.

Before-and-after, same change:

- Verbose: `- **Tool-call ID fidelity**: Responses→Anthropic now emits the
  upstream call_id as the tool-use id so that multi-turn tool calls round-trip
  the call identifier clients send rather than the synthetic item id, which
  fixes broken tool-result correlation on the Responses→Anthropic path.`
- Concise: `- **Tool-call ID fidelity**: Responses→Anthropic tool-use now
  carries the upstream \`call_id\`, fixing multi-turn tool-result correlation.`

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

Before outputting, run the brevity gate:

- **No restatement.** Nothing appears in more than one place (title / Summary /
  a bullet / Notes). If a point is already made, cut the duplicate.
- **No padding.** Each bullet earns its line with new information — not a
  re-explanation, not a "this is safe" reassurance, not a hedge.
- **Scannable.** A reviewer reading only the bold themes understands the shape
  of the PR; the clauses after each colon add the essential *what*/*why* only.
- **Right structure.** Themes are functional boundaries, not priority;
  incidental work is under `Minor` only; outstanding work is in `Notes`.

### 6. Output

Emit the handoff as a **single copyable Markdown block** so the user can copy
title + description in one click. Open the block with a 3-backtick ```` ```markdown ````
fence and close it with 3 backticks. Keep the block focused on what the user
pastes into the PR form: title and description only.

Place the GitHub submission link **outside and after** the block, as a normal
clickable Markdown link. Keeping it outside the fenced block ensures it stays
clickable (a URL inside a code block is not a link).

Below is the exact shape to emit. In this instruction file the template is
wrapped in a 4-backtick fence (``````) so the inner 3-backtick fence renders
as literal guidance; the handoff you actually emit to the user must use a
3-backtick ` ```markdown ` fence.

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

Resolve `<owner>`, `<repo>`, and `<head>` from `git remote get-url origin`.
Return the GitHub URL as a clickable Markdown link. Do not output commands that
create, update, or publish a PR.

If the branch is not yet on the remote, still print the link and note that the
user must publish the branch before the link can create a PR.

## Related Skills

- `/commit` — Commits must exist before creating PR
- `/cr` — Code review before PR review
- Publishing workflow — Must be invoked separately and explicitly when the user
  wants remote mutation

---

**Version**: 1.8.0 | **Updated**: 2026-08-06
