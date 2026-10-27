# Shared UI

Place reusable UI components here. Components receive data through props rather than owning route definitions or WordPress requests.

`DevelopmentNavigation` is a temporary review index for all 17 required destinations, rendered in the shared footer. It uses router links with exact active-page matching and reads room/service names and slugs from the local catalogues. It remains available in preview builds until Epic 3 replaces it with the complete site navigation. It contains no property facts or API calls.

`SetupCheck.tsx` is a temporary TypeScript, alias and Tailwind demonstration. Keep it until the routing layout replaces the starter screen.
