# Images

This project serves static images from `public/images`. Any file placed here is available at runtime under `/images/...`.

## Folder structure

- `public/images/placeholders/`
  - Contains the built-in non-AI placeholders used as fallbacks when an image is missing.
- `public/images/hero/`
  - Hero background referenced by `src/components/sections/Hero.tsx`.
- `public/images/rooms/`
  - Room photos referenced by `src/content/data.ts`.
- `public/images/attractions/`
  - Attraction photos referenced by `src/content/data.ts`.
- `public/images/blog/`
  - Blog post cover images referenced by `src/content/blog.ts`.
- `public/images/promos/`
  - Promo card images referenced by `src/components/sections/PromoCards.tsx`.
- `public/images/about/`
  - Images referenced by `src/components/sections/About.tsx`.
- `public/images/events/`
  - Images referenced by `src/components/sections/EventsSection.tsx`.
- `public/images/location/`
  - Images referenced by `src/components/sections/Location.tsx`.
- `public/images/gallery/`
  - Gallery photos referenced by `src/content/optimizedPhotos.ts`.
  - Subfolders:
    - `pokoje/`
    - `wnetrza/`
    - `zewnatrz/`

## Conventions

- Use lowercase filenames with `-` dashes (no spaces).
- Prefer `jpg` (photos) or `webp` (optimized photos). Use `png` only when needed.
- Keep originals outside the repo; commit only optimized, web-ready images.

## Where to add new images

- Rooms:
  - Put files in `public/images/rooms/`
  - Update the `rooms[].image` paths in `src/content/data.ts` if you change filenames.
- Attractions:
  - Put files in `public/images/attractions/`
  - Update the `attractions[].image` paths in `src/content/data.ts` if you change filenames.
- Blog:
  - Put files in `public/images/blog/`
  - Update the `blogPosts[].image` paths in `src/content/blog.ts` if you change filenames.
- Gallery:
  - Put files in `public/images/gallery/<category>/`
  - Update `src/content/optimizedPhotos.ts` to add/remove photos or categories.

## Placeholder behavior

UI images use `AppImage` (in `src/components/ui/AppImage.tsx`) to fall back to a local placeholder (no external services).
