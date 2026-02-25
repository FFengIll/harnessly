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

## Cache
Since each spec may need to understand the project, cache architecture understanding and reuse it when possible.
The cache can be placed into ./docs/arch/datetime-arch.md, e.g., ./docs/arch/20260105-arch.md, updating only the timestamp.

## IMPORTANT
You can use the `ask` tool to communicate with the user, or let the user `choose` for discussion.