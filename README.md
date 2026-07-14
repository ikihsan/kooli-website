# Kooli Pani — Marketing Website

A static, dependency-free marketing site for the Kooli Pani mobile app.
Pure HTML + CSS + a small progressive-enhancement JS file — no build step.

```
website/
├── index.html      # the whole site (11 sections, SEO meta, JSON-LD)
├── css/site.css    # design system + all section styles
├── js/site.js      # nav, reveals, gallery arrows, store-link config
└── assets/         # favicon.svg, og-kooli.png (social share image)
```

## Run locally

Any static server works:

```bash
cd website
python3 -m http.server 8080
# → http://localhost:8080
```

(Or just open `index.html` in a browser — fonts load from Google Fonts.)

## Deploy

Upload the `website/` folder to any static host (Netlify, Vercel, Cloudflare
Pages, S3, GitHub Pages). No build command; publish directory = `website`.

## Things to update before launch

1. **Store links** — edit `STORE_LINKS` at the bottom of `js/site.js`:
   - `android`: the real Play Store URL (current placeholder uses the
     `com.example.kooli_pani` application id from `mobile/`).
   - `apk`: direct APK download URL. While empty, the button shows
     "Coming soon" instead of dead-linking.
2. **Canonical URL / OG URLs** — `index.html` head assumes `https://koolipani.app/`.
3. **Contact email** — `hello@koolipani.app` appears in the FAQ and footer.

## Design system

Tokens mirror the shipping Flutter app (`mobile/lib/app/theme/colors.dart`):

| Token   | Value     | Use                        |
| ------- | --------- | -------------------------- |
| sun     | `#F7B500` | primary / CTA              |
| cream   | `#FFF9E6` | page background            |
| ink     | `#1F1F1F` | text                       |
| line    | `#ECE7D6` | borders                    |
| coal    | `#211D12` | footer / dark panels       |

Type: **Fraunces** (display) + **Inter** (text).
All app "screenshots" are hand-built HTML/CSS recreations of real screens
(worker home, OTP, role select, onboarding skills, job detail, contractor
dashboard, chat, profile, splash) — no image exports needed, and they stay
crisp at any resolution.

## Accessibility & quality notes

- Semantic landmarks, skip link, focus-visible styles, `aria-expanded` menu.
- `prefers-reduced-motion` disables all animation.
- Works fully with JavaScript disabled (reveals default to visible).
- FAQ uses native `<details>`; gallery is native scroll-snap (swipe on
  mobile, arrow buttons + keyboard on desktop).
- JSON-LD: `MobileApplication` + `FAQPage`.
