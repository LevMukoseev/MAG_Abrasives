# ADR 001: Contextual email inquiries and staging indexing

Date: 2026-11-06
Status: Accepted within the approved preprod work package.

## Context and boundaries

The public catalogue has 13 categories but the inquiry form previously defaulted
to roll grinding and discarded the selected category and product. The staging
project uses Vercel's Production target, so VERCEL_ENV alone cannot separate it
from the real company domain. No database, queue, CRM, or new endpoint is needed.

## Decision

- PublicCatalogue owns category slugs, image paths, descriptions and captions.
  Sources and editorial gaps are recorded in `docs/catalog-sources.md`.
- Inquiry owns optional `category`, `product` and `source` string fields on the
  existing POST `/api/submit-form` contract. Legacy clients can omit them.
  The server resolves human-readable labels from the catalogue; arbitrary labels
  and products outside the selected category are not trusted.
- A small React context carries the selection from the gallery into the form.
  Technical parameters are optional. No operation is preselected for a new inquiry.
- Validate types, lengths, contacts, consent and allowlisted values before SMTP.
  Only JSON is accepted; actual streamed UTF-8 data is capped at 16 KiB.
  Invalid fields return 400, oversized bodies 413, wrong media type 415, and
  process-local rate limits 429 with Retry-After. SMTP/configuration failures
  return 500. Success means the SMTP server accepted at least one recipient;
  it does not prove inbox delivery.
  Error responses may additionally contain a non-sensitive `code`:
  INVALID_INQUIRY, MAIL_NOT_CONFIGURED, MAIL_AUTH_FAILED, MAIL_TIMEOUT,
  MAIL_REJECTED or MAIL_DELIVERY_FAILED. Existing HTTP statuses/message remain
  compatible. Invalid input and unavailable configuration do not consume the
  three-attempt SMTP budget. Empty SMTP_PORT retains the legacy default 465.
  SMTP connection/greeting/socket budgets are 15/15/20 seconds; the function
  allows 60 seconds and the browser waits up to 65 seconds.
- A synchronous client guard prevents concurrent submissions. On errors the form
  retains its values. A timeout reports uncertain delivery instead of promising
  the message was not sent. Durable idempotency is not provided.
- PublishingMetadata identifies preprod by its branch, known project ID or
  production hostname, and previews by VERCEL_ENV. SITE_ENVIRONMENT=preprod is
  available for local builds. These signals cause noindex/nofollow metadata and
  response headers, omit sitemap advertisement and return an empty sitemap.
  Crawling stays allowed so crawlers can see noindex. Main production remains
  indexable. This is search indexing control, not access control.
- Native modal dialog supplies modal focus containment/background inertness;
  closing restores focus. SSR content and statistic values stay visible without
  animations. Keyboard tabs and accordion buttons use native semantics.
  Follow-up bugfix: decorative reveals and counters are static, the header uses
  a constant contrast background, and anchor navigation is immediate. This avoids
  visible content being hidden again during hydration/scroll. Optional font
  display avoids a late font swap on slow connections.

## Consequences and limits

Security maintenance updates Next and its matching ESLint config to 16.4.5 and
Nodemailer to 10.3.1. Compatible transitive fixes are applied without audit --force.
The remaining minimatch advisory has no fix in the parser's declared 10.x range,
so a scoped override pins only typescript-estree's minimatch to 11.0.5. Node 22/25
satisfies its engines; linting and type checks verify the parser integration.
Revisit this override when typescript-eslint adopts a fixed dependency range.
Advisory: https://github.com/advisories/GHSA-g3hv-75wg-m249

The form still depends on SMTP and an ephemeral per-process rate limiter.
Forwarded-IP protection requires a proxy that overwrites untrusted incoming
headers. Multiple serverless instances and restarts do not share counters.
Real mailbox delivery requires a separately authorized live test. Privacy/legal
review remains open. No DNS, domain, firewall or Vercel project settings change.

Use `npm test`, `npm run lint`, `npx tsc --noEmit --incremental false`, and
`npm run build`. For staging integration assertions build with
SITE_ENVIRONMENT=preprod, then run `npm run test:integration`. The integration
suite starts an isolated loopback SMTP sink and an ephemeral Next server; it
never sends to a real mailbox. Browser interaction and visual layout checks
remain separate from HTTP/SSR tests.
