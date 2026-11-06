# UK Rail Radar

A mobile-friendly, light-map railway radar interface centred on Ashford, Kent.

## Current status

This is the **frontend prototype**. It includes:
- OpenStreetMap tiles displayed with Leaflet
- Ashford-centred opening map
- Responsive desktop and mobile layouts
- Search across the included sample records
- Selectable train markers and service detail panel
- Optional station, route-illustration and demo-marker layers

**Important:** the included train records and route lines are illustrative demo content. They are not live trains, verified operating services, accurate train positions, or authoritative railway geography. The app does not currently have a live railway data feed.

## Run locally

Install Node.js (LTS), then in this project folder run:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

To create a production build:

```bash
npm run build
```

The built website is placed in `dist/`.

## Publish using GitHub

1. Create a new GitHub repository named `uk-rail-radar`.
2. Upload the contents of this folder (not the outer ZIP file).
3. In repository Settings, configure GitHub Pages using GitHub Actions, or import the repository into Vercel.
4. For Vercel, the build command is `npm run build` and output directory is `dist`.

## Map attribution

Map tiles are provided by OpenStreetMap's standard tile service. Follow the tile usage policy:
https://operations.osmfoundation.org/policies/tiles/

## Connecting real train data

A genuine feed is still required for train positions, headcodes, delays and station boards. Before connecting one:
- check the provider's current access terms and permitted uses;
- check whether a key, account, payment or attribution is required;
- keep private API credentials on a server, not in public frontend code;
- do not label sample or stale data as live.

A future backend should expose a small, documented API to the frontend. Do not paste secret keys into GitHub.
