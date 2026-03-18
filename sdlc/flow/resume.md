# /sdlc resume

Resume work by browsing and selecting from recent documentation in the `docs/` directory.

## Guideline

This skill helps users resume work after context switches (environment changes, parallel work, etc.) by:
1. Scanning the `docs/` directory for recent documentation
2. Extracting metadata from file frontmatter (title, date, status, type)
3. Presenting a concise summary for user selection
4. Providing quick access to continue the selected work

**Important**: This is for browsing and selection, NOT reading entire files. Extract only metadata and brief summaries.

## Output Format

```markdown
## Recent Work

Select a document to resume:

### Specifications
1. **SDLC Skills System v4** - `docs/spec/20260308-sdlc-skills-v4.md`
   - Date: 2026-03-08
   - Status: Design
   - Version: 4.0 (Flexible)

2. **Vibe Task Dispatcher** - `docs/spec/20260121-vibe-task-dispatcher.md`
   - Date: 2026-01-21

### Research
3. **Tingly Spec Extension** - `docs/research/20260223-tingly-spec-extension.md`
   - Date: 2026-02-23
   - Summary: VSCode extension for file reference completion

### Notes / Pencil
4. **SDLC v3.2 Flow** - `docs/pencil/2026-03-08-sdlc-v3.2-flow.md`
   - Date: 2026-03-08
   - Status: Design

### Architecture
5. **System Overview** - `docs/arch/overview-arch.md`
6. **Skills Architecture** - `docs/arch/skills-arch.md`

### Understanding Reports
7. **SDLC Skill Understanding** - `docs/understand/20260308-sdlc-skill-understanding.md`

---
Reply with a number (1-7) to open that document, or specify the file path directly.
```

## Metadata Extraction

For each markdown file, extract:
- **Title**: First `#` heading or `title` in frontmatter
- **Date**: `Date` or `date` field in frontmatter, or file modification time
- **Status**: `Status` or `status` field if present
- **Type/Version**: Any version or type information
- **Summary**: Brief description from frontmatter `Summary` or first paragraph after heading

**Do NOT read full file content** - only read the first ~50 lines to extract metadata.

## Directory Structure

Scan these directories in order:

```
docs/
├── spec/       # Specifications
├── research/   # Research documents
├── pencil/     # Quick notes
├── arch/       # Architecture cache
├── understand/ # Understanding reports
├── verify/     # Verification reports
├── cr/         # Code review reports
├── report/     # General work reports
└── archive/    # Archived docs (show last, mark as archived)
```

## Selection Actions

After user selects a document by number:
1. Read the selected file
2. Display key information:
   - Full title and metadata
   - Status/completion state
   - Next steps or TODO items if present
   - Quick summary of content
3. Suggest next actions:
   - Continue editing
   - Move to next phase
   - Review and complete

## Completion Conditions

- [ ] Scanned all docs/ subdirectories
- [ ] Extracted metadata from markdown files
- [ ] Presented grouped by type with dates
- [ ] User can select by number or path
- [ ] Selected document provides context and next steps

## No Documents Found

If `docs/` is empty or doesn't exist:

```markdown
## No Recent Work Found

The `docs/` directory is empty or doesn't exist.

Start new work:
- `/sdlc start quick "Small change description"`
- `/sdlc start feature "New feature description"`
- `/sdlc understand` - Build architecture cache
- `/sdlc spec "Feature name"` - Write specification
```
