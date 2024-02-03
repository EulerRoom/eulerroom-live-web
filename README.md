# eulerroom-live-web

Website for Eulerroom self-hosted live streaming events and historical archive

## Install

1. Copy `.env` into a new file `.env.local`
2. Change the values in `.env.local` to match your local setup:

```
REACT_APP_MUXY_API_KEY=super-secret-muxy-api-key
REACT_APP_EVENT_SLUG=muxy-event-slug
REACT_APP_MUXY_URL=muxy-base-url
```

### Event page 

HTML set in: `src/app/components/EventHeader.tsx`

* Intro (Toplap presents:), event Title

### event details

Slot duration set in: 

* `src/app/components/PerformanceList.tsx`
* `const SLOT_DURATION_MIN`

### Others

Event start date/time, end date/time, preparation time, support links etc set
in Muxy Admin:

https://muxy.tidalcycles.org/admin
