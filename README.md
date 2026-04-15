# KeenKeeper

KeenKeeper is a responsive friendship relationship manager built with React. It helps you track contact frequency, view friend details, log quick interactions, and analyze communication trends.

## Tech Stack

- React 19
- React Router 7
- Tailwind CSS 4 + DaisyUI
- Recharts
- Vite

## Key Features

- Figma-style UI with a highlighted icon-based navbar, hero banner, summary cards, friend grid, detail layout, timeline page, and footer
- Full interaction flow: `Call`, `Text`, and `Video` buttons on the Friend Details page create timeline entries with current date and show toast notifications
- Analytics dashboard with a Recharts pie chart showing interaction counts by type (`Call`, `Text`, `Video`)

## Routes

- `/` - Home page
- `/friends/:friendId` - Friend Details page
- `/timeline` - Timeline with filtering
- `/stats` - Friendship Analytics page
- Unknown routes show a 404 error page

## Data Model

Friend data is stored in `public/friends.json` with realistic profiles and this structure:

```json
{
  "id": 1,
  "name": "John Doe",
  "picture": "https://example.com/photo.jpg",
  "email": "john@example.com",
  "days_since_contact": 12,
  "status": "overdue",
  "tags": ["college", "close friend"],
  "bio": "Met in university. Love hiking together.",
  "goal": 14,
  "next_due_date": "2025-07-20"
}
```

Allowed `status` values:

- `overdue`
- `almost due`
- `on-track`

## Interaction & Timeline Behavior

- Quick Check-In buttons on Friend Details add entries like:
  - `Call with Emma Wilson`
  - `Text with Ryan O'Brien`
  - `Video with Olivia Martinez`
- Entries are displayed on the Timeline page with date + icon + title
- Timeline supports filtering by `Call`, `Text`, `Video`

## Persistence

- Friends and timeline data are cached to `localStorage`
- Reload-safe routing is handled with `createHashRouter` so refreshing deep links does not break on static hosting

## UX Requirements Covered

- Loading animation while fetching friend data (skeleton cards on Home)
- Relevant toast notifications for quick interactions
- Responsive layout for mobile, tablet, and desktop
- 404 page for invalid routes

## Run Locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
