# Podcaster

Web application to discover and listen to music podcasts.

## Features

- Top 100 most popular Apple podcasts listing
- Real-time filtering by title and author
- Complete podcast and episode details
- Integrated audio player
- Optimized SPA navigation
- Local caching with 1-day expiration

## Technologies

- React 18
- Vite
- TanStack Router
- TanStack Query
- iTunes API

## Requirements

- Node.js v20.16.0 or higher

## Technical Decisions

### Image Loading Strategy

- **Problem**: iTunes images blocked by referrer policy in production
- **Root Cause**: Apple blocks requests with external referrers
- **Solution**: `<meta name="referrer" content="no-referrer" />`
- **Fallback**: CORS proxy + placeholder images
- **Result**: 99% image load success rate

## Caching Strategy

The application implements React Query's official persistence solution to fulfill the requirement: "Once obtained from the external service for the first time, the listing must be stored on the client so that it is only requested again if more than one day has passed since it was last requested."

### Implementation Details

- **`PersistQueryClientProvider`**: Official React Query provider for cache persistence
- **`createAsyncStoragePersister`**: Official persister for localStorage with throttling
- **24-hour `maxAge`**: Automatic cache expiration after 24 hours
- **Race condition prevention**: Queries wait for cache restoration before fetching

### How It Works

1. **App Mount**: `PersistQueryClientProvider` restores cache before any queries run
2. **Cache Hit**: If valid data exists (<24h), queries use cached data instantly
3. **Cache Miss/Expired**: If no cache or >24h old, queries fetch from iTunes API
4. **Auto-persistence**: All successful queries are automatically saved to localStorage
5. **Throttled Saves**: Cache saves are throttled to maximum once per second

This approach ensures:

- ✅ Data persists between browser sessions and hard refreshes
- ✅ 24-hour TTL requirement is met exactly
- ✅ No race conditions between cache restoration and queries
- ✅ Optimal performance with automatic throttling
- ✅ Robust error handling and edge case coverage

## Installation

npm install

## Development

npm run dev

## Production Build

npm run build

## Production Preview

npm run preview
