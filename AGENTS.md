# Project operating rules

## Language
- Communicate in Russian.
- Code, identifiers, API fields and technical documentation are in English.

## Architecture
- Before implementation, identify bounded context, affected modules and dependencies.
- Do not introduce a new dependency, database table, API endpoint or public contract without explaining the trade-off.
- Prefer explicit domain models and clear module boundaries.
- Record significant decisions as ADRs in /docs/adr.

## API
- Preserve backward compatibility by default.
- Define request/response schemas, error cases, authorization and idempotency where relevant.
- Do not expose internal persistence models as public API DTOs.

## Delivery
- For non-trivial tasks respond in this order:
  1. Goal and assumptions
  2. Implementation plan
  3. Files to change
  4. Risks and edge cases
  5. Implementation
  6. Tests and verification commands
- Do not modify unrelated files.
- Run formatter, type-checker, linter and relevant tests before declaring completion.