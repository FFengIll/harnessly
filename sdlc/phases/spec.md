# Specification Phase Skill

Creates detailed technical specification documents based on research findings and requirements.

## Usage

```
/sdlc spec [title]
```

## Guideline

**ALWAYS follow this sequence:**

1. **Understand First, Design Before Action**
   - Read the user's request and understand the intent
   - Review any existing research findings
   - Think about the problem before jumping to solution
   - Design the approach in your head first

2. **Read Architecture Cache**
   - Check `./.sdlc/docs/arch/` for existing architecture documents
   - Priority order: component → module → project overview
   - Use cached architecture info to reduce code searching and reading
   - If no relevant cache exists, generate it first with `/sdlc understand [scope]`

3. **Write the Spec Document**
   - Save to `./.sdlc/docs/category-feature-date.spec.md`
   - Write the spec along with your understanding and design decisions
   - Keep specs key-focused and guiding-oriented
   - Pay attention to model definitions and file/module/function abstractions

4. **Output the Design**
   - After writing the spec, present the design to the user
   - Use `askUserQuestion` tool to communicate with the user
   - Use `pencil` skill to show design in text-based graph if helpful

## Architecture Cache

Architecture cache speeds up spec creation by reusing existing understanding.

### Reading Cache

Priority order (most specific first):
```bash
.sdlc/docs/arch/[module]/[sub]/[comp]-arch.md  # Component (~3 days)
.sdlc/docs/arch/[module]/[sub]-arch.md          # Sub-module (~7 days)
.sdlc/docs/arch/[module]-arch.md                # Module (~14 days)
.sdlc/docs/arch/overview-arch.md                # Project (~30 days)
```

### Cache Freshness

TTL values are reference guidelines:
- Project level: ~30 days
- Module level: ~14 days
- Component level: ~7 days

If cache is expired or missing, regenerate using `/sdlc understand [scope]`.

**See also**: `.sdlc/docs/arch/ARCH_CACHE_SYSTEM.md` for full documentation

## Output Format

Spec files are saved to `.sdlc/docs/category-feature-date.spec.md`

**Filename format**: `category-feature-date.type.md`
- `category` - Module/category (e.g., `auth`, `payment`, `user`)
- `feature` - Feature description in kebab-case (e.g., `user-login`, `oauth-integration`)
- `date` - Date in YYYYMMDD format
- `type` - Document type (`spec` for specifications)

**Examples**:
- `auth-user-login-20240319.spec.md`
- `payment-stripe-checkout-20240319.spec.md`
- `user-profile-edit-20240319.spec.md`

Include:
- Overview and scope
- Requirements (functional and non-functional)
- User stories/use cases
- Data structures and schemas
- API endpoints and contracts
- Component interfaces
- State management approach
- Error handling strategy
- Security considerations
- Testing strategy
- Dependencies
- Implementation phases
- Open questions
- Alternatives considered

## Frontend Notes

- Use the same tech stack, components, theme, and design patterns
- Understand user intent and implement good design
- Replacement solutions are allowed for locale and text

## Backend Notes

- Pay attention to current file structure
- List directories with limited depth
- Write necessary tests following language conventions
- Handle special test cases carefully

## IMPORTANT

- You can use `askUserQuestion` to communicate with the user or let them choose
- You can use `pencil` skill to show design in text-based graph
- DO NOT make spec documents too long and verbose; keep them key-focused

## Examples

### Example 1: Feature with Existing Cache

```bash
/sdlc spec "Add OAuth to Auth"
# Reads .sdlc/docs/arch/auth-arch.md for context
# Writes .sdlc/docs/auth-oauth-integration-20240319.spec.md
```

### Example 2: Feature Requiring New Cache

```bash
/sdlc understand auth/providers    # Create cache first
/sdlc spec "Add SAML Provider"     # Then write spec as auth-saml-provider-20240319.spec.md
```

## Integration

**Workflow Position:** Research → **Spec** → Coding

The spec phase translates research findings and architecture understanding into a concrete implementation plan.

## Related Skills

- **understand.md** - Generates architecture cache
- **doc.md** - Create and save specification documents
- **pencil.md** - Create diagrams for specifications
- **research.md** - Previous phase: provides foundation
- **coding.md** - Next phase: implements based on spec