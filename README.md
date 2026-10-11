# CalcX — Smart Calculator & Currency Converter

A responsive, portfolio-ready React app featuring a keyboard-enabled calculator, currency conversion using official reference rates, local history, and light/dark themes.

## Tech stack
- React 18 + Vite 6
- Plain JavaScript (ES modules)
- Custom responsive CSS and Lucide React icons
- Frankfurter v2 API — free, no API key
- Browser localStorage — no backend or database needed
- Vitest for calculator unit tests

## Requirements
Node.js 20.19+ or 22.12+ (Node 22 recommended) and npm.

## Run locally
```bash
npm install
npm run dev
```
Open the URL printed by Vite (usually http://localhost:5173).

## Test and build
```bash
npm test
npm run build
npm run preview
```
The production site is created in `dist/`.

## Deploy free
### Vercel
1. Push this folder to a public GitHub repository.
2. Sign in to https://vercel.com and select **Add New → Project**.
3. Import the repository. Framework: Vite; build command: `npm run build`; output: `dist`.
4. Click Deploy. No environment variables are required.

### Netlify
1. Connect the GitHub repository at https://app.netlify.com.
2. Build command: `npm run build`; publish directory: `dist`.
3. Deploy. The included `netlify.toml` supplies these settings.

### GitHub Pages
Possible with a GitHub Actions workflow and a matching Vite `base` path; Vercel or Netlify is simpler for first-time deployment.

## Features
- Calculator: +, −, ×, ÷, percentage, sign toggle, decimal, backspace, clear, chained operations and keyboard shortcuts.
- Currency converter: NZD, BDT, USD, AUD, EUR, GBP and all other supported currencies, swap, reference rate date, manual refresh, loading and error states.
- Conversion result updates instantly as amount changes after the pair rate is loaded.
- Save conversion history manually; successful calculator results save automatically.
- Last 30 history items stored locally; clear history with confirmation.
- Responsive design and persisted light/dark theme.

## Important notes
- Frankfurter publishes **reference rates**, not real-time trading quotes. Actual bank or card exchange rates may differ and include fees.
- Requires an internet connection to fetch exchange rates. General calculator works offline after page load.
- If the API is unavailable, the converter shows an error instead of making up a rate.
- The currency list falls back to common currencies if the metadata endpoint fails; some pairs may still be unavailable.
- Browser history is local to each device and can be cleared by browser settings.
- This is a static frontend app. No backend, secrets, or paid hosting needed.

## Project structure
```text
calcx/
├── public/favicon.svg
├── src/
│   ├── components/{Calculator,Converter,History}.jsx
│   ├── hooks/useLocalStorage.js
│   ├── services/exchange.js
│   ├── utils/{calculator,format}.js
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
├── tests/calculator.test.js
├── index.html
├── package.json
├── vite.config.js
├── vercel.json
├── netlify.toml
└── README.md
```

## Ideas for future versions
- Unit tests for converter UI with React Testing Library
- Saved favorites and currency pair search
- PWA offline support and cached rates with stale-rate warnings
- E2E testing using Playwright
- CI workflow for automated builds and tests

## License
MIT — see LICENSE.
