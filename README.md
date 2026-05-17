# 🎬 Riz Media Player

A fully functional **YouTube Clone** built with React.js that lets you browse, search, and watch YouTube videos — all powered by the YouTube Data API v3 via RapidAPI.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Live Demo](#live-demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture & Data Flow](#architecture--data-flow)
- [Project Structure](#project-structure)
- [File-by-File Breakdown](#file-by-file-breakdown)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [How the API Works](#how-the-api-works)
- [Routing Explained](#routing-explained)
- [Styling Approach](#styling-approach)
- [Deployment Guide (Netlify)](#deployment-guide-netlify)
- [Troubleshooting](#troubleshooting)
- [License](#license)

---

## Overview

**Riz Media Player** is a single-page application (SPA) that replicates the core YouTube experience:

- Browse videos by category (Music, Gaming, Education, Coding, etc.)
- Search for any video or channel
- Watch videos with an embedded player
- View channel profiles with subscriber counts
- See related videos alongside the player

It fetches real-time data from YouTube's API, so the content is always fresh and up-to-date.

---

## Live Demo

The app is deployed on **Netlify**. After deployment, it's accessible at your Netlify URL.

---

## Features

| Feature | Description |
|---------|-------------|
| 🏠 Category Browsing | Sidebar with 17 categories — click any to load relevant videos |
| 🔍 Search | Full search functionality with URL-encoded queries |
| ▶️ Video Playback | Embedded YouTube player with controls (via ReactPlayer) |
| 📊 Video Stats | View count and like count displayed on video pages |
| 📺 Channel Pages | Channel avatar, name, subscriber count, and their latest videos |
| 🎯 Related Videos | Suggested videos shown alongside the player |
| 📱 Responsive | Works on mobile, tablet, and desktop |
| 🌙 Dark Theme | Full dark mode UI with black background |

---

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| [React 18](https://reactjs.org/) | UI library — component-based architecture |
| [React Router DOM v6](https://reactrouter.com/) | Client-side routing (no page reloads) |
| [Material UI v5](https://mui.com/) | Pre-built UI components (Cards, Typography, Stack, Box, Icons) |
| [Emotion](https://emotion.sh/) | CSS-in-JS engine (powers MUI's `sx` prop) |
| [Axios](https://axios-http.com/) | HTTP client for API requests |
| [ReactPlayer](https://github.com/cookpete/react-player) | Embedded YouTube video player |
| [RapidAPI - YouTube v3](https://rapidapi.com/ytdlfree/api/youtube-v31/) | YouTube Data API provider |
| [Netlify](https://www.netlify.com/) | Hosting and deployment platform |
| [Create React App](https://create-react-app.dev/) | Project scaffolding and build tooling |

---

## Architecture & Data Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                         Browser                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  index.js ──► App.js ──► BrowserRouter                          │
│                              │                                   │
│                              ├── Navbar (sticky top bar)         │
│                              │     └── Logo + SearchBar          │
│                              │                                   │
│                              └── Routes                          │
│                                    ├── "/" ──► Feed              │
│                                    │            ├── SideBar      │
│                                    │            └── Videos Grid  │
│                                    │                             │
│                                    ├── "/video/:id" ──► VideoDetail
│                                    │                    ├── ReactPlayer
│                                    │                    └── Related Videos
│                                    │                             │
│                                    ├── "/channel/:id" ──► ChannelDetail
│                                    │                      ├── ChannelCard
│                                    │                      └── Channel Videos
│                                    │                             │
│                                    └── "/search/:searchterm" ──► SearchFeed
│                                                            └── Videos Grid
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│                    FetchFromAPI (Axios)                           │
│                         │                                        │
│                         ▼                                        │
│            YouTube v3 API (RapidAPI)                              │
└─────────────────────────────────────────────────────────────────┘
```

**How data flows:**
1. User navigates to a route (e.g., clicks a category or searches)
2. The corresponding page component mounts
3. `useEffect` triggers `FetchFromAPI()` with the appropriate endpoint
4. Axios sends a GET request to RapidAPI's YouTube v3 endpoint
5. Response data is stored in component state via `useState`
6. React re-renders the UI with the fetched data

---

## Project Structure

```
Riz-Media-Player/
├── public/
│   ├── index.html          # HTML template (entry point for the browser)
│   ├── manifest.json       # PWA manifest (app name, icons, theme)
│   ├── _redirects          # Netlify SPA redirect rule
│   ├── favicon.ico         # Browser tab icon
│   ├── logo192.png         # PWA icon (192x192)
│   ├── logo512.png         # PWA icon (512x512)
│   └── robots.txt          # Search engine crawling rules
│
├── src/
│   ├── index.js            # React entry point — mounts App to DOM
│   ├── index.css           # Global styles (scrollbar, buttons, responsive)
│   ├── App.js              # Root component — routing setup
│   │
│   ├── components/
│   │   ├── index.js        # Barrel file — re-exports all components
│   │   ├── Navbar.jsx      # Top navigation bar with logo and search
│   │   ├── SearchBar.jsx   # Search input with form submission
│   │   ├── SideBar.jsx     # Category buttons (left panel)
│   │   ├── Feed.jsx        # Home page — sidebar + video grid
│   │   ├── Videos.jsx      # Reusable video/channel grid renderer
│   │   ├── VideoCard.jsx   # Individual video thumbnail card
│   │   ├── ChannelCard.jsx # Individual channel avatar card
│   │   ├── VideoDetail.jsx # Video player page with stats
│   │   ├── ChannelDetail.jsx # Channel profile page
│   │   ├── SearchFeed.jsx  # Search results page
│   │   └── Loader.jsx      # Loading spinner
│   │
│   └── utils/
│       ├── constants.js    # Logo URL, categories array, demo fallbacks
│       └── FetchFromAPI.js # Axios-based API utility function
│
├── .env                    # Environment variables (API key)
├── .gitignore              # Files excluded from Git
├── package.json            # Dependencies, scripts, project config
├── package-lock.json       # Locked dependency versions
└── README.md               # This file
```

---

## File-by-File Breakdown

### Entry Points

#### `public/index.html`
The single HTML file that the browser loads. It contains:
- Meta tags for viewport and theme color
- Google Fonts (Roboto) and Material Icons loaded via CDN
- A `<div id="root">` where React mounts the entire app
- Custom favicon pointing to the app logo hosted on ibb.co

#### `src/index.js`
The JavaScript entry point. It:
- Creates a React root using `ReactDOM.createRoot()`
- Renders the `<App />` component into the `#root` div
- Imports global CSS (`index.css`)

#### `src/App.js`
The root React component. It sets up:
- `BrowserRouter` for client-side routing
- A black background wrapper (`Box` with `backgroundColor: '#000'`)
- `Navbar` displayed on every page (outside Routes)
- Four routes: Home, Video, Channel, and Search

---

### Components

#### `src/components/index.js` (Barrel File)
Re-exports all components from a single location. This allows clean imports like:
```js
import { Navbar, Feed, VideoDetail } from './components'
```
Instead of importing from individual files.

---

#### `src/components/Navbar.jsx`
**Purpose:** Sticky top navigation bar visible on all pages.

**What it does:**
- Displays the app logo (links back to home `/`)
- Contains the `SearchBar` component
- Uses MUI `Stack` for horizontal layout
- Sticky positioning so it stays at the top while scrolling

---

#### `src/components/SearchBar.jsx`
**Purpose:** Allows users to search for videos.

**What it does:**
- Maintains a controlled input with `useState`
- On form submit, navigates to `/search/{encodedSearchTerm}`
- Uses `useNavigate()` from React Router for programmatic navigation
- Encodes the search term with `encodeURIComponent()` to handle special characters
- Clears the input after submission

---

#### `src/components/SideBar.jsx`
**Purpose:** Category navigation panel on the left side of the home page.

**What it does:**
- Renders a button for each category from `constants.js`
- Highlights the currently selected category (red background)
- Calls `setselectedcategory()` when a button is clicked
- Scrollable horizontally on mobile, vertical on desktop

**Categories include:** New, Shark Tank Season 3, Smart Energy Water, ReactJS, NextJS, Music, Education, Podcast, Movie, Gaming, Live, Sport, Fashion, Beauty, Comedy, Gym, Crypto

---

#### `src/components/Feed.jsx`
**Purpose:** The home page — the first thing users see.

**What it does:**
- Manages `selectedcategory` state (defaults to "New")
- Fetches videos from the API whenever the category changes
- Renders `SideBar` on the left and `Videos` grid on the right
- Shows a copyright notice at the bottom of the sidebar
- Layout switches from side-by-side (desktop) to stacked (mobile)

---

#### `src/components/Videos.jsx`
**Purpose:** Reusable component that renders a grid of video and channel cards.

**What it does:**
- Accepts a `videos` array and optional `direction` prop
- If no videos are loaded, shows the `Loader` spinner
- Iterates through items and renders:
  - `VideoCard` if the item has a `videoId`
  - `ChannelCard` if the item has a `channelId`
- Uses MUI `Stack` with flexWrap for responsive grid layout

---

#### `src/components/VideoCard.jsx`
**Purpose:** Displays a single video as a clickable card.

**What it does:**
- Shows the video thumbnail image
- Displays the title (truncated to 60 characters)
- Shows the channel name with a verified checkmark icon
- Links to the video detail page (`/video/{videoId}`)
- Links channel name to the channel page (`/channel/{channelId}`)
- Falls back to demo URLs if data is missing

---

#### `src/components/ChannelCard.jsx`
**Purpose:** Displays a channel as a circular avatar card.

**What it does:**
- Shows the channel's profile picture (circular, 180px)
- Displays channel name with a verified checkmark
- Shows subscriber count (formatted with commas)
- Links to the channel detail page
- Accepts a `marginTop` prop for positioning (used in ChannelDetail)

---

#### `src/components/VideoDetail.jsx`
**Purpose:** Full video playback page with details and related videos.

**What it does:**
- Fetches video details (title, stats) and related videos using the video ID from URL params
- Embeds a YouTube player using `ReactPlayer` with controls enabled
- Displays: title, channel name (linked), view count, like count
- Shows related videos in a sidebar column (or below on mobile)
- Shows `Loader` until data is fetched

---

#### `src/components/ChannelDetail.jsx`
**Purpose:** Channel profile page showing channel info and their videos.

**What it does:**
- Fetches channel details and channel's videos using the channel ID from URL params
- Displays a gradient banner at the top (cyan to magenta)
- Shows `ChannelCard` overlapping the banner (negative margin)
- Lists the channel's latest videos below

---

#### `src/components/SearchFeed.jsx`
**Purpose:** Displays search results for a given query.

**What it does:**
- Reads the `searchterm` from URL params (`useParams()`)
- Fetches matching videos from the API
- Displays "Search results for: {term} videos" heading
- Renders results using the `Videos` component

---

#### `src/components/Loader.jsx`
**Purpose:** Loading indicator shown while data is being fetched.

**What it does:**
- Renders a centered MUI `CircularProgress` spinner
- Takes up the full viewport height to prevent layout shifts

---

### Utilities

#### `src/utils/FetchFromAPI.js`
**Purpose:** Centralized API fetching function used by all components.

**What it does:**
```js
export const FetchFromAPI = async (url) => {
    const { data } = await axios.get(`${Base_Url}/${url}`, options);
    return data;
};
```
- Base URL: `https://youtube-v31.p.rapidapi.com`
- Sends RapidAPI key and host in headers
- Sets `maxResults: 50` as a default parameter
- Returns the response data directly

---

#### `src/utils/constants.js`
**Purpose:** Stores all static configuration and fallback data.

**Contains:**
- `logo` — URL to the app logo image (hosted on ibb.co)
- `categories` — Array of 17 category objects, each with a `name` and MUI `icon`
- Demo/fallback URLs — Used when real data is missing:
  - `demoThumbnailUrl`, `demoChannelUrl`, `demoVideoUrl`
  - `demoChannelTitle`, `demoVideoTitle`, `demoProfilePicture`

---

### Configuration Files

#### `.env`
Stores the RapidAPI key:
```
REACT_APP_API_KEY=your_rapidapi_key_here
```
This is read by `FetchFromAPI.js` via `process.env.REACT_APP_API_KEY`.

#### `.gitignore`
Excludes from version control: `node_modules/`, `build/`, `.env.local` variants, debug logs, `.DS_Store`.

#### `public/_redirects`
```
/* /index.html 200
```
This is a **Netlify-specific** file that tells the server to redirect ALL routes to `index.html`. This is essential for SPAs because React Router handles routing on the client side — without this, refreshing on `/video/abc123` would return a 404.

#### `public/manifest.json`
PWA (Progressive Web App) manifest with app name, icons, and theme colors. This is the default Create React App manifest.

---

## Getting Started

### Prerequisites

Make sure you have these installed:
- **Node.js** (v14 or higher) — [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** — [Download here](https://git-scm.com/)
- A **RapidAPI account** — [Sign up here](https://rapidapi.com/)

### Step 1: Clone the Repository

```bash
git clone https://github.com/Rizul-GitHub/Riz-Media-Player.git
cd Riz-Media-Player
```

### Step 2: Install Dependencies

```bash
npm install
```

This installs all packages listed in `package.json`:
- React, React DOM, React Router
- Material UI and Emotion
- Axios, ReactPlayer
- React Scripts (build tooling)

### Step 3: Get Your API Key

1. Go to [RapidAPI](https://rapidapi.com/)
2. Create a free account
3. Search for **"YouTube v3"** by ytdlfree
4. Subscribe to the API (free tier available)
5. Copy your **X-RapidAPI-Key** from the API dashboard

### Step 4: Set Up Environment Variables

Create a `.env` file in the project root (or edit the existing one):

```
REACT_APP_API_KEY=your_rapidapi_key_here
```

> **Important:** The prefix `REACT_APP_` is required by Create React App. Without it, the variable won't be accessible in the browser.

### Step 5: Start the Development Server

```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000).

- The page auto-reloads when you save changes
- Lint errors appear in the console
- API calls go to RapidAPI's YouTube endpoint

---

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `REACT_APP_API_KEY` | Your RapidAPI key for YouTube v3 API | Yes |

**How it's used:** The key is injected into Axios request headers in `src/utils/FetchFromAPI.js`:
```js
headers: {
  'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
  'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
}
```

**Security note:** Never commit your `.env` file to Git. The `.gitignore` already excludes `.env.local` variants, but the base `.env` file is tracked — consider adding `.env` to `.gitignore` if you haven't already.

---

## Available Scripts

| Command | What it does |
|---------|--------------|
| `npm start` | Starts the development server at `localhost:3000` |
| `npm run build` | Creates an optimized production build in the `build/` folder |
| `npm test` | Runs the test suite in watch mode |
| `npm run eject` | Ejects from CRA (irreversible — exposes webpack config) |

---

## How the API Works

### Base Configuration

```js
Base URL: https://youtube-v31.p.rapidapi.com
Default params: maxResults = 50
Auth: X-RapidAPI-Key header
```

### Endpoints Used

| Endpoint | Used In | Purpose |
|----------|---------|---------|
| `search?part=snippet&q={category}` | Feed.jsx | Fetch videos for a category |
| `search?part=snippet&q={searchterm}` | SearchFeed.jsx | Search for videos |
| `videos?part=snippet,statistics&id={id}` | VideoDetail.jsx | Get single video details + stats |
| `search?part=snippet&relatedToVideoId={id}&type=video` | VideoDetail.jsx | Get related videos |
| `channels?part=snippet&id={id}` | ChannelDetail.jsx | Get channel info |
| `search?channelId={id}&part=snippet&order=date` | ChannelDetail.jsx | Get channel's videos |

### API Response Structure

Videos from the search endpoint return items like:
```json
{
  "id": { "videoId": "abc123" },
  "snippet": {
    "title": "Video Title",
    "channelId": "UCxyz",
    "channelTitle": "Channel Name",
    "thumbnails": { "high": { "url": "https://..." } }
  }
}
```

---

## Routing Explained

| Path | Component | Description |
|------|-----------|-------------|
| `/` | `Feed` | Home page with category sidebar and video grid |
| `/video/:id` | `VideoDetail` | Video player page (`:id` is the YouTube video ID) |
| `/channel/:id` | `ChannelDetail` | Channel profile page (`:id` is the YouTube channel ID) |
| `/search/:searchterm` | `SearchFeed` | Search results page (`:searchterm` is the query) |

All routes are defined in `App.js` using React Router v6's `<Routes>` and `<Route>` components.

---

## Styling Approach

This project uses a **hybrid styling approach**:

### 1. MUI's `sx` Prop (Primary)
Most styling is done inline using Material UI's `sx` prop, which supports:
- Responsive breakpoints: `{ xs: '100%', sm: '358px', md: '320px' }`
- Theme-aware values
- Pseudo-selectors and media queries

### 2. Global CSS (`src/index.css`)
Used for:
- Reset styles (margin, padding, box-sizing)
- Custom scrollbar styling (thin, dark)
- Category button hover effects (red background on hover)
- ReactPlayer sizing (77vh height)
- Search bar input styling (no border/outline)
- Responsive breakpoints for mobile (search bar width, player height)

### 3. Theme
The app uses a **custom dark theme** (not MUI's built-in theming):
- Background: `#000` (pure black)
- Cards: `#1e1e1e`
- Text: `#fff` (white)
- Accent: `#FC1503` / `#F31503` (YouTube red)
- Secondary text: `gray`

---

## Deployment Guide (Netlify)

This app is configured for deployment on **Netlify**. Here's the complete end-to-end process:

### Step 1: Build the Production Bundle

```bash
npm run build
```

This creates an optimized `build/` folder with minified HTML, CSS, and JS.

### Step 2: Deploy to Netlify

#### Option A: Netlify CLI

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to your Netlify account
netlify login

# Deploy (first time — creates a new site)
netlify deploy --prod --dir=build
```

#### Option B: Netlify Web UI (Drag & Drop)

1. Go to [app.netlify.com](https://app.netlify.com/)
2. Click "Add new site" → "Deploy manually"
3. Drag and drop your `build/` folder
4. Done — you'll get a live URL instantly

#### Option C: Git-based Continuous Deployment (Recommended)

1. Push your code to GitHub
2. Go to [app.netlify.com](https://app.netlify.com/)
3. Click "Add new site" → "Import an existing project"
4. Connect your GitHub account and select the repository
5. Configure build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `build`
6. Add environment variable:
   - Key: `REACT_APP_API_KEY`
   - Value: Your RapidAPI key
7. Click "Deploy site"

Now every push to your main branch will automatically trigger a new deployment.

### Step 3: SPA Redirect (Already Configured)

The file `public/_redirects` contains:
```
/* /index.html 200
```

This tells Netlify to serve `index.html` for ALL routes, which is required for React Router to work. Without this, navigating directly to `/video/abc123` would return a 404 error.

### Step 4: Environment Variables on Netlify

1. Go to your site's dashboard on Netlify
2. Navigate to **Site settings** → **Environment variables**
3. Add: `REACT_APP_API_KEY` = `your_key_here`
4. Trigger a redeploy for the variable to take effect

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Blank page after deployment | Make sure `_redirects` file is in `public/` folder |
| API returns 403/401 | Check your `REACT_APP_API_KEY` in `.env` — make sure it's valid |
| Videos not loading | Verify your RapidAPI subscription is active (free tier has limits) |
| `npm start` fails | Delete `node_modules/` and `package-lock.json`, then run `npm install` again |
| Search not working | Check browser console for errors — the search term might contain special characters |
| Environment variable undefined | Restart the dev server after changing `.env` (CRA doesn't hot-reload env vars) |
| 404 on page refresh (local) | This is normal in dev mode — React Router handles it. Only an issue in production without `_redirects` |

---

## License

© 2024 Rizul Walia Media Studios

---

## Summary

This is a **React 18 SPA** that clones YouTube's core functionality using:
- **React Router** for navigation without page reloads
- **Material UI** for a polished, responsive UI
- **Axios** for API communication
- **ReactPlayer** for video playback
- **RapidAPI's YouTube v3** for real data

The app follows a simple pattern: each page component fetches its own data in `useEffect`, stores it in local state, and renders it using reusable sub-components (`Videos`, `VideoCard`, `ChannelCard`). There's no global state management (no Redux/Context) — each component is self-contained.
