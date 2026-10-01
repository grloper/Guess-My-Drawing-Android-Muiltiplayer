# Static project-page verification — 2026-10-01

The project now has a deliberate static landing/case-study page in `site/`. It describes the inspected Android source and the separately verified production word logic. It is not a web port, Android runtime, backend, authentication flow, or multiplayer demo.

## Deployment boundary

- Node `24.x` is selected through `package.json` following [Vercel's supported-version documentation](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions).
- `vercel.json` sets `framework: null`, skips dependency installation, runs `npm run build`, and publishes `dist/`. These fields were checked against the [official Vercel schema](https://openapi.vercel.sh/vercel.json) and [configuration documentation](https://vercel.com/docs/project-configuration).
- The dependency-free build copies exactly `index.html`, `style.css`, `canvas-concept.svg`, and `identity.svg`. It rejects unexpected existing output files rather than silently publishing them.
- Android code, Firebase configuration, archives, screenshots and the repository root are outside the output allowlist. No external scripts, fonts, analytics, or runtime network calls are included.

## Local checks

`npm run build` passed using Node `v24.19.0`; the original C# check passed 10,000 concurrent production-source draws again. Static build CI uses Node 24 alongside the separate .NET logic job.

A real local Chrome session checked widths 320, 390, 768 and 1440 pixels: no horizontal document overflow, one main landmark and h1, named links, present image alt text, loaded images, and valid internal anchor targets. Keyboard Tab/Enter reached the skip link and opened the native verification details. The final clean page reported zero console errors/warnings. This is a bounded accessibility check, not a full WCAG certification.

The five external source/evidence file links were resolved through the GitHub contents API. The page, stylesheet and artwork served successfully from the local `dist/` server. Android source/config/archive exclusion probes returned 404.

## Captures

- [Desktop static page](page-desktop.png)
- [Mobile static page](page-mobile.png)

These are actual Chrome captures of the static case study. The landscape artwork is explicitly an illustration; neither capture proves Android device execution.

Vercel's existing integration may generate a preview when the branch is pushed. Its exact-head status is reported separately; a successful static preview cannot resolve the missing legacy Xamarin toolchain or unverified live backend.

Source/evidence links use immutable reviewed Android-source commit `af374e9398ce67f7728b9191301a27135fd9da12`, so deleting the PR branch will not break the case study. This evidence commit predates the static page; it contains the verified word selector, removed client secrets, and truthful Android notes.
