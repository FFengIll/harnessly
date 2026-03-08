# Specification Phase Skill

Creates detailed technical specification documents based on research findings and requirements.

## Usage

```
/sdlc spec [title]
```

## Description

The specification phase skill creates comprehensive technical specification documents that define what will be built, how it will work, and how different components interact. Specs serve as the blueprint for implementation and should be detailed enough to guide development work.

### When to Use

- After completing research and selecting an approach
- Before starting implementation work
- When requirements need to be formally documented
- For features requiring coordination across multiple developers
- To document API contracts and data structures

## Process

1. **Review Research and Requirements**
   - Review research phase findings
   - Clarify functional and non-functional requirements
   - Identify dependencies and constraints

2. **Check Architecture Cache**
   - Look for existing architecture cache in `docs/arch/*-arch.md`
   - Read most specific cache available (component → module → project)
   - Use cached architecture info to inform design decisions
   - Skip redundant code analysis if cache is fresh
   - Generate new cache if needed for the scope

3. **Structure the Specification**
   - Define the feature/system scope
   - Document user stories or use cases
   - Specify APIs and data structures
   - Define component interactions
   - Include technical considerations

4. **Add Technical Details**
   - Data models and schemas
   - API endpoints and contracts
   - State management approach
   - Error handling strategy
   - Performance considerations

5. **Document Edge Cases and Considerations**
   - Error scenarios
   - Validation rules
   - Security considerations
   - Testing approach

6. **Save to Documentation**
   - Save to docs/spec/ directory
   - Use descriptive filename with date: `YYYYMMDD-[title]-spec.md`
   - Include version and status

## Architecture Cache Integration

### Reading Cache

Before writing the spec, check for relevant architecture cache:

```bash
# Priority order (most specific first)
docs/arch/[module]/[sub]/[comp]-arch.md  # Component level
docs/arch/[module]/[sub]-arch.md          # Sub-module level
docs/arch/[module]-arch.md                # Module level
docs/arch/overview-arch.md                # Project level
```

### Cache Freshness (TTL Reference)

| Level | TTL Reference | Use for Spec |
|-------|---------------|--------------|
| Project | ~30 days | Cross-module features, system design |
| Module | ~14 days | Module-specific features |
| Sub-module | ~7 days | Component features |
| Component | ~3 days | Detailed implementation specs |

> **Note**: TTL values are reference guidelines only. Actual cache freshness depends on code changes.

### Writing Cache

If the spec requires understanding a new area:

1. Generate appropriate cache level
2. Save to `docs/arch/[YYYYMMDD]-[scope]-arch.md`
3. Include hash for change detection
4. Reference in spec document

### Benefits

- **Reduce code reading**: Use cached architecture info
- **Faster spec creation**: Skip redundant analysis
- **Consistent context**: Share architecture understanding across specs
- **Smart invalidation**: Auto-refresh when code changes

**See also**: `docs/arch/ARCH_CACHE_SYSTEM.md` for full documentation

## Specification Template

### [Spec Title]

**Status:** Draft | In Review | Approved
**Last Updated:** YYYY-MM-DD
**Author:** [Name]

---

## Overview

**Purpose:** [Brief description of what this spec defines]

**Scope:** [What's included and what's out of scope]

**Background:** [Context, why this is needed, any research references]

---

## Requirements

### Functional Requirements
- [Requirement 1]
- [Requirement 2]
- [Requirement 3]

### Non-Functional Requirements
- [Performance requirements]
- [Security requirements]
- [Accessibility requirements]
- [Compatibility requirements]

---

## User Stories / Use Cases

### Use Case 1: [Title]
**Actor:** [User role]
**Goal:** [What they want to accomplish]
**Steps:**
1. [Step 1]
2. [Step 2]
3. [Step 3]

**Success Criteria:** [How we know it works]

### Use Case 2: [Title]
[...]

---

## Architecture and Design

### System Overview
[High-level description of how the system works]

### Components
- **[Component A]:** [Purpose and responsibilities]
- **[Component B]:** [Purpose and responsibilities]
- **[Component C]:** [Purpose and responsibilities]

### Data Flow
[Description of how data flows through the system]

---

## Data Structures

### [Data Model A]
```typescript
interface [ModelName] {
  // fields
}
```
**Fields:**
- `field`: Type - Description
- `field`: Type - Description

**Validation Rules:**
- [Rule 1]
- [Rule 2]

### [Data Model B]
[...]

---

## API Specification

### [Endpoint Group]

#### GET /api/resource
**Description:** [What this endpoint does]

**Request:**
```typescript
interface GetResourceRequest {
  // request body or query params
}
```

**Response:**
```typescript
interface GetResourceResponse {
  // response structure
}
```

**Status Codes:**
- 200: Success
- 400: [Error condition]
- 401: [Error condition]
- 500: [Error condition]

#### POST /api/resource
[...]

---

## Component Interfaces

### [Component A]
```typescript
interface ComponentAProps {
  // props
}

interface ComponentAActions {
  // methods/actions
}
```

### [Component B]
[...]

---

## State Management

### Global State
```typescript
interface GlobalState {
  // state shape
}

interface StateActions {
  // actions
}
```

### Local State Considerations
- [Component A]: [State management approach]
- [Component B]: [State management approach]

---

## Error Handling

### Error Scenarios
- [Scenario 1]: [Handling approach]
- [Scenario 2]: [Handling approach]

### Error Types
```typescript
enum ErrorType {
  // error types
}

interface Error {
  type: ErrorType;
  message: string;
  // additional fields
}
```

### User Communication
- [How errors are presented to users]
- [Recovery options]

---

## Security Considerations

- [Authentication requirements]
- [Authorization requirements]
- [Data validation]
- [Sensitive data handling]
- [Rate limiting]
- [Input sanitization]

---

## Testing Strategy

### Unit Tests
- [What to test]
- [Test coverage goals]

### Integration Tests
- [What to test]
- [Test scenarios]

### E2E Tests
- [Critical user flows]
- [Edge cases]

---

## Performance Considerations

- [Expected load/traffic]
- [Response time requirements]
- [Caching strategy]
- [Database optimization needs]
- [Resource constraints]

---

## Dependencies

### Internal Dependencies
- [Dependency 1] - [How it's used]
- [Dependency 2] - [How it's used]

### External Dependencies
- [Library 1] - [Purpose]
- [Library 2] - [Purpose]

---

## Implementation Phases

### Phase 1: [Title]
- [Tasks]
- [Deliverables]
- [Dependencies]

### Phase 2: [Title]
[...]

---

## Open Questions

- [Question 1]
- [Question 2]

---

## Alternatives Considered

1. **[Alternative 1]**
   - Description: [Brief description]
   - Why not chosen: [Reason]

2. **[Alternative 2]**
   - Description: [Brief description]
   - Why not chosen: [Reason]

---

## References

- [Research document links]
- [External documentation]
- [Similar implementations]
- [Design patterns]
- [Architecture cache]: `docs/arch/[relevant]-arch.md`

---

## Appendix

### Mockups
[Include links to any UI mockups or diagrams]

### Sequence Diagrams
[Describe or link to diagrams showing component interactions]

### Database Schema
[If applicable, include database schema]

## Completion Checklist

- [ ] Overview and scope clearly defined
- [ ] All requirements documented (functional and non-functional)
- [ ] User stories/use cases included
- [ ] Data structures specified with validation rules
- [ ] API endpoints documented with request/response types
- [ ] Component interfaces defined
- [ ] State management approach specified
- [ ] Error handling strategy documented
- [ ] Security considerations addressed
- [ ] Testing strategy outlined
- [ ] Performance considerations noted
- [ ] Dependencies identified
- [ ] Open questions listed
- [ ] Architecture cache checked/referenced
- [ ] Saved to docs/spec/ directory with date prefix

## Examples

### Example 1: Feature Specification

```
/sdlc spec User Profile Management
```

Would create a comprehensive spec including:
- User profile data models
- API endpoints for CRUD operations
- Profile image upload handling
- Privacy settings
- Validation rules

### Example 2: System Component

```
/sdlc spec Real-time Notification System
```

Would specify:
- WebSocket connection management
- Notification types and formats
- Subscription mechanisms
- Delivery guarantees
- Storage and retry logic

### Example 3: API Design

```
/sdlc spec Payment Processing API
```

Would document:
- Payment intent creation
- Webhook handling
- Refund processing
- Error scenarios
- Security requirements (PCI compliance)

## Integration

This skill is the second phase in the SDLC workflow:

1. **Research Phase** (/sdlc research) - Gather information and options
2. **Spec Phase** (this skill) - Create detailed specification
3. **Coding Phase** (/sdlc coding) - Implement based on spec

The spec phase translates research findings into a concrete implementation plan, ensuring all technical details are thought through before coding begins.

## Related Skills

- **doc.md** - Used to create and save the specification document
- **pencil.md** - Used to create diagrams for the specification
- **cache.md** - Architecture caching for context
- **research.md** - Previous phase: provides foundation for specification
- **coding.md** - Next phase: implements based on this specification

## Tips

- Be as detailed as possible - ambiguity leads to implementation questions
- Use TypeScript interfaces for all data structures
- Think about edge cases and error scenarios
- Consider how the feature will be tested
- Include performance targets if applicable
- Reference research findings for key decisions
- Keep specs updated as requirements evolve
- Use pencil.md to create diagrams for complex interactions
- **Check architecture cache first** - don't re-analyze well-known code
- **Update cache if needed** - help future specs work faster
