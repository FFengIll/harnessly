# /commit

Create one or more focused Git commits for the active task. Classify changes
before staging so related work stays together and unrelated work stays untouched.

## Usage

```text
/commit [optional message]
/sdlc commit [optional message]
```

An explicit message applies only when the work forms one coherent group.
Generate separate messages when multiple commits are needed.

## Contract

Treat `commit` as a request to commit the active task, not the whole working
tree.

- Inspect staged, unstaged, and untracked changes before staging.
- Group by purpose, issue, dependency, and independent review/revert boundaries.
- Keep code with directly required tests, schema/codegen, and documentation.
- Split changes that can be safely reviewed, reverted, or shipped independently.
- Leave unrelated changes untouched and report them at the end.
- Preserve pre-existing staged changes. If the index mixes unrelated work, stop
  before changing it and explain the conflict.
- Never use `git add .`, `git add -A`, `git commit -a`, or broad globs.
- Never commit secrets, credentials, environment files, build artifacts, editor
  state, logs, or temporary files.

## Workflow

### 1. Inventory

```bash
git status --short
git diff
git diff --cached
```

Identify:

- Changes belonging to the active task.
- Changes outside the task or predating it.
- Existing staged changes.
- Files containing hunks from different purposes.

### 2. Classify

Create a plan before staging:

```text
Commit 1 — <purpose>
  type: <feat|bugfix|refactor|test|doc|chore|...>
  files/hunks: <exact scope>
  verification: <relevant checks>

Commit 2 — <purpose>
  ...

Leave uncommitted:
  <path>: <reason>
```

Use one commit when all changes implement one atomic outcome. Use multiple
commits when groups are independently meaningful. Relatedness matters more than
file type: do not automatically split tests or required docs from their code,
and do not combine unrelated files merely because they changed together.

If one file contains unrelated hunks, stage only the relevant patch. If safe
separation is impossible, ask for direction instead of mixing purposes.

### 3. Commit Each Group

Process one group at a time:

```bash
git add <exact-related-paths>
git diff --cached --check
git diff --cached
git commit -m "<type>: <focused subject>"
```

Before each commit:

- Confirm every staged path and hunk belongs to the group.
- Run checks proportionate to that group's risk.
- Use a message describing only that outcome.

After each commit, inspect `git status --short` again before staging the next
group.

### 4. Audit

```bash
git status --short
git log -n <created-count> --oneline
```

Report:

- Commits created, in order.
- Verification performed for each group.
- Remaining dirty files and why they were excluded.

## Commit Messages

Use:

```text
<type>: <imperative outcome>
```

Common types: `feat`, `bugfix`, `refactor`, `perf`, `test`, `doc`, `chore`,
`ci`, `command`, `mv`.

Keep the subject focused and preferably under 50 characters. Explain why in a
body only when the subject and diff do not make the reason clear.

## SDLC Checks

When invoked through `/sdlc commit`, use the applicable outputs from earlier
workflow stages:

- Tests and validation for changed behavior.
- Security results for sensitive changes.
- Review approval when the workflow requires it.
- Spec or generated artifacts only when directly relevant.

Do not claim a check passed when it was not run. If a check fails for a known
unrelated reason, report that precisely and commit only when the user request
and repository policy still permit it.

## Failure Boundaries

- On a commit-hook failure, fix the cause and create a new commit attempt; do
  not amend a commit that was never created.
- Do not unstage or rewrite user-owned index state without approval.
- Do not amend, squash, rebase, push, or create a PR unless separately requested.

## Next Step

`/sdlc pr` prepares a title, description, and clickable link for human
submission. It does not publish the branch or create the PR.

---

**Version**: 1.2.0 | **Updated**: 2026-07-23
