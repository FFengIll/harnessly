# SDLC Documentation System - Verification Harness

**Date**: 2026-03-19
**Criticality**: HIGH (System Integrity)
**Scope**: Complete SDLC documentation structure and conventions

## Overview

This harness defines the invariant properties and validation rules for the SDLC documentation system. It ensures that all SDLC documentation follows consistent naming conventions, structural requirements, and maintains traceability across the development lifecycle.

**Purpose**: Validate that the SDLC documentation system remains consistent, discoverable, and maintainable.

---

## Invariants

### INV-001: Flat Documentation Structure
**MUST hold**: All user-facing documentation files MUST reside in `.sdlc/docs/` with NO subdirectories (except `arch/` for cache).

**Validation:**
- [ ] No user-facing docs in subdirectories like `spec/`, `cr/`, `test/`, etc.
- [ ] Architecture cache remains in `.sdlc/docs/arch/` (only allowed subdirectory)
- [ ] All files follow flat naming: `category-feature-date.type.md`

**Dependency**: File System → Documentation Conventions

**Failure Impact**: HIGH - Breaks discoverability and filtering

### INV-002: Filename Format Consistency
**MUST hold**: Every documentation file MUST follow `category-feature-date.type.md` format.

**Validation:**
- [ ] Category is lowercase, identifies module/domain
- [ ] Feature is kebab-case, describes what the doc is about
- [ ] Date is YYYYMMDD format
- [ ] Type suffix with dot: `.spec.md`, `.cr.md`, `.test.md`, etc.

**Examples:**
- ✅ `auth-user-login-20260319.spec.md`
- ✅ `payment-stripe-checkout-20260319.cr.md`
- ❌ `spec/login.md` (old format)
- ❌ `auth-login-spec.md` (missing date)

**Dependency**: Documentation Conventions → File Naming

**Failure Impact**: HIGH - Breaks filtering and sorting

### INV-003: Type Suffix Consistency
**MUST hold**: Each document type MUST use its designated type suffix.

**Validation:**
- [ ] `.spec.md` - Specifications ONLY
- [ ] `.cr.md` - Code review reports ONLY
- [ ] `.research.md` - Research documents ONLY
- [ ] `.harness.md` - Verification harnesses ONLY
- [ ] `.test.md` - Test reports ONLY
- [ ] `.validate.md` - Validation reports ONLY
- [ ] `.secure.md` - Security reports ONLY
- [ ] `.debug.md` - Debug reports ONLY
- [ ] `.understand.md` - Understanding reports ONLY
- [ ] `.coding.md` - Implementation guidance ONLY
- [ ] `.commit.md` - Commit logs ONLY
- [ ] `.pr.md` - PR logs ONLY

**Failure Impact**: MEDIUM - Breaks type-based filtering

### INV-004: Architecture Cache Isolation
**MUST hold**: Architecture cache files MUST remain in `.sdlc/docs/arch/` and follow cache naming conventions.

**Validation:**
- [ ] Cache files end with `-arch.md`
- [ ] Cache files use format: `[scope]-arch.md` or `[timestamp]-[scope]-arch.md`
- [ ] Cache directory is the ONLY allowed subdirectory under `docs/`

**Examples:**
- ✅ `.sdlc/docs/arch/overview-arch.md`
- ✅ `.sdlc/docs/arch/auth-arch.md`
- ✅ `.sdlc/docs/arch/sdlc-skill-arch.md`

**Failure Impact**: MEDIUM - Breaks cache system

---

## Usage Flows

### FLOW-001: Creating New Documentation
**Entry**: User initiates any SDLC phase (`/sdlc spec`, `/sdlc cr`, etc.)

**Exit**: Document created in correct location with correct filename

**Steps:**
1. Phase skill invoked (e.g., `/sdlc spec "Add OAuth"`)
2. Determine category from context (e.g., `auth` for OAuth feature)
3. Generate feature description (e.g., `oauth-integration`)
4. Get current date (e.g., `20260319`)
5. Determine type from phase (e.g., `spec`)
6. Create file: `auth-oauth-integration-20260319.spec.md`

**Validation Points:**
- [ ] File created in `.sdlc/docs/` (not in subdirectory)
- [ ] Filename follows format exactly
- [ ] Category is relevant to content
- [ ] Type matches the phase that created it

**Failure Modes:**
- Wrong location → Reject, use correct path
- Wrong format → Reject, follow naming convention
- Missing date → Use current date

**Dependency Chain**: Phase Command → Filename Generation → File Creation

### FLOW-002: Finding Existing Documents
**Entry**: User or AI needs to find existing documentation

**Exit**: Relevant documents located and retrieved

**Steps:**
1. Determine search criteria (category, type, feature, date range)
2. Use glob patterns to filter:
   - By type: `*.spec.md`, `*.cr.md`
   - By category: `auth-*.md`, `payment-*.md`
   - By feature: `oauth-integration-*.md`
3. Sort results by date (newest first)
4. Present options or auto-select most recent

**Validation Points:**
- [ ] Glob patterns work correctly
- [ ] Date sorting is accurate
- [ ] No documents in wrong locations are missed

**Dependency Chain**: Search Query → Glob Pattern → File List → Selection

### FLOW-003: Documentation Migration
**Entry**: Existing files in old format detected

**Exit**: Files migrated to new format, old locations cleaned up

**Steps:**
1. Scan for files in old structure (`spec/`, `cr/`, etc.)
2. Extract metadata from old filenames
3. Generate new filename following `category-feature-date.type.md`
4. Move file to `.sdlc/docs/` root
5. Remove empty old directories

**Validation Points:**
- [ ] All files migrated
- [ ] No data loss
- [ ] Old directories removed
- [ ] New files follow naming convention

**Dependency Chain**: Old Format Detection → Metadata Extraction → New Name Generation → File Migration → Cleanup

---

## Functional Constraints

### CONSTR-001: Filename Length
**MUST enforce**: Maximum filename length of 255 characters (OS limit).

**Validation:**
- [ ] `category-feature-date.type.md` ≤ 255 chars
- [ ] If exceeded, abbreviate feature description
- [ ] Preserve meaningful information in abbreviated form

### CONSTR-002: Date Format
**MUST enforce**: Date MUST be in YYYYMMDD format.

**Validation:**
- [ ] Exactly 8 digits
- [ ] Valid date (month 01-12, day appropriate for month)
- [ ] Date reflects document creation date

### CONSTR-003: Category Values
**MUST enforce**: Category MUST be from predefined set or user-defined module name.

**Predefined Categories:**
- `sdlc` - SDLC system documentation
- `auth` - Authentication/authorization
- `payment` - Payment processing
- `user` - User management
- `api` - API endpoints
- `frontend` - Frontend components
- `backend` - Backend services
- `infra` - Infrastructure
- `tools` - Development tools
- `vibely` - Vibely-specific
- `tingly` - Tingly-specific

**Validation:**
- [ ] Category is lowercase
- [ ] Category contains only letters and numbers
- [ ] Category is hyphenated if multi-word

### CONSTR-004: Feature Description
**MUST enforce**: Feature description MUST be kebab-case and descriptive.

**Validation:**
- [ ] Only lowercase letters, numbers, and hyphens
- [ ] No leading/trailing hyphens
- [ ] Descriptive enough to identify content
- [ ] Meaningful keywords included

---

## Dependency Chains

### DEP-001: Document Creation
**Trigger**: SDLC phase command invoked

**MUST cascade:**
1. Command parsed (phase identified)
2. Type determined from phase
3. Category inferred from context or user input
4. Feature description generated
5. Date obtained
6. Filename constructed
7. File created at `.sdlc/docs/category-feature-date.type.md`

**Validation Order:**
- [ ] Phase recognized
- [ ] Type mapped correctly
- [ ] Category determined
- [ ] Filename constructed
- [ ] File created successfully

**Criticality**: HIGH (Core functionality)

### DEP-002: Document Discovery
**Trigger**: Search/query for documentation

**MUST cascade:**
1. Search criteria parsed
2. Glob pattern constructed
3. File system queried
4. Results filtered and sorted
5. Documents returned

**Validation Order:**
- [ ] Query parsed correctly
- [ ] Glob pattern valid
- [ ] File system accessible
- [ ] Results include all matches
- [ ] Sorting correct (date descending)

**Criticality**: HIGH (Discoverability)

### DEP-003: Architecture Cache System
**Trigger**: `/sdlc understand` command or cache read

**MUST cascade:**
1. Cache location determined (`.sdlc/docs/arch/`)
2. Cache level selected (overview/module/component)
3. Cache file read or created
4. Hash compared for freshness
5. Cache returned or regenerated

**Validation Order:**
- [ ] Cache directory exists
- [ ] Cache file found or created
- [ ] Hash validation performed
- [ ] Fresh cache returned

**Criticality**: MEDIUM (Performance optimization)

---

## Negative Cases

### NEG-001: Prevent Directory Proliferation
**MUST NOT allow:**
- [ ] Creating new subdirectories under `.sdlc/docs/` (except `arch/`)
- [ ] Storing user docs in phase-specific directories
- [ ] Hiding documents in deep nesting

**Enforcement:**
- Phase skills MUST create files directly in `.sdlc/docs/`
- Cache is ONLY exception (`.sdlc/docs/arch/`)
- Reject any attempt to create elsewhere

### NEG-002: Prevent Inconsistent Naming
**MUST NOT allow:**
- [ ] Mixed naming conventions
- [ ] Missing date in filename
- [ ] Wrong type suffix
- [ ] Case inconsistency in category

**Enforcement:**
- Validate filename format on creation
- Reject files not following pattern
- Auto-correct when possible

### NEG-003: Prevent Data Loss During Migration
**MUST NOT allow:**
- [ ] Overwriting existing files without confirmation
- [ ] Deleting files before successful migration
- [ ] Losing metadata during migration

**Enforcement:**
- Create backup before migration
- Verify copy before delete
- Confirm with user on conflicts

---

## Validation Checklist

### Pre-Implementation (System Design)
- [ ] All invariants documented
- [ ] All flows have entry/exit criteria
- [ ] All constraints have measurable thresholds
- [ ] All negative cases covered
- [ ] Dependency chains mapped

### Post-Implementation (System Validation)
- [ ] Filename format enforced by all phase skills
- [ ] Flat structure maintained
- [ ] Filtering by type works correctly
- [ ] Filtering by category works correctly
- [ ] Date sorting works correctly
- [ ] Migration script tested

### Continuous Validation
- [ ] New documents follow naming convention
- [ ] No subdirectories created (except `arch/`)
- [ ] Type suffixes consistent
- [ ] Cache system functional
- [ ] Documentation discoverable

### Code Review
- [ ] All phase skills updated with new format
- [ ] Examples in documentation updated
- [ ] Migration script available
- [ ] Backup/restore process documented

---

## Test Cases

### TC-001: Create Spec Document
**Input**: `/sdlc spec "Add OAuth to auth system"`

**Expected Output**:
- File created: `.sdlc/docs/auth-oauth-integration-YYYYMMDD.spec.md`
- File in correct location (docs root, not subdirectory)
- Filename format validated

**Verification**:
```bash
ls .sdlc/docs/auth-oauth-integration-*.spec.md
# Should return exactly one file
```

### TC-002: Filter by Type
**Input**: Find all spec documents

**Expected Output**:
```bash
ls .sdlc/docs/*.spec.md
# Returns all spec documents, no other types
```

**Verification**:
- Only `.spec.md` files returned
- No files in subdirectories returned

### TC-003: Filter by Category
**Input**: Find all auth-related documents

**Expected Output**:
```bash
ls .sdlc/docs/auth-*.md
# Returns all auth docs regardless of type
```

**Verification**:
- Only files starting with `auth-` returned
- Includes all types (spec, cr, test, etc.)

### TC-004: Date Sorting
**Input**: List documents sorted by date

**Expected Output**:
```bash
ls -t .sdlc/docs/*.spec.md
# Returns specs with newest first
```

**Verification**:
- Date in filename used for sorting
- Correct chronological order

### TC-005: Migration from Old Format
**Input**: Old format file `.sdlc/docs/spec/login.md`

**Expected Output**:
- File migrated to `.sdlc/docs/auth-user-login-YYYYMMDD.spec.md`
- Old directory removed if empty

**Verification**:
- New file exists
- Old file gone
- Content preserved
- Format correct

---

## Implementation Notes

### Phase Skills to Update
All phase skills must:
1. Use new filename format when creating documents
2. Create files in `.sdlc/docs/` (flat structure)
3. Map phase to correct type suffix
4. Infer or request category from context

### Migration Script
Must:
1. Scan existing directories (`spec/`, `cr/`, `test/`, etc.)
2. Extract metadata from old filenames
3. Generate new filenames
4. Move files to `.sdlc/docs/`
5. Remove empty old directories
6. Create backup before starting

### Validation Tools
Create helper scripts:
1. `validate-filenames.sh` - Check all filenames follow format
2. `check-structure.sh` - Ensure no unauthorized subdirectories
3. `migrate-docs.sh` - Automated migration from old format

---

## Related Documentation

- **Spec**: `.sdlc/docs/sdlc-directory-structure-review-20260318.cr.md` - Original review that prompted this change
- **Main**: `sdlc/sdlc.md` - SDLC main documentation
- **Phases**: `sdlc/phases/*.md` - Individual phase implementations
