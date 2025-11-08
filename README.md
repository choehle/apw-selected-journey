# Selected Journey

Selected Journey is a React application powered by Vite. This guide walks you through installing dependencies, running the development server, building for production, and executing the automated test suite.

## Prerequisites

- **Node.js** 18 or later. Vite 5 requires an active LTS or Current release of Node 18+.
- **npm** 9 or later (bundled with recent Node releases).

## Installation

All project sources live inside the [`selected-journey`](selected-journey/) directory. Install dependencies with npm:

```bash
cd selected-journey
npm install
```

The installation step only needs to be run once per environment (or after modifying dependencies).

## Running the app locally

Start the Vite development server:

```bash
npm run dev
```

By default Vite prints a local URL such as `http://localhost:5173`—open it in your browser to interact with the app. The dev server supports hot module replacement, so changes appear automatically.

To preview the production build locally after building, run:

```bash
npm run preview
```

## Building for production

Create an optimized production bundle with:

```bash
npm run build
```

The output is generated in `selected-journey/dist/`. You can deploy the files in that directory to any static hosting provider.

## Running tests

Automated tests are implemented with [Vitest](https://vitest.dev/). Execute the full test suite via:

```bash
npm test
```

Vitest runs in watch mode by default; append `-- --run` to perform a single run in CI environments.

## Useful npm scripts

| Script | Description |
| ------ | ----------- |
| `npm run dev` | Start the Vite development server in watch mode. |
| `npm run build` | Produce a production build in `dist/`. |
| `npm run preview` | Serve the latest production build locally. |
| `npm test` | Run the Vitest suite. |

For additional configuration options, see [`vite.config.js`](selected-journey/vite.config.js) and [`vitest.config.js`](selected-journey/vitest.config.js).
