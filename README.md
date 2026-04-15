# KeenKeeper

KeenKeeper is a React-based friendship dashboard styled to match the provided screenshot. The codebase now follows a cleaner "Book Vibe"-style structure with separate routing, layout, context, pages, shared components, and local storage utilities.

## Features

- Screenshot-matched home page with navbar, hero section, stats cards, friends grid, and footer
- Separate `Homepage`, `Timeline`, `Stats`, and `ErrorPage` routes
- Global friend data handled through context
- Friend data cached in `localStorage`
- Responsive layout with Tailwind CSS and DaisyUI enabled

## Tech Stack

- React 19
- React Router 7
- Tailwind CSS 4
- DaisyUI
- Vite

## Project Structure

```text
src/
  App.jsx
  main.jsx
  index.css
  components/
    AllFriends.jsx
    Banner.jsx
    Footer.jsx
    FriendCard.jsx
    Icon.jsx
    Navbar.jsx
    SummaryCards.jsx
  context/
    FriendContext.jsx
  layouts/
    MainLayout.jsx
  pages/
    ErrorPage.jsx
    Homepage.jsx
    StatsPage.jsx
    TimelinePage.jsx
  routes/
    Routes.jsx
  utils/
    localDB.js
public/
  friends.json
```

## Run Locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Notes

- Routing is handled from `src/routes/Routes.jsx`.
- The app is wrapped with `FriendProvider` in `src/main.jsx`.
- Friend data is fetched from `public/friends.json` and cached with `src/utils/localDB.js`.
