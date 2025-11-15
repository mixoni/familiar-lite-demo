# Familiar Lite – Hotel CRM Demo (v2)

This is an extended version of the Familiar-inspired hotel CRM demo.

Goals:

- Show how I'd structure a **Next.js App Router** frontend around **business features** (hotels, guests)
- Use **Storybook + @storybook/nextjs** for component-driven development
- Use **Jest + React Testing Library** and **Storybook interaction tests** for confidence
- Work with **richer mock data**, closer to a real multi-property hotel CRM

---

## 1. Business slice

The UI focuses on a small but realistic slice of functionality:

- **Portfolio overview** – total hotels, rooms, avg occupancy, and monthly revenue
- **Hotel list** – searchable by name, city or country
- **Hotel details** – occupancy, revenue, rooms, star rating, number of unified guest profiles
- **Guest profiles** – per hotel guests with:
  - lifetime value (LTV)
  - last stay
  - origin channel (Direct, OTA, Corporate, Agency)
  - segments (High LTV, Loyalty, Upsell candidate, Corporate…)

All data is in-memory mock data, but the code is structured as if a real NestJS/Fastify API exists behind it.

---

## 2. Folder structure (feature/domain based)

```text
app/
  layout.tsx        – Root layout; uses shared AppShell
  page.tsx          – Composes HotelDashboard with mock data

features/
  hotels/
    components/
      HotelDashboard/
        HotelDashboard.tsx        – container: state & orchestration + summary tiles
      HotelList/
        HotelList.tsx             – presentational list of hotels
        HotelList.stories.tsx     – Storybook stories + interaction test
        HotelList.test.tsx        – Jest + RTL tests
      HotelDetails/
        HotelDetails.tsx          – presentational detail + segment filter
        HotelDetails.stories.tsx  – Storybook stories + interaction test
        HotelDetails.test.tsx     – Jest + RTL tests
    types.ts                      – Hotel type
    mockData.ts                   – richer hotel + guest data

  guests/
    components/
      GuestProfileCard/
        GuestProfileCard.tsx      – presentational guest card
        GuestProfileCard.stories.tsx
        GuestProfileCard.test.tsx
    types.ts                      – GuestProfile type

shared/
  components/
    AppShell/
      AppShell.tsx                – shared app shell/layout (used by Next + Storybook)
  lib/
    formatCurrency.ts             – shared formatting helpers
    formatDate.ts

.storybook/
  main.ts                         – Storybook config (uses @storybook/nextjs)
  preview.tsx                     – global decorators; wraps stories in AppShell

.github/
  workflows/
    ci.yml                        – simple GitHub Actions CI (test + build + build-storybook)
```

This mirrors how I like to scale larger frontends:

- I navigate by **domain** (`features/hotels`, `features/guests`) instead of `components/`, `hooks/`, `utils/`
- Stories and tests live next to the component they describe
- Shared building blocks live under `shared/`

---

## 3. Richer mock data

`features/hotels/mockData.ts` contains multiple properties:

- urban/city hotels, resort, alpine lodge, harbour, desert resort
- varying:
  - occupancy rates
  - monthly revenue
  - star ratings
  - room counts
- guest profiles with:
  - multiple countries and cities
  - different channels (OTA, Direct, Corporate, Agency)
  - a mix of segments (High LTV, Loyalty, Upsell candidate, Corporate…)

This makes the UI feel more like a real CRM dashboard and allows more interesting story states.

---

## 4. Components & state

### HotelDashboard (container)

- Owns UI state:
  - `selectedHotelId`
  - `search`
  - `segmentFilter`
- Derives:
  - `filteredHotels` by search term
  - `selectedHotel` based on selection
  - portfolio summary: total hotels, total rooms, avg occupancy, total revenue
- Composes:
  - `HotelList` (sidebar)
  - `HotelDetails` (main panel)

### HotelList (presentational)

- Receives:
  - `hotels`, `selectedHotelId`, `search`, callbacks
- Renders:
  - search box
  - list of hotel rows with basic KPIs
- Emits:
  - `onSearchChange`
  - `onSelectHotel`

### HotelDetails (presentational)

- Receives:
  - `hotel` (or null)
  - `segmentFilter`, `onSegmentFilterChange`
- Shows:
  - name, location, rooms, star rating
  - occupancy, revenue, guest count
  - segment filter chips
  - grid of `GuestProfileCard` components for visible guests

### GuestProfileCard (presentational)

- Receives:
  - `GuestProfile`
- Renders:
  - name, city+country, email
  - LTV (formatted currency)
  - last stay (formatted date) + channel
  - segment badges

---

## 5. Storybook – Next.js integration + interaction tests

Storybook is configured using **`@storybook/nextjs`**, so stories render within a Next-like environment.

- `.storybook/preview.tsx` imports `globals.css` and wraps stories in `AppShell`, so they look like the real app.
- Stories:
  - `GuestProfileCard.stories.tsx`
    - `Default` with a small interaction test (checks name & email)
    - `OTAGuest` to show OTA + Upsell segments
  - `HotelList.stories.tsx`
    - `Default`
    - `FilterByCity` – uses `userEvent` to type in the search box
    - `NoResults`
  - `HotelDetails.stories.tsx`
    - `Default`
    - `FilterHighLTV` – clicks the segment chip
    - `NoHotelSelected` – shows empty state

These interaction tests run inside Storybook via `@storybook/test`, and they complement the Jest unit tests.

---

## 6. Testing – Jest + React Testing Library

- `GuestProfileCard.test.tsx`
  - assert name, email, LTV label, segments
- `HotelList.test.tsx`
  - assert hotels render
  - assert `onSearchChange` is called with the typed value
- `HotelDetails.test.tsx`
  - assert summary labels and guest name render
  - assert empty state when `hotel` is null

Run everything locally:

```bash
pnpm install

pnpm dev           # Next app at http://localhost:3000
pnpm storybook     # Storybook at http://localhost:6006
pnpm test          # Jest tests
pnpm build         # production build
pnpm build-storybook
```

---

## 7. CI – GitHub Actions

`.github/workflows/ci.yml` shows how I'd wire a lightweight CI:

- install dependencies with pnpm
- run Jest tests
- build the Next app
- build Storybook static bundle

It's intentionally minimal, but easy to extend with linting, Chromatic, etc.

---

## 8. How this maps to Friendly / Familiar

Even though this is a mock app, it demonstrates:

- **TypeScript-first modeling** of hotels and unified guest profiles
- **Feature/domain architecture** suitable for multi-tenant SaaS
- **Next.js App Router** usage with a shared `AppShell` layout
- **Storybook + @storybook/nextjs** integration for component-driven dev
- **Jest + RTL + Storybook interaction tests** as a layered testing strategy
- **Richer data** to showcase segments, channels, LTV, revenue — the kind of data a real Marketing CRM would care about.

This is exactly the kind of structure I'd propose for a real-world Familiar / Friendly frontend codebase, just scaled down for a demo.
