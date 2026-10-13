# PlanetX × SPHEREx

A public web tool for NASA Space Apps 2026 (*Planet X and SPHEREx*). Pick any spot on the sky and see how it changed between SPHEREx scans. Objects that shifted position, like comets, asteroids and other movers, get flagged automatically.

## The problem

SPHEREx re-maps the whole sky every ~6 months. Comets, asteroids, brown dwarfs and possible new planets only show up as things that **move between images**, and no one can compare that much data by eye.

## What it does

1. **Browse the whole sky.** An interactive Aladin Lite map lets you pan and zoom. Click anywhere to choose a spot.
2. **Find every SPHEREx image of that spot.** The backend queries NASA/IPAC's IRSA archive for all exposures covering that position, sorted by date.
3. **Compare two dates.** Pick an older and a newer observation of the same patch of sky and flip between them with a **slider** or an auto **blink**, as astronomers do.
4. **Flag what moved.** Source detection runs on both frames. Anything present in the newer image but not matching a fixed star is circled in red.
5. **Trace a path.** Step through the observations one at a time to draw a line showing where a moving object went.

## How it works

```
┌─────────────────────────────────────────────┐
│  React frontend                             │
│  TanStack Start / Query / Router + shadcn   │
│  • Aladin Lite sky map (click to pick)      │
│  • Slider / blink compare                   │
│  • Path overlay                             │
└──────────────────────┬──────────────────────┘
                       │  HTTP / JSON
                       ▼
┌─────────────────────────────────────────────┐
│  FastAPI backend (Python)                   │
│  astropy · photutils · pyvo                 │
│  crop → detect → compare                    │
└──────────────────────┬──────────────────────┘
                       │  TAP query + FITS download
                       ▼
┌─────────────────────────────────────────────┐
│  NASA IRSA / IPAC                           │
│  SPHEREx archive                            │
└─────────────────────────────────────────────┘
```

## Run it

**Backend** (`services/image-processor`)
```bash
uv run fastapi dev
```

**Frontend**
```bash
pnpm dev --filter web
```

## Data Source
NASA SPHEREx mission data via the [IRSA / IPAC archive](https://irsa.ipac.caltech.edu).