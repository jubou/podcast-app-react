# Podcaster

Web application to discover and listen to music podcasts.

## Features

- Top 100 most popular Apple podcasts listing
- Real-time filtering by title and author
- Complete podcast and episode details
- Integrated audio player
- Optimized SPA navigation
- Local caching with 1-day expiration
- Smart episode descriptions: HTML rendering when present, auto-linked URLs for plain text

## Technologies

- React 18
- Vite
- TanStack Router
- TanStack Query
- iTunes API

## Requirements

- Node.js v20.16.0 or higher

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

## Technical Notes

### Episode Descriptions

Episode descriptions are rendered intelligently:

- **HTML content**: Rendered as HTML when detected (using regex pattern matching)
- **Plain text**: URLs are automatically converted to clickable links for better UX
- **Fallback**: Empty descriptions are handled gracefully

This approach ensures compliance with the technical requirements while providing enhanced user experience for plain text descriptions containing URLs.
