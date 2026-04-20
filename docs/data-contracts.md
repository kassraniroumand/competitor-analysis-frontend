# Per-Page Data Contracts

## Context

The app was just migrated from Vite to Next.js 16 (App Router). Every page currently reads from hardcoded fixtures in `src/data/*.ts`; there is no backend wired yet. Before we can wire real data, we need a clear inventory of what each route actually consumes — entity, fields, related data, derived values, current source, and any **data gaps** (UI that today renders hardcoded literals not present in the mock entities, which will need new backing fields).

This file is strictly per-page. Cross-cutting concerns (auth user, providers, notifications) are intentionally out of scope.

## Core entities (current mock shapes)

Defined in `src/data/mock-data.ts` and friends:

- **IdeaReport** — `id, title, description, status('processing'|'completed'|'failed'), opportunityScore, category, createdAt, updatedAt, targetAudience?, industry?, geography?, businessModel?, keywords?`
- **Competitor** — `id, ideaId, name, logo, website, description, type('direct'|'indirect'), pricingModel, pricingSummary, targetAudience, features[], strengths[], weaknesses[], relevanceScore, marketSegment`
- **PainPointData** (`src/data/painpoints-data.ts`) — `id, ideaId, point, category, severity, frequency, mentions, quotes[], workarounds[], featureRequests[]`
- **ValidationData** (`src/data/validation-data.ts`) — `ideaId, searchDemand{score, verdict, keywords[{term, volume, trend, competition}], trendData[]}, communityInterest{score, redditMentions, twitterMentions, forumThreads, topPlatforms[{name, mentions, sentiment}]}, marketSize{tam, sam, som, growthRate, notes[]}, verdict{score, label, summary, recommendations[]}`
- **Loose mocks** also exported from `mock-data.ts`: `scoreBreakdown`, `painPoints`, `marketGaps`, `risks` (currently a single global snapshot, not per-idea)
- **PRD** — `generatePRDData(idea)` in `src/data/prd-data.ts` returns 7 derived sections from an `IdeaReport`

---

## Per-page data needs

### `/` — `src/app/page.tsx`
- Marketing landing. **No data dependencies** (all copy hardcoded across landing components).

### `/pricing` — `src/app/pricing/page.tsx`
- Hardcoded `plans[]`, `faqs[]`, `trustedLogos[]`. **No data fetch needed**.
- **Data gaps:** none — pricing copy is intentionally static.

### `/settings` — `src/app/settings/page.tsx`
- **Entity:** authenticated User + billing/subscription
- **Fields:** `firstName, lastName, email, company`; notification toggles; current plan + price
- **Source today:** hardcoded ("Jane Doe", "jane@startup.co", "Startup Labs", Pro $29/mo)
- **Data gaps:**
  - User profile fields → backing entity `Profile { id, firstName, lastName, email, company, avatar }`
  - Notification preferences → `NotificationPrefs { userId, productUpdates, weeklyDigest, mentions, … }` (one boolean per toggle)
  - Subscription → `Subscription { userId, plan, priceCents, interval, renewsAt, status }`

### `/dashboard` — `src/app/dashboard/page.tsx`
- **Entity:** `IdeaReport[]`
- **Fields read:** `id, title, opportunityScore, status, category, createdAt`
- **Related:** `Competitor[]` (count only, grouped by `ideaId`)
- **Derived:** counts of completed/processing, top‑3 by `opportunityScore`, latest 4 by `createdAt`, total competitors, average score
- **Data gaps:** none — all displayed values trace to `IdeaReport` / `Competitor`.

### `/dashboard/idea` — `src/app/dashboard/idea/page.tsx`
- Re‑exports `/ideas`. Same data needs as `/ideas`.

### `/ideas` — `src/app/ideas/page.tsx`
- **Entity:** `IdeaReport[]`
- **Fields:** `id, title, description, status, opportunityScore, category, createdAt, businessModel, industry, geography`
- **Derived:** stats (total, completed, processing, avgScore); client‑side search/filter/sort
- **Data gaps:** none — all displayed values trace to `IdeaReport`. (Server‑side pagination is a future optimization, not a data gap.)

### `/ideas/[id]` — `src/app/ideas/[id]/page.tsx`
- **Param:** `id` (IdeaReport.id)
- **Entity:** single `IdeaReport`
- **Fields:** `id, title, description, opportunityScore, category, createdAt, updatedAt, targetAudience, keywords`
- **Related (currently single shared mock):** `scoreBreakdown{demand, painPoint, monetization, differentiation, competition}`, `painPoints[{point, frequency, severity, quote}]` (top 3), `marketGaps[{gap, description}]` (top 2)
- **Data gaps (hardcoded literals → proposed backing fields):**
  - "$2.4M/yr potential revenue", "42% current efficiency", "89% projected efficiency" → `IdeaReport.projections { revenueAnnualUsd, efficiencyCurrentPct, efficiencyProjectedPct }`
  - "$14.2B sector gap", "+12.4% YoY growth", "38% competitor gap", "+412% search demand YoY" → `IdeaReport.marketSignals { sectorGapUsd, sectorGrowthYoYPct, competitorGapPct, searchDemandYoYPct }`
  - "85% accuracy threshold" → `IdeaReport.qualityTargets { accuracyThresholdPct }`
  - "Phase 1: Alpha", "Est. 6 Weeks" → `IdeaReport.mvpPlan { phase, estimatedWeeks }`
  - Gartner / industry quote text → `IdeaReport.evidence[] { source, quote, url }`
  - FAQ answers → `IdeaReport.faq[] { question, answer }`
  - `scoreBreakdown`, `painPoints`, `marketGaps` should become **per-idea** (FK `ideaId`), not the global snapshot they are today.

### `/ideas/[id]/competitors` — `src/app/ideas/[id]/competitors/page.tsx`
- Re‑exports `/competitors`; effective filter is `Competitor.ideaId === [id]`. No additional needs.

### `/competitors` — `src/app/competitors/page.tsx`
- **Search param:** `?idea=<ideaId>` (optional)
- **Entity:** `Competitor[]`
- **Fields:** `id, ideaId, name, type, relevanceScore, pricingModel, pricingSummary, features, strengths, weaknesses, targetAudience, marketSegment, description, website`
- **Related:** `IdeaReport[]` (`id, title`) for the filter dropdown
- **Derived:** direct/indirect counts, strongest competitor (max `relevanceScore`), filtered+sorted list
- **Data gaps (hardcoded stat tiles):**
  - "Avg Overlap 56%" → derived from `Competitor.relevanceScore` average — **swap to derived, not hardcoded**
  - "Pricing $0…" tile → needs aggregate over `Competitor.pricingModel` (e.g. min/median entry price) — add `Competitor.startingPriceUsd`
  - "Momentum 90d: 4" → needs new field `Competitor.momentum90d` or compute from a time-series of `Competitor.mentions[]`

### `/competitors/[id]` — `src/app/competitors/[id]/page.tsx`
- **Param:** `id` (Competitor.id)
- **Entity:** single `Competitor`
- **Fields:** `id, name, logo, website, description, type, relevanceScore, targetAudience, marketSegment, pricingModel, pricingSummary, features, strengths, weaknesses`
- **Data gaps:**
  - User sentiment (3.8 rating, 72% positive / 18% neutral / 10% negative) → `Competitor.sentiment { ratingAvg, positivePct, neutralPct, negativePct, sampleSize }`
  - Comparison-table "Your Idea" column (6 rows) → joins to the parent `IdeaReport` and reads `targetAudience, businessModel, keywords, …`; need a stable mapping between competitor row label and idea field
  - Win/Loss assessment, "Where You Can Compete", "Key Gap", "Differentiation Angle" → `Competitor.opportunity { winLoss, whereToCompete, keyGap, differentiationAngle }`

### `/pain-points` — `src/app/pain-points/page.tsx`
- **Search param:** `?idea=<ideaId>` (optional)
- **Entity:** `PainPointData[]`
- **Fields:** `id, ideaId, point, category, severity, frequency, mentions, quotes, workarounds, featureRequests`
- **Related:** `IdeaReport` parent (`id, title, description, category, opportunityScore`)
- **Derived:** total count, critical count, total mentions, unique categories, category distribution, group‑by‑idea map
- **Data gaps:** none — all displayed values trace to `PainPointData`.

### `/validation` — `src/app/validation/page.tsx`
- **Search param:** `?idea=<ideaId>` (optional)
- **Entity:** `ValidationData[]` (one per idea)
- **Fields:** full nested shape (searchDemand, communityInterest, marketSize, verdict)
- **Related:** `IdeaReport` parent (`id, title, description, category`)
- **Derived:** ideas validated count, avg demand score, total keywords, total community mentions
- **Data gaps:** none — all displayed values trace to `ValidationData`.

### `/reports/[id]` — `src/app/reports/[id]/page.tsx`
- **Param:** `id` (currently ignored — reads `mockReports[0]`) — **bug to fix while wiring real data**
- **Entity:** `IdeaReport`
- **Fields:** `id, title, description, createdAt, opportunityScore, status`
- **Related:** `Competitor[]` (`name, relevanceScore`); `painPoints[]` first 3 (`point, severity, quote`); `marketGaps[{gap, description}]`; `risks[{risk, level, description}]`
- **Data gaps (hardcoded literals → proposed backing fields):**
  - Radar chart 5-axis data (Demand, Competition, Pain Point, Differentiation, Monetization) → reuse per-idea `scoreBreakdown` (already proposed under `/ideas/[id]`); radarData should be derived, not hardcoded
  - "74% demand", "+43% YoY searches", other market validation facts → reuse `IdeaReport.marketSignals` (proposed under `/ideas/[id]`)
  - Score recommendations text → `IdeaReport.scoreRecommendations[] { dimension, recommendation }`
  - `risks` should become per-idea (FK `ideaId`), not the global snapshot it is today

### `/not-found` — `src/app/not-found.tsx`
- No data.

---

## Critical files to consult during implementation

- `src/data/mock-data.ts` — ground truth for IdeaReport + Competitor + the loose extras (scoreBreakdown, painPoints, marketGaps, risks)
- `src/data/painpoints-data.ts`, `src/data/validation-data.ts`, `src/data/prd-data.ts`
- The page files enumerated above

## Verification (when implementation begins)

- `npm run build` succeeds with real fetches and no missing types.
- Each page renders under `npm run dev`; spot‑check `/dashboard`, `/ideas`, `/ideas/[id]`, `/competitors`, `/competitors/[id]`, `/pain-points`, `/validation`, `/reports/[id]`, `/settings` against the field list above.
- Each "Data gap" item above is either backed by a real field or explicitly accepted as static UI copy.
- Removing `src/data/mock-data.ts` does not break the build.
