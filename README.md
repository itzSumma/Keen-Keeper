# KeenKeeper

KeenKeeper is a responsive friendship relationship manager built with React. It helps users keep meaningful connections in view by tracking contact rhythm, logging quick check-ins, and surfacing lightweight relationship insights in a clean dashboard-style interface.

## Overview

The app is designed around a simple idea: staying close to people takes intention. KeenKeeper gives you a personal space to browse your contacts, see who needs attention, record interactions, and review communication trends over time.

## Features

- Responsive home page with a hero banner, summary cards, and friend grid
- Friend details page with quick check-in actions for `Call`, `Text`, and `Video`
- Timeline view for reviewing logged interactions
- Stats page with chart-based interaction insights using Recharts
- Loading state with spinner and skeleton placeholders
- Toast notifications powered by `react-toastify`
- Error page for invalid or broken routes
- Local persistence with `localStorage` for friend data and timeline updates

## Tech Stack

- React 19
- React Router 7
- Tailwind CSS 4
- DaisyUI
- React Toastify
- Recharts
- Vite

## Routes

- `/` - Homepage
- `/friends/:friendId` - Friend details page
- `/timeline` - Interaction timeline
- `/stats` - Friendship analytics

Unknown routes are handled by a dedicated error page.

## Data Source

Initial friend data is loaded from `public/friends.json`.

Example structure:

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

Supported `status` values:

- `overdue`
- `almost due`
- `on-track`

## Interaction Flow

On the friend details page, users can log quick interactions with a single click. Each action:

- creates a new timeline entry
- updates the in-memory interaction history
- shows a success toast

Supported interaction types:

- `Call`
- `Text`
- `Video`

## Persistence

- Friend data is cached in `localStorage`
- Timeline entries are persisted locally for a smoother return experience
- Hash-based routing is used so deep links work more reliably on static hosting

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

```bash
npm install
```

### Run in Development

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview the Production Build

```bash
npm run preview
```

### Lint the Project

```bash
npm run lint
```

## Project Highlights

- Simple and focused component structure
- Context-based state management for friends and toasts
- Mobile-friendly layout across core pages
- Clean UI feedback for loading, success actions, and route errors

## Folder Notes

- `src/components` - Reusable UI pieces
- `src/pages` - Route-level page components
- `src/context` - Shared app state
- `src/routes` - Router configuration
- `src/utils` - Local storage helpers

## Status

This project is set up as a polished front-end application for managing personal relationship touchpoints and visualizing interaction habits.
