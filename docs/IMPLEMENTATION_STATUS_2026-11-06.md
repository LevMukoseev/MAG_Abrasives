# Preprod implementation status — 2026-11-06

## Follow-up: inquiry errors and mobile loading

Confirmed local regressions in the previous package: empty/whitespace SMTP_PORT
rejected the request rather than defaulting to 465; five-second SMTP connection
and greeting limits could reject a healthy slow server; typographic phone dashes
and business extensions failed validation. These are corrected. Invalid input
does not consume the SMTP attempt budget. Optional public error codes distinguish
configuration, authentication, timeout and delivery errors without leaking
credentials. The form keeps its values and shows direct email/phone alternatives.

The live browser reproduced counter values changing from their final values to
an intermediate count after hydration, repeated fade/movement of visible content,
and transparent header text while scrolling over white sections. Those effects
are removed. Mobile fields, cards, statistics and modal text have bounded widths
and wrapping; form padding is reduced on narrow screens. Font display is optional
to avoid a late swap, and long anchor scrolling is immediate.
Engineering illustrations no longer float beside a narrow strip of mobile text
or crop wide diagrams into a fixed 192x128 box. They use their source aspect ratio
in a bounded block. Technical table wrappers are explicitly width-bounded.

The 375px baseline had 360px client width and 360px document scroll width. Wide
technical tables were inside their own scroll containers, not confirmed page
overflow. Do not present the entire original mobile complaint as reproduced.

Verification: 11 unit/SSR tests and 8 local HTTP/SMTP integration tests passed,
including a 5.5-second SMTP greeting, copied phone formats and invalid-input
retry budget. Lint, TypeScript and the preprod build passed. No external email
was sent. Browser access then stopped because the Windows safety guard could
not identify the current browser URL; post-fix browser acceptance remains open.

**Live failure cause confirmed:** after the team connection was authorized,
Vercel returned an empty environment-variable list for mag-abrasives-1, including
zero hidden production variables. All five required SMTP settings were absent.
The original project contained the five settings. Following advance notice,
they were restored only to mag-abrasives-1's Production target (the preprod
project's active target); SMTP_PASS is sensitive, the others encrypted. No values
were printed or written into Git. SMTP connection/TLS/authentication verification
succeeded from the local runtime without sending a message. This proves working
credentials, not Vercel-to-SMTP reachability or delivery to the recipient inbox.
The newly built deployment is required to pick up the variables. Original
production settings, main, DNS and Cloudflare are untouched.

## Delivered package

- Catalogue categories 1–5 now use Alexander's five DOCX files. Grinding diameter
  is consistent at 1400 mm; category-specific delivery estimates are 6–12 and
  6–8 weeks. Category 4 uses dressing tools instead of unrelated cutting wheels.
  Two optimized images were added with source records in `catalog-sources.md`.
- Removed unsupported general claims about three official factories, 20 years,
  guaranteed quotation turnaround and current Russian stock. Original source
  statements and remaining evidence gaps stay in the product plan.
- The selected category and gallery image flow into the inquiry form and SMTP
  message. They can be changed/removed before submitting. New inquiries have no
  preselected grinding operation; old clients can omit the new context fields.
- The API validates types, lengths, contacts, consent and catalogue membership,
  limits actual JSON bodies to 16 KiB and bounds process-local rate-limit memory.
  Failure responses retain form data; concurrent client submissions are guarded.
  SMTP configuration and server acceptance are checked; error logs omit PII.
- Staging has noindex/nofollow metadata and response headers, no sitemap
  advertisement, and an empty sitemap. Production main remains indexable.
  The privacy canonical is /privacy. Organization JSON-LD includes the address.
- Native modal dialog provides modal focus handling. Tabs and accordions have
  keyboard/ARIA semantics. Header links work from /privacy. Reveal content and
  statistic values are present in server HTML without JavaScript.
- Next/ESLint config 16.4.5, Nodemailer 10.3.1, Sharp 0.35.5 and compatible
  transitive patches are locked. A narrow minimatch 11.0.5 override closes the
  remaining parser dependency advisory without downgrading the Next linter.
- Removed the tracked local Claude launch configuration and ignored local editor,
  agent and Vercel metadata plus all .env variants except .env.example. Build
  artifacts remain ignored. SVG optimization is no longer enabled unnecessarily.

## Verification

- `npm test`: 8 tests passed (validation, catalogue membership, environment
  separation, no-JS content and neutral inquiry defaults).
- `npm run test:integration`: 6 tests passed against a real local Next production
  server and a loopback-only SMTP sink. Covers accepted and rejected SMTP mail,
  legacy payloads, Reply-To/context, invalid JSON/contacts/consent/types, 413/415,
  honeypot, 429/Retry-After, noindex, PDF, catalogue assets and anchor targets.
- `npm run lint`, `npx tsc --noEmit --incremental false` and preprod production
  build passed. No formatter is configured; changed files follow existing style
  and `git diff --check` is used for whitespace validation.
- Full npm audit after dependency repair: 0 vulnerabilities on 2026-11-06.
- The sandbox initially blocked Google Fonts and loopback connections. The build
  and integration checks passed with the required execution permissions.

These checks do not establish visual/browser interaction correctness or delivery
to the real company mailbox. Local browser access is disabled. The Vercel
connector returned a team-scope 403; public HTTP checks are used for publication
verification. DNS, Cloudflare, Vercel project configuration and main are untouched.

## Remaining work in order

1. Browser acceptance on preprod: 375/768/1440 widths, gallery focus/Escape,
   selection → form, menu after navigation, reduced motion and error recovery.
   Obtain browser access through the user's existing integration; do not claim
   HTTP tests prove these interactions.
2. Verify real SMTP configuration and one clearly marked mailbox delivery with
   separately authorized live sending. Confirm recipient, Reply-To and handling
   ownership. Process-local limiting and uncertain timeout delivery remain known
   limitations; do not claim durable idempotency or exactly-once delivery.
3. Finish catalogue evidence: the other eight source folders are empty; suspension
   lacks a verified photo, product name, manufacturer, packaging and TDS/SDS.
   Add real models and supplier relationships rather than inferred facts.
4. Confirm customer-photo publication rights, test protocols, certification scope,
   stock availability and service response expectations with company records.
5. Complete mobile/visual polish and reduce duplication between catalogue and
   application tabs. Then create useful category/operation SEO pages from the
   approved product data, preserving the selected A design.
6. Return to the deferred analytics/CI stage only within authorized scope and with
   real account IDs; do not silently add external trackers or invented events.
7. Legal review of privacy/consent and an explicit main release decision remain
   separate. A preprod push does not authorize a main merge or DNS changes.

React 18 is still supported by Next 16 but is deprecated for the next major.
Migration to React 19 is recorded as follow-up work, not bundled into this fix.
